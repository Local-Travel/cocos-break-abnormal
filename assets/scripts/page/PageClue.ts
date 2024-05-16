import { _decorator, Component, find, Node } from 'cc';
import { Constant } from '../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('PageClue')
export class PageClue extends Component {
    @property(Node)
    returnBackNode: Node = null;
    @property(Node)
    goodsNode: Node = null;
    @property(Node)
    blackBGNode: Node = null;

    private _selectList: string[] = [];

    protected onLoad(): void {
        this.goodsNode.on(Node.EventType.TOUCH_END, this.onTouchClick, this);
        this.returnBackNode.on(Node.EventType.TOUCH_END, this.onReturnBackClick, this);
    }

    protected onEnable(): void {
        const GSpriteSplash = find("Canvas/GSpriteSplash");
        if (GSpriteSplash) {
            // GSpriteSplash.active = true;
        }
    }

    protected onDisable(): void {
        const GSpriteSplash = find("Canvas/GSpriteSplash");
        if (GSpriteSplash) {
            // GSpriteSplash.active = false;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onDestroy() {
        // 移除事件监听
        this.goodsNode.off(Node.EventType.TOUCH_END, this.onTouchClick, this);
        this.returnBackNode.off(Node.EventType.TOUCH_END, this.onReturnBackClick, this);
    }

    show() {
        this.node.active = true;
        this.blackBGNode.active = true;
    }

    onTouchClick() {
        console.log("onClick");
        const skill = Constant.GAME_PROPS_TOOL.cover;
        this._selectList.push(skill.iconName);
    }

    onReturnBackClick() {
        console.log("onReturnBackClick");
        this.node.active = false;
        this.blackBGNode.active = false;
    }

    getSelectList() {
        return this._selectList;
    }
}

