import { _decorator, CCInteger, Component, EventTouch, Material, Node, Sprite, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fog')
export class Fog extends Component {
    @property(Node)
    bgNode: Node = null;

    @property({type: CCInteger})
    size: number = 50;

    material: Material = null;
    center: Vec2 = new Vec2(0.5, 0.5);
    private _width: number = 0;
    private _height: number = 0;
    private _parentUITransform: UITransform = null;
    

    onLoad() {
        this.material = this.bgNode.getComponent(Sprite).getSharedMaterial(0);
        const { width, height } = this.bgNode.getComponent(UITransform).contentSize;
        this._width = width;
        this._height = height;

        this._parentUITransform = this.bgNode.parent.getComponent(UITransform);

        // this.material.setProperty('wh_ratio', width / height);
        this.material.setProperty('center', this.center);

        this.bgNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(e: EventTouch) {
        const { width, height } = this.bgNode.getComponent(UITransform).contentSize;
        // const pos = e.getLocation();

        // const nPos = this.getNodePos(pos);

        // if (this.checkOutOfBounds(nPos)) {
        //     return;
        // }
        // this.bgNode.setPosition(nPos);
        
        // this.material.setProperty('center', new Vec2(nPos.x, nPos.y ));

        this.center.x += e.getUIDelta().x / width;
        this.center.y -= e.getDeltaY() / height;
        this.material.setProperty('center', this.center);
    }

    getNodePos(pos: Vec2) {
        const nPos = this._parentUITransform.convertToNodeSpaceAR(new Vec3(pos.x, pos.y));
        return nPos;
    }

    getParentRectBox() {
        return this._parentUITransform.getBoundingBox();
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
}

