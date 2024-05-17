import { _decorator, Component, Node } from 'cc';
import { Constant } from '../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('WelcomeBox')
export class WelcomeBox extends Component {

    @property(Node)
    closeRoot: Node = null

    start() {

    }

    protected onEnable(): void {
        this.closeRoot.on(Node.EventType.TOUCH_END, this.handleClose, this)
    }

    protected onDisable(): void {
        this.closeRoot.off(Node.EventType.TOUCH_END, this.handleClose, this)
    }

    update(deltaTime: number) {
        
    }

    handleClose() {
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
