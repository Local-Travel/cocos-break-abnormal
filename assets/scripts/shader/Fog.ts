import { _decorator, CCInteger, Component, EventTouch, Material, Node, Sprite, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fog')
export class Fog extends Component {
    @property(Node)
    bgNode: Node = null;// 要求超大图，全屏
    @property(Node)
    bulb: Node = null;

    material !: Material;
    center : Vec2 = new Vec2(0.5, 0.5);
    // dragStartPos: Vec2 = new Vec2();
    // dragOffset: Vec2 = new Vec2();
    bulbWidth: number = 0;


    onLoad() {
        this.material = this.bgNode.getComponent(Sprite)!.getSharedMaterial(0)!;
        // let _width = this.bgNode.getComponent(UITransform)!.contentSize.width;
        // let _height = this.bgNode.getComponent(UITransform)!.contentSize.height;
        this.material.setProperty('wh_ratio', 1.0);
        this.material.setProperty('center', this.center);
        this.bulbWidth = this.bulb.getComponent(UITransform).contentSize.width;

        // this.bgNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // this.bulb.on(Node.EventType.TOUCH_MOVE, this.onTouchStart, this);
        this.bulb.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    // onTouchStart(event:EventTouch) {
    //     this.dragStartPos.set(this.bulb.position.x, this.bulb.position.y);
    //     let touchPoint = event.getLocation();
    //     Vec2.subtract(this.dragOffset, this.dragStartPos, touchPoint)
    // }

    onTouchMove(event: EventTouch) {
        // console.log(event);
        const pos = event.getLocation();
        const nPos = this.getNodeSpacePos(pos);
        if (this.checkOutOfBounds(nPos)) return;
        
        const { width, height } = this.bgNode.getComponent(UITransform).contentSize;
        // this.center.x += event.getDeltaX() / width;
        // this.center.y -= event.getDeltaY() / height;
        // this.material.setProperty('center', this.center);
        const x = this.center.x + nPos.x / width;
        const y = this.center.y - nPos.y / height;
        this.material.setProperty('center', new Vec2(x, y));

        this.bulb.setPosition(nPos);
    }

    getNodeSpacePos(pos: Vec2) {
        return this.bulb.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(pos.x, pos.y, 0));
    }

    getParentRectBox() {
        return this.bulb.parent.getComponent(UITransform).getBoundingBox();
    }

    /** 是否超出边界 */
    checkOutOfBounds(pos: Vec3) {
        const parentBox = this.getParentRectBox();
        const { x, y, width, height } = parentBox;
        const { x: dx, y: dy } = pos;
        const w = this.bulbWidth;
        const hw = width / 2;
        const hh = height / 2;
        // console.log(pos, parentBox);
        if (dx < -hw + w || dx > hw - w
            || dy < -hh + w || dy > hh - w) {
            console.log('超出边界');
            return true;
        }
        return false;
    }
}

