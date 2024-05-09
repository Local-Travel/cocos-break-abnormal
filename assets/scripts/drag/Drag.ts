import { _decorator, Color, Component, director, EventTouch, Graphics, Node, UITransform, Vec2, Vec3 } from 'cc';
import { Constant } from '../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('Drag')
export class Drag extends Component {

    private _isDragAble: boolean = true; // 是否可以拖拽
    private _oldPos: Vec3 = null; // 最原始的位置
    private _dragNum: number = 0; // 拖拽次数
    
    onLoad() {
        this._oldPos = this.node.position.clone();
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }


    start() {
        // this.drawLine()
    }

    update(deltaTime: number) {
        
    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event:EventTouch) {
        if (!this._isDragAble) return;
        Constant.dragManager.handleTouchStart(event, this);
    }

    onTouchMove(event: EventTouch) {
        if (!this._isDragAble) return;
        Constant.dragManager.handleTouchMove(event, this);
    }

    onTouchEnd(event: EventTouch) {
        if (!this._isDragAble) return;
        Constant.dragManager.handleTouchEnd(event, this);
    }

    getDragNode() {
        return this.node;
    }

    setIsDragAble(isDragAble: boolean) {
        this._isDragAble = isDragAble;
    }

    setDragNum(num: number) {
        this._dragNum = num;
    }

    getDragNum() {
        return this._dragNum;
    }

    setRotation(euler: Vec3 = new Vec3(0, 0, -90)) {
        this.node.setRotationFromEuler(euler);
    }

    getRotation() {
        return this.node.rotation;
    }

    resetPosition() {
        this.node.setPosition(this._oldPos);
    }

    setPosition(pos: Vec3) {
        this.node.setPosition(pos);
    }

    getPosition() {
        return this.node.position;
    }

    getParentNode() {
        return this.node.parent;
    }

    getContentSize() {
        const { width, height } = this.node.getComponent(UITransform);
        return { width, height };
    }

    drawLine() {
        const g = this.node.getComponent(Graphics);
        const { width, height } = this.node.getComponent(UITransform);
        const x = -width / 2;
        const y = -height / 2;
        g.lineWidth = 2;
        g.fillColor = Color.GREEN;
        g.fillRect(x, y, width, height)
        g.fill();
    }

    getNodeSpacePosition(pos: Vec2) {
        const p = new Vec3(pos.x, pos.y, 0)
        return this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(p);
    }

    getRelativePosition(pos: Vec2) {
        const p = new Vec3(pos.x, pos.y, 0)
        const parentPos = this.node.parent.position
        return new Vec3(parentPos.x + p.x, parentPos.y + p.y, 0);
    }

    getParentRectBox() {
        return this.node.parent.getComponent(UITransform).getBoundingBox();
    }
}

