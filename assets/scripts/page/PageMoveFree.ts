import { _decorator, Component, director, Label, Node } from 'cc';
import { Constant } from '../util/Constant';
import { DragData } from '../data/DragData';
import { PageClue } from './PageClue';
const { ccclass, property } = _decorator;

@ccclass('PageMoveFree')
export class PageMoveFree extends Component {
    @property(PageClue)
    pageClue: PageClue = null;
    // 顶部
    @property(Node)
    taskLabel: Node = null;
    @property(Node)
    timeNode: Node = null;

    // 底部
    @property(Node)
    btnToolNode: Node = null;
    @property(Node)
    btnTipNode: Node = null;
    @property(Node)
    btnAddTimeNode: Node = null;

    @property(Node)
    toolIconNode: Node = null;
    @property(Node)
    toolNameNode: Node = null;

    private _taskName: string = '';
    private _time: number = 0;
    private _dataTime: number = 0;
    private _toolName: string = 'key';
    
    protected onLoad(): void {
        director.on(Constant.EVENT_TYPE.PAGE_MOVE_FREE_RESET, this.reset, this);
    }

    protected onEnable(): void {
        this.btnToolNode.on(Node.EventType.TOUCH_END, this.onToolClick, this)
        this.btnTipNode.on(Node.EventType.TOUCH_END, this.onTipClick, this)
        this.btnAddTimeNode.on(Node.EventType.TOUCH_END, this.onAddTimeClick, this)
    }

    protected onDisable(): void {
        this.btnToolNode.off(Node.EventType.TOUCH_END, this.onToolClick, this)
        this.btnTipNode.off(Node.EventType.TOUCH_END, this.onTipClick, this)
        this.btnAddTimeNode.off(Node.EventType.TOUCH_END, this.onAddTimeClick, this)
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        // 移除监听
        director.off(Constant.EVENT_TYPE.PAGE_MOVE_FREE_RESET, this.init, this);
        this.unschedule(this.setTimeClock);
    }

    reset() {
        Constant.gameManager.resetInitPos();
    }

    init(name: string, limitTime: number) {
        this._taskName = name;
        this._time = limitTime;
        this._dataTime = limitTime;
        this.unschedule(this.setTimeClock);
        this.schedule(this.setTimeClock, 1);
        this.setTitle(name);

        // this.setToolName('key');
    }

    setTitle(title: string) {
        this.taskLabel.getComponent(Label).string = title;
    }

    setTool(tool: string) {
        const toolObj = Constant.GAME_PROPS_TOOL[tool] || {}
        const iconName = toolObj.iconName;
        const toolName = toolObj.name;
        this.toolNameNode.getComponent(Label).string = toolName || '';
    }

    setToolName(toolName: string) {
        if (!toolName) return;
        this._toolName = toolName;

        if (this._toolName) {
            this.btnToolNode.active = true;
            this.setTool(this._toolName);
        } else {
            this.btnToolNode.active = false;
        }
        this.setTool(toolName);
    }

    showTimeClock(time: number) {
        const m = Math.floor(time / 60);
        const s = time % 60;
        const mStr = `${m < 10 ? `0${m}` : m}`;
        const sStr = `${s < 10 ? `0${s}` : s}`;
        const timeStr = `${mStr}:${sStr}`;
        // 设置倒计时
        this.timeNode.getComponent(Label).string = `${timeStr}`;
    }

    setTimeClock() {
        this._time--;
        if (this._time <= 0) {
            this.unschedule(this.setTimeClock);

            console.log('游戏超时');
            // Constant.dialogManager.showTipLabel('游戏超时', () => {
            //     Constant.gameManager.gameOver();
            // });
            Constant.gameManager.gameOver();
        } else {
            this.showTimeClock(this._time);
        }
    }

    onToolClick() {
        // console.log('onToolClick');
        // Constant.dialogManager.showTipLabel('功能开发中...');
        Constant.gameManager.useSkill(this._toolName);
    }

    onTipClick() {
        // console.log('onTipClick');
        this.pageClue.show();
    }

    onAddTimeClick() {
        // console.log('onAddTimeClick');
        // Constant.dialogManager.showTipLabel('功能开发中...');
        this._time += this._dataTime;
    }
}

