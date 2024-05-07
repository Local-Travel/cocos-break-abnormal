import { _decorator, CCInteger, Color, Component, EventTouch, Graphics, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Light')
export class Light extends Component {
    @property(Node)
    mask: Node = null;

    @property(Node)
    light: Node = null;

    @property({type: CCInteger})
    size: number = 50;

    private _maskUITransform: UITransform = null;
    private _parentUITransform: UITransform = null;
    private _g: Graphics = null;
    private _childG: Graphics = null;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

        this._maskUITransform = this.mask.getComponent(UITransform);
        this._g = this.mask.getComponent(Graphics);
        // this._childG = this.mask.getChildByName('Graphics').getComponent(Graphics);
        this._parentUITransform = this.light.parent.getComponent(UITransform);

    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    start() {
        const wPos = this.getWorldPos(new Vec2(360, 640));
        this.addCircle(wPos);
    }

    update(deltaTime: number) {

    }

    onTouchStart(event: EventTouch) {
        // const wPos = this.getWorldPos(event);
        // this.addCircle(wPos);
    }

    onTouchMove(event: EventTouch) {
        const pos = event.getLocation();
        const wPos = this.getWorldPos(pos);
        const nPos = this.getNodePos(pos);

        if (this.checkOutOfBounds(nPos)) {
            return;
        }
        this.light.setPosition(nPos);

        this.clearCircle();
        this.addCircle(wPos);
    }

    onTouchEnd(event: EventTouch) {
        // const wPos = this.getWorldPos(event);
        // this.clearCircle();
        // this.addCircle(wPos);
    }

    /** 是否超出边界 */
    checkOutOfBounds(pos: Vec3) {
        const parentBox = this.getParentRectBox();
        const { x, y, width, height } = parentBox;
        const { x: dx, y: dy } = pos;
        const d = this.size / 2;
        // console.log(pos, parentBox);
        if (dx < x + d || dx > x + width - d 
        || dy < y + d || dy > y + height - d) {
            console.log('超出边界');
            return true;
        }
        return false;
    }

    getWorldPos(pos: Vec2) {
        const wPos = this._maskUITransform.convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
        return wPos;
    }

    getNodePos(pos: Vec2) {
        const nPos = this._parentUITransform.convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
        return nPos;
    }

    getParentRectBox() {
        return this._parentUITransform.getBoundingBox();
    }

    addCircle(pos: Vec3) {
        // 画一个圆形节点
        this._g.circle(pos.x, pos.y, this.size);
        // this._g.fillColor = new Color(255, 255, 255, 255);
        this._g.fill();
        // this._g.stroke();


        // 画一个圆形子节点
        // this._childG.circle(pos.x, pos.y, this.size * 1.5);
        // this._childG.fill();
    }

    clearCircle() {
        this._g.clear();
        // this._childG.clear();
    }
}

