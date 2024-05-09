import { _decorator, Component, EventTouch, Graphics, Node, Vec3 } from 'cc';
import { Drag } from '../Drag';
import { Utils } from '../../util/Utils';
const { ccclass, property } = _decorator;

@ccclass('MatchControl')
export class MatchControl extends Component {
    // 答案列表
    private _answerList: any[] = [];

    private _startPos: Vec3 = new Vec3();

    private _dragCount: number = 0;
    private _index: number = -1;
    private _isEnd: boolean = false;

    private _g: Graphics = null;
    
    start() {
        this._g = this.node.getComponent(Graphics);
        this._isEnd = false;
        // console.log('this._g', this._g);
    }

    update(deltaTime: number) {
        
    }

    resetData() {
        this._dragCount = 0;
        this._startPos = null;
        this._answerList = [];
        this._isEnd = false;
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

            // const index = this.getChangeIndexByPos(nPos);
            // if (index < 0) return;

            // this.drawCircle(index);
        }
    }

    handleTouchEnd(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        // const pos = event.getLocation();
        this._g.clear();

        // const startIndex = this.getChangeIndexByPos(this._startPos);

        // if (startIndex < 0 || this._index < 0 || startIndex === this._index) {
        //     // 还原位置
        //     drag.setPosition(this._startPos);
        //     return;
        // }

        // // 修正位置
        // const pos = this.getEmptyIndexPos(this._index);
        // if (pos) {
        //     drag.setPosition(pos);
        //     const val = Constant.dragManager.getDragListValue(startIndex);
        //     if (val && val.length > 0) {
        //         Constant.dragManager.setDragListValue(this._index, val[2]);
        //         Constant.dragManager.setDragListValue(startIndex, null);
        //     }
            
        //     const k = drag.getDragNum();
        //     if (k === 0) {// 该节点没有被拖动过
        //         this._dragCount++;
        //     }
        //     drag.setDragNum(k + 1);
        // }

        // if (this._dragCount >= Constant.dragManager.dragCount) {
        //     this._isEnd = true;

        //     if (this.checkResult()) {
        //         console.log('成功');
        //         Constant.dialogManager.showTipPic('right', 100, pos);
        //     } else {
        //         console.log('失败');
        //         Constant.dialogManager.showTipPic('wrong', 100, pos, () => {
        //             director.emit(Constant.EVENT_TYPE.PAGE_MOVE_RESET);
        //         });
        //     }
        // }
    }

    /** 是否超出边界 */
    checkOutOfBounds(pos: Vec3, drag: Drag) {
        const parentBox = drag.getParentRectBox();
        return Utils.checkOutOfBounds(pos, parentBox);
    }

    setAnswerList(list: any[]) {
        this._answerList = list;
    }

}

