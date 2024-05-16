import { _decorator, Color, Component, director, EventTouch, find, Graphics, misc, Node, v2, v3, Vec2, Vec3 } from 'cc';
import { Drag } from '../Drag';
import { Constant } from '../../util/Constant';
import { Utils } from '../../util/Utils';
const { ccclass, property } = _decorator;

@ccclass('MoveFixedControl')
export class MoveFixedControl extends Component {

    // 变动的列表
    private _changeList: any[] = [];
    // 答案列表
    private _answerList: any[] = [];

    private _startPos: Vec3 = new Vec3();
    private _startList: any[] = [];

    private _dragCount: number = 0;
    private _index: number = -1;
    private _isEnd: boolean = false;

    private _g: Graphics = null;

    start() {
        this._isEnd = false;
    }

    update(deltaTime: number) {
        
    }

    resetData() {
        this._dragCount = 0;
        this._startPos = null;
        this._changeList = [];
        this._answerList = [];
        this._isEnd = false;
    }

    handleTouchStart(event: EventTouch, drag: Drag) {
        // const pos = event.getLocation();
        if (this._isEnd) return;
        this._startPos = drag.getPosition().clone();

        this._startList = this.getChangeIndexByPos(this._startPos);
        
        this._g && this._g.clear();
    }

    handleTouchMove(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        const pos = event.getLocation();
        const nPos = drag.getNodeSpacePosition(pos);
        this._g && this._g.clear();
        this._index = -1;
        // console.log(pos, nPos);
        if (!this.checkOutOfBounds(nPos, drag)) {
            drag.setPosition(nPos);

            const [index, row] = this.getChangeIndexByPos(nPos);
            if (index < 0) return;

            if (this.drawShapeDotLine(index, row, drag)) {
                this._index = index;
            }
        }
    }

    handleTouchEnd(event: EventTouch, drag: Drag) {
        if (this._isEnd) return;
        // const pos = event.getLocation();
        this._g && this._g.clear();
        const startIndex = this._startList[0];

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
            if (val && val.length && val[1]) {
                Constant.dragManager.setDragListValue(this._index, drag);
                Constant.dragManager.setDragListValue(startIndex, null);
            }
            
            const k = drag.getDragNum();
            if (k === 0) {// 该节点没有被拖动过
                this._dragCount++;
            }
            drag.setDragNum(k + 1);
        }

        this.checkResult(pos);
    }

    /** 使用技能 */
    useSkill(skillName: string) {
        
    }

    /** 是否超出边界 */
    checkOutOfBounds(pos: Vec3, drag: Drag) {
        const parentBox = drag.getParentRectBox();
        return Utils.checkOutOfBounds(pos, parentBox);
    }

    /** 获取变动的列表索引值 */
    getChangeIndexByPos(pos: Vec3) {
        const [row, col] = Constant.dragManager.convertPosToRowCol(v3(pos.x, pos.y, 0));
        if (row < 0 || col < 0 || row >= Constant.dragManager.rowCount || col >= Constant.dragManager.colCount) {
            console.log('转换超出范围', row, col);
            return [-1, row, col];
        }
        const index = Constant.dragManager.getIndex(row, col);
        return [index, row, col];
    }

    checkResult(pos: Vec3) {
        let endFlag = true;
        const maxDragCount = Constant.dragManager.dragCount;
        if (maxDragCount !== -1 && this._dragCount < maxDragCount) return;
        
        const res = Constant.dragManager.checkIsSameList(this._answerList);
        if (res) {
            console.log('成功');
            Constant.dialogManager.showTipPic('right', 100, pos, () => {
                // director.emit(Constant.EVENT_TYPE.PAGE_MOVE_RESET);
                Constant.gameManager.gamePass();
            });
            // TODO: 弹框
        } else {
            if (maxDragCount === -1) {
                endFlag = false;
            } else {
                console.log('失败');
                // TODO: 弹框
                Constant.dialogManager.showTipPic('wrong', 100, pos, () => {
                    // director.emit(Constant.EVENT_TYPE.PAGE_MOVE_RESET);
                    Constant.gameManager.init();
                });
            }
        }
        
        this._isEnd = endFlag;
    }

    drawShapeDotLine(index: number, row: number, drag: Drag) {
        const pos = this.getEmptyIndexPos(index);
        if (!pos) return false;
        const shape = Constant.dragManager.shape;
        // const radius = Constant.dragManager.size / 2;
        // Utils.drawDotCircle(this._g, pos, radius, 5, Color.RED);
        const w = Constant.dragManager.shapeWidth;
        const h = Constant.dragManager.shapeHeight;
        let radius;

        switch (shape) {
            case Constant.MODEL_SHAPE.CIRCLE:
                radius = Constant.dragManager.size / 2;
                Utils.drawDotCircle(this._g, pos, radius, 5, Color.RED);
                break;
            case Constant.MODEL_SHAPE.HEXAGON:
                radius = Constant.dragManager.size / 2;
                Utils.drawFullHexagonReverse(this._g, pos, radius, 2, new Color(255, 0, 0, 200));
                break;
            case Constant.MODEL_SHAPE.HEXAGON_REVERSE:
                radius = Constant.dragManager.size / 2;
                Utils.drawFullHexagon(this._g, pos, radius, 2, new Color(255, 0, 0, 200));
                break;
            case Constant.MODEL_SHAPE.BORDER_RECT:
                const startRow = this._startList[1];
                if (row % 2 !== startRow % 2) return false;// 目标和拖动的，对应的奇偶数要相同
                if (row % 2) {
                    Utils.drawDotRect(this._g, pos, h, w, 3, Color.RED);
                } else {
                    Utils.drawDotRect(this._g, pos, w, h, 3, Color.RED);
                }
                break;
            default:
                Utils.drawDotRect(this._g, pos, w, h, 3, Color.RED);
                break;
        }

        // if (Constant.MODEL_SHAPE.CIRCLE === shape) {
        //     const radius = Constant.dragManager.size / 2;
        //     Utils.drawDotCircle(this._g, pos, radius, 5, Color.RED);
        // } else if (Constant.MODEL_SHAPE.HEXAGON === shape) {
        //     const radius = Constant.dragManager.size / 2;
        //     Utils.drawFullHexagonReverse(this._g, pos, radius, 2, new Color(255, 0, 0, 200));
        // } else if (Constant.MODEL_SHAPE.HEXAGON_REVERSE === shape) {
        //     const radius = Constant.dragManager.size / 2;
        //     Utils.drawFullHexagon(this._g, pos, radius, 2, new Color(255, 0, 0, 200));
        // } else if (Constant.MODEL_SHAPE.BORDER_RECT === shape) {
        //     const startRow = this._startList[1];
        //     if (row % 2 !== startRow % 2) return false;// 目标和拖动的，对应的奇偶数要相同
        //     if (row % 2) {
        //         Utils.drawDotRect(this._g, pos, h, w, 3, Color.RED);
        //     } else {
        //         Utils.drawDotRect(this._g, pos, w, h, 3, Color.RED);
        //     }
        // } else {
        //     Utils.drawDotRect(this._g, pos, w, h, 3, Color.RED);
        // }

        return true;
    }

    getEmptyIndexPos(index: number) {
        const dragVal = Constant.dragManager.getDragListValue(index);
        const isAllowRepeat = Constant.dragManager.isAllowRepeat;
        if (dragVal && (isAllowRepeat || dragVal[1] === 0)) {// 有值且位置为空
            const pos = dragVal[0].clone();
            return pos;
        }
        return null;
    }

    setAnswerList(list: any[]) {
        this._answerList = list;
    }

    setGraphics(g: Graphics) {
        this._g = g;
    }

    
}

