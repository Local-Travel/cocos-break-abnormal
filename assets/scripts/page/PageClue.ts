import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PageClue')
export class PageClue extends Component {
    @property(Node)
    goodsNode: Node = null;

    protected onLoad(): void {
        this.goodsNode.on(Node.EventType.TOUCH_END, this.onTouchClick, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onDestroy() {
        // 移除事件监听
        this.goodsNode.off(Node.EventType.TOUCH_END, this.onTouchClick, this);
    }

    onTouchClick() {
        console.log("onClick");
    }
}

