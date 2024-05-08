import { _decorator, Component, EventTouch, Material, Node, Sprite, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Water')
export class Water extends Component {
    @property(Node)
    bgNode: Node = null;

    material: Material = null;
    waveOffset: number = 0.0;

    onLoad() {
        this.material = this.bgNode.getComponent(Sprite).getSharedMaterial(0);
        this.bgNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd(e: EventTouch) {
        // 占满屏幕才有效
        const pos = e.getUILocation();
        const { width, height } = this.bgNode.getComponent(UITransform).contentSize;
        this.material.setProperty('center', new Vec2(pos.x / width, (height - pos.y) / height));
        this.waveOffset = 0.0;

        // const pos = e.getLocation();
        // // const nPos = this.getNodeSpacePos(pos);
        // const { width, height } = this.bgNode.getComponent(UITransform).contentSize;
        // this.material.setProperty('center', new Vec2(pos.x / width, (height - pos.y) / height));
        // this.waveOffset = 0.0;
    }

    update(dt: number) {
        if (this.waveOffset > 2.0) return;

        this.waveOffset += dt;
        this.material.setProperty('wave_offset', this.waveOffset);
    }

    getNodeSpacePos(pos: Vec2) {
        return this.bgNode.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(pos.x, pos.y, 0));
    }
}

