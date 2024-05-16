import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { Utils } from '../util/Utils';
import { Constant } from '../util/Constant';
import { User } from '../data/User';
const { ccclass, property } = _decorator;

@ccclass('Chest')
export class Chest extends Component {
    @property(Node)
    shareRoot: Node = null

    @property(Node)
    closeRoot: Node = null

    @property(Node)
    chestBox: Node = null

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
        Utils.activeShare('chestDialog')
        // 先给个锤子的道具
        const propsName = Constant.GAME_PROPS_TOOL.hammer.iconName;
        const user = User.instance()
        const count = user.getGameProps(propsName)
        user.setGameProps(propsName, count + 1)
        // TODO: 处理完再关闭宝箱
        this.hideModal()
    }

    showModal(cb: Function = () => {}) {
        this.node.active = true
        
        tween(this.chestBox)
        .to(0.3, { position: new Vec3(0, 0, 0), scale: new Vec3(1, 1, 1) })
        .to(0.2, { scale: new Vec3(1.5, 1.5, 1.5) }) 
        .to(0.2, { scale: new Vec3(1, 1, 1) })
        .call(() => {
            cb()
        })
        .start()
    }

    hideModal() {
        this.node.active = false;
    }
}

