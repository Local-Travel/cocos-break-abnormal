import { _decorator, Component, Node } from 'cc';
import { Utils } from '../util/Utils';
import { Constant } from '../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('TimeOutBox')
export class TimeOutBox extends Component {
    @property(Node)
    shareRoot: Node = null

    @property(Node)
    closeRoot: Node = null

    start() {

    }

    protected onEnable(): void {
        this.shareRoot.on(Node.EventType.TOUCH_END, this.handleShare, this)
        this.closeRoot.on(Node.EventType.TOUCH_END, this.handleClose, this)
    }

    protected onDisable(): void {
        this.shareRoot.off(Node.EventType.TOUCH_END, this.handleShare, this)
        this.closeRoot.off(Node.EventType.TOUCH_END, this.handleClose, this)
    }

    update(deltaTime: number) {
        
    }

    handleClose() {
        this.hideModal()
    }

    handleShare() {
        // 调用分享接口
        // TODO: 这里需要处理是从宝箱分享出去的，返回的逻辑要处理
        Utils.activeShare('TimeOutBox')
        // TODO: 处理完再关闭宝箱
        this.hideModal()
    }

    showModal() {
        this.node.active = true
    }

    hideModal() {
        this.node.active = false;
        Constant.gameManager.init();
    }
}

