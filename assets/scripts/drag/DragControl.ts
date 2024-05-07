import { _decorator, Component, director, EventTouch, Graphics, misc, Node, v2, v3, Vec2, Vec3 } from 'cc';
import { Drag } from './Drag';
import { Constant } from '../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('DragControl')
export class DragControl extends Component {

    @property(Node)
    drawColorNode: Node = null;

    // 变动的列表
    private _changeList: any[] = [];
    // 答案列表
    private _answerList: any[] = [];

    private _startPos: Vec3 = new Vec3();

    private _dragCount: number = 0;
    private _index: number = -1;
    private _isEnd: boolean = false;

    private _g: Graphics = null;

    start() {
        this._g = this.drawColorNode.getComponent(Graphics);
        this._isEnd = false;
    }

    update(deltaTime: number) {
        
    }

    handleTouchStart(event: EventTouch, drag: Drag) {
        // const pos = event.getLocation();
        if (this._isEnd) return;
        this._startPos = drag.getPosition().clone();
        this._g.clear();
    }

    handleTouchMove(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        const pos = event.getLocation();
        const nPos = drag.getNodeSpacePosition(pos);
        this._g.clear();
        this._index = -1;
        // console.log(pos, nPos);
        if (!this.checkOutOfBounds(nPos, drag)) {
            drag.setPosition(nPos);

            const index = this.getChangeIndexByPos(nPos);
            if (index < 0) return;

            this.drawCircle(index);
        }
    }

    handleTouchEnd(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        // const pos = event.getLocation();
        this._g.clear();

        const startIndex = this.getChangeIndexByPos(this._startPos);

        if (startIndex < 0 || this._index < 0 || startIndex === this._index) {
            // 还原位置
            drag.setPosition(this._startPos);
            return;
        }

        // 修正位置
        const pos = this.getEmptyIndexPos(this._index);
        if (pos) {
            drag.setPosition(pos);
            const val = Constant.dragManager.getDragListValue(startIndex);
            if (val && val.length > 0) {
                Constant.dragManager.setDragListValue(this._index, val[2]);
                Constant.dragManager.setDragListValue(startIndex, null);
            }
            this._dragCount++;
        }

        if (this._dragCount >= Constant.dragManager.dragCount) {
            this._isEnd = true;

            if (this.checkResult()) {
                console.log('成功');
                Constant.dialogManager.showTipPic('right', 100, pos);
            } else {
                console.log('失败');
                Constant.dialogManager.showTipPic('wrong', 100, pos, () => {
                    director.emit(Constant.EVENT_TYPE.PAGE_INVERT_TRIANGLE_RESET);
                });
            }
        }
    }

    /** 是否超出边界 */
    checkOutOfBounds(pos: Vec3, drag: Drag) {
        const parentBox = drag.getParentRectBox();
        const { x, y, width, height } = parentBox;
        const { x: dx, y: dy } = pos;
        // console.log(pos, parentBox);
        if (dx < x || dx > x + width || dy < y || dy > y + height) {
            console.log('超出边界');
            return true;
        }
        return false;
    }

    /** 修改变动的列表 */
    getChangeIndexByPos(pos: Vec3) {
        const [row, col] = Constant.dragManager.convertPosToRowCol(v3(pos.x, pos.y, 0));
        if (row < 0 || col < 0 || row >= Constant.dragManager.colCount || col >= Constant.dragManager.colCount) {
            console.log('转换超出范围', row, col);
            return -1;
        }
        const index = Constant.dragManager.getIndex(row, col);
        return index;
    }

    checkResult() {
        // for(let i = 0; i < this._answerList.length; i++) {
        //     if (this._changeList[i] != this._answerList[i]) {
        //         return false;
        //     }
        // }
        // return true;
        return Constant.dragManager.checkIsSameList(this._answerList);
    }

    drawCircle(index: number) {
        const pos = this.getEmptyIndexPos(index);
        if (pos) {
            const certer = v2(pos.x, pos.y);
            const spaceAngle = 10;
            const deltaAngle = 10;
            const angle = spaceAngle + deltaAngle;
            const radius = Constant.dragManager.size / 2;

            this._g.lineWidth = 2;
            for(let i = 0; i < 360; i+= angle) {
                const sR = misc.degreesToRadians(i);
                const eR = misc.degreesToRadians(i + deltaAngle);
                this._g.arc(certer.x, certer.y, radius, sR, eR, true);
                this._g.stroke();
            }

            // console.log('画圆', index);
            this._index = index;
        } else {
            this._index = -1;
        }
    }

    getEmptyIndexPos(index: number) {
        const dragVal = Constant.dragManager.getDragListValue(index);
        if (dragVal && dragVal[1] === 0) {// 有值且位置为空
            const pos = dragVal[0].clone();
            return pos;
        }
        return null;
    }
    

    setChangeList(list: any[]) {
        this._changeList = list;
    }

    setAnswerList(list: any[]) {
        this._answerList = list;
    }

    resetData() {
        this._dragCount = 0;
        this._startPos = null;
        this._changeList = [];
        this._answerList = [];
        this._isEnd = false;
    }
}

