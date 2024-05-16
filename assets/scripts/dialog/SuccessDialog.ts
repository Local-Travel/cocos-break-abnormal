import { _decorator, Component, Node } from 'cc';
import { Utils } from '../util/Utils';
import { Constant } from '../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('SuccessDialog')
export class SuccessDialog extends Component {
    @property(Node)
    btnShareNode: Node = null

    @property(Node)
    btnGiveUpNode: Node = null

    start() {

    }

    protected onEnable(): void {
        this.btnShareNode.on(Node.EventType.TOUCH_END, this.handleShare, this)
        this.btnGiveUpNode.on(Node.EventType.TOUCH_END, this.handleGiveUp, this)
    }

    protected onDisable(): void {
        this.btnShareNode.off(Node.EventType.TOUCH_END, this.handleShare, this)
        this.btnGiveUpNode.off(Node.EventType.TOUCH_END, this.handleGiveUp, this)
    }

    update(deltaTime: number) {
        
    }

    handleGiveUp() {
        this.hideModal()
    }

    handleShare() {
        // 调用分享接口
        Utils.activeShare('successDialog')
        // TODO: 激励
        
        this.hideModal()
    }

    showModal() {
        this.node.active = true
    }

    hideModal() {
        Constant.gameManager.init()
        this.node.active = false
    }
}

