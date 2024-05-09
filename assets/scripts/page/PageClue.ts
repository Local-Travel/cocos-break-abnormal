import { _decorator, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PageClue')
export class PageClue extends Component {
    // @property(Node)
    // goodsNode: Node = null;

    protected onLoad(): void {
        // this.goodsNode.on(Node.EventType.TOUCH_END, this.onTouchClick, this);
    }

    protected onEnable(): void {
        const GSpriteSplash = find("Canvas/GSpriteSplash");
        if (GSpriteSplash) {
            GSpriteSplash.active = true;
        }
    }

    protected onDisable(): void {
        const GSpriteSplash = find("Canvas/GSpriteSplash");
        if (GSpriteSplash) {
            GSpriteSplash.active = false;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onDestroy() {
        // 移除事件监听
        // this.goodsNode.off(Node.EventType.TOUCH_END, this.onTouchClick, this);
    }

    onTouchClick() {
        console.log("onClick");
    }
}

