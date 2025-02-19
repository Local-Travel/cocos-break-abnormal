import { _decorator, Component, director, EventTouch, Graphics, Node, Vec3 } from 'cc';
import { Drag } from '../Drag';
import { Utils } from '../../util/Utils';
import { Constant } from '../../util/Constant';
const { ccclass, property } = _decorator;

@ccclass('MoveFreeControl')
export class MoveFreeControl extends Component {
    // 答案列表/目标列表
    private _targetList: Drag[] = [];

    private _startPos: Vec3 = new Vec3();
    private _movePos: Vec3 = new Vec3();

    private _dragCount: number = 0;
    private _isEnd: boolean = false;

    private _g: Graphics = null;
    
    start() {
        this._isEnd = false;
        // console.log('this._g', this._g);
    }

    update(deltaTime: number) {
        
    }

    resetData() {
        this._dragCount = 0;
        this._startPos = null;
        this._movePos = null;
        this._targetList = [];
        this._isEnd = false;
    }

    handleTouchStart(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        const pos = event.getLocation();
        this._startPos = drag.getPosition().clone();

        const nPos = drag.getNodeSpacePosition(pos);
        // console.log('this._startPos', this._startPos, nPos);
        
    }

    handleTouchMove(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        const pos = event.getLocation();
        const nPos = drag.getNodeSpacePosition(pos);
        // console.log(pos, nPos);
        this._movePos = null;
        if (!this.checkOutOfBounds(nPos, drag)) {
            drag.setPosition(nPos);

            this._movePos = nPos;
        }
        // console.log('this._movePos', this._movePos)
    }

    handleTouchEnd(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;

        const k = drag.getDragNum();
        if (k === 0) {// 该节点没有被拖动过
            this._dragCount++;
        }
        drag.setDragNum(k + 1);

        if (!this._movePos) return;

        // const specifyPos = drag.getSpecifyPosition();
        // if (specifyPos) {// 说明是拖拽目标
        //     const mPos = this._movePos.clone();
        //     const distance = mPos.subtract(specifyPos).length();
        //     console.log('this._movePos', this._movePos, specifyPos, distance);
        //     // 距离判断
        //     if (distance <= Constant.RANGE_DISTANCE) {
        //         // TODO: 角度判断
        //         drag.setIsSpecifyPos(true);
        //     } else {
        //         drag.setIsSpecifyPos(false);
        //     }
        // }

        this.checkResult(this._movePos);
    }

    /** 使用技能 */
    useSkill(skillName: string) {
        
    }

    checkResult(pos: Vec3) {
        let endFlag = true;
        const maxDragCount = Constant.dragManager.dragCount;
        if (this._targetList.length <= 0 || maxDragCount > 0 && this._dragCount < maxDragCount) return

        const res = this._targetList.every((item) => {
            return item && item.getSpecifySuccess()
        });
        if (res) {
            console.log('成功');
            Constant.dialogManager.showTipPic('right', 100, pos, () => {
                // director.emit(Constant.EVENT_TYPE.PAGE_MOVE_FREE_RESET);
                Constant.gameManager.gamePass();
            });
            // TODO: 弹框
        } else {
            if (maxDragCount === -1) {
                endFlag = false;
            } else {
                console.log('错误');
                // TODO: 弹框
                Constant.dialogManager.showTipPic('wrong', 100, pos, () => {
                    // director.emit(Constant.EVENT_TYPE.PAGE_MOVE_FREE_RESET);
                    Constant.gameManager.resetInitPos();
                });
            }
        }
        
        this._isEnd = endFlag;
    }

    /** 是否超出边界 */
    checkOutOfBounds(pos: Vec3, drag: Drag) {
        const parentBox = drag.getParentRectBox();
        return Utils.checkOutOfBounds(pos, parentBox);
    }

    /** 为了与非自由移动的拖拽控制对外接口保持一致 */
    setAnswerList(list: Drag[]) {
        this._targetList = list;
    }

    setGraphics(g: Graphics) {
        this._g = g;
    }

}

