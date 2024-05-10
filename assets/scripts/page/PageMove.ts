import { _decorator, Component, director, Label, Node } from 'cc';
import { Constant } from '../util/Constant';
import { DragData } from '../data/DragData';
const { ccclass, property } = _decorator;

/** 倒三角页面 */
@ccclass('PageMove')
export class PageMove extends Component {
    @property(Node)
    taskLabel: Node = null;

    @property(Node)
    timeNode: Node = null;

    private _time: number = 0;

    protected onLoad(): void {
        director.on(Constant.EVENT_TYPE.PAGE_MOVE_RESET, this.init, this);
    }

    start() {
        this.init();
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        // 移除监听
        director.off(Constant.EVENT_TYPE.PAGE_MOVE_RESET, this.init, this);
        this.unschedule(this.setTimeClock);
    }

    init() {
        const { data } = DragData.getDragData(5);
        Constant.dragManager.init(data);
        const { limitTime = 180 } = data || {};

        this._time = limitTime;
        this.unschedule(this.setTimeClock);
        this.schedule(this.setTimeClock, 1);
        this.setTitle(data.name);
    }

    setTitle(title: string) {
        this.taskLabel.getComponent(Label).string = title;
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

            console.log('游戏结束');
            Constant.dialogManager.showTipLabel('游戏结束', () => {
                this.init();
            });
        } else {
            this.showTimeClock(this._time);
        }
    }
}

