import { _decorator, CCString, Color, Component, Constructor, EventTouch, Graphics, instantiate, js, math, misc, Node, Prefab, resources, Size, Sprite, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { Constant } from '../util/Constant';
import { DragData } from '../data/DragData';
import { Drag } from './Drag';
import { Utils } from '../util/Utils';
const { ccclass, property } = _decorator;

@ccclass('DragManager')
export class DragManager extends Component {

    @property(Prefab)
    dragPrefab: Prefab = null;

    @property(Node)
    graphics: Node = null;

    @property({ type: CCString })
    dragControlName: any = '';

    dragControl: any = null;

    startX: number = 0;
    startY: number = 0;
    size: number = 0;// 方块大小
    width: number = 0;
    colCount: number = 0;// 列数
    rowCount: number = 0;// 行数
    dragCount: number = 0;// 拖动次数
    isAllowRepeat: boolean = false;// 是否允许重复
    shape: string = '';// 模型形状
    shapeWidth: number = 0;// 模型宽
    shapeHeight: number = 0;// 模型高

    private _dragList: any[] = [];
    private _data = null;
    private _dragSkin = null;
    private _skinNodeName: string = 'skin';
    private _g: Graphics = null;
    private _skinType: string = '';
    private _isReduceSize: boolean = false;

    __preload () {
        Constant.dragManager = this
    }

    onLoad() {
        const uiTransform = this.node.getComponent(UITransform);
        const { width, height } = uiTransform.contentSize;
        // 左上角位置
        this.startX = - width / 2;
        this.startY = height / 2;
        this.width = width;
        this._g = this.node.getComponent(Graphics);

        const DynamicControl = js.getClassByName(this.dragControlName || '');
        if (DynamicControl) {
            this.dragControl = new DynamicControl();
            const g = this.graphics.getComponent(Graphics);
            this.dragControl.setGraphics(g);
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    resetData() {
        this._data = null;
        this.size = 0;
        this.colCount = 0;
        this.rowCount = 0;
        this.dragCount = 0;
        this.isAllowRepeat = false;
        this.shape = '';
        this.shapeWidth = 0;
        this.shapeHeight = 0;
        this._dragSkin = Constant.SKIN_STYLE[this._skinType] || {}
        this._isReduceSize = false;

        this.clearDragList();
        this.dragControl && this.dragControl.resetData();
    }

    init(data: any = null, skinType: string = 'Style1') {
        this._skinType = skinType;
        this.resetData();

        if (data) {
            const { list, answer, posFree, posFreeAnswer, col, whRatio, dragLineType, shape, dragCount, isRepeat } = data || {};
            const c = col > 0 ? col : 1;
            this.colCount = c;
            this.dragCount = dragCount;
            this._data = data;
            this.shape = shape;
            this.isAllowRepeat = !!isRepeat;

            if (answer && answer.length) {
                this.dragControl && this.dragControl.setAnswerList(answer);
            }
            const blockShape = shape || Constant.MODEL_SHAPE.SQUARE;
            this.batchGenerateDrag(list, c, whRatio, dragLineType, blockShape, posFree, posFreeAnswer);
        }
    }

    batchGenerateDrag(list: number[], col: number, whRatio: number, dragLineType: string, shape: string, posFree: any, posFreeAnswer: any) {
        const row = Math.ceil(list.length / col);
        const m_width = this.width / col;
        const m_height = m_width * whRatio;
        const size = Math.max(m_width, m_height);
        // const triangleList = [];
        const isBorderShape = Constant.MODEL_SHAPE.BORDER_RECT === shape;
        this.size = size;
        this.rowCount = row;
        this.shapeWidth = isBorderShape ? m_width - m_height : m_width;
        this.shapeHeight = m_height;

        const isFreeMoveMode = posFree && posFreeAnswer;
        const freeMoveTargetList = [];
        let freeMovePos;
        let freeMoveIndex = 0;
        
        this.clearLine();
        for(let i = 0; i < row; i++) {
            const isBorder = i % 2 && isBorderShape;
            for(let j = 0; j < col; j++) {
                // 获取位置信息
                let pos;
                const index = this.getIndex(i, j);
                if (Constant.MODEL_SHAPE.CIRCLE === shape) {
                    pos = Utils.convertRowColToPosCircle(i, j, size, this.startX, this.startY)
                } else if (Constant.MODEL_SHAPE.BORDER_RECT === shape) {
                    pos = Utils.convertRowColToPosRectBorder(i, j, size, this.startX, this.startY)
                } else if (Constant.MODEL_SHAPE.HEXAGON === shape) {
                    pos = Utils.convertRowColToPosHexagon(i, j, size, this.startX, this.startY)
                } else {
                    pos = Utils.convertRowColToPosRect(i, j, size, this.startX, this.startY)
                }

                // 设置dragList
                if (isFreeMoveMode) {// 自由移动模式
                    freeMovePos = pos;
                    if (list[index]) {
                        const iPos = posFree && posFree[freeMoveIndex];
                        freeMovePos = iPos && iPos.length ? iPos[0] : pos;
                        const drag = this.generateDrag(freeMovePos, this.shapeWidth, this.shapeHeight, list[index]);
                        this._dragList.push([freeMovePos, 1, drag]);
                        
                        if (isBorder) {
                            // 设置旋转角度
                            const euler = iPos && iPos.length > 1 ? iPos[1] : null;
                            if (euler) {
                                drag.setRotation(new Vec3(euler.x, euler.y, euler.z));
                            } else {
                                drag.setRotation();
                            }
                        }

                        const freeAnswer = posFreeAnswer && posFreeAnswer[freeMoveIndex];
                        if (freeAnswer && freeAnswer.length) {
                            // console.log('freeAnswer', freeAnswer, drag);
                            drag.setSpecifyPosition(freeAnswer[0]);
                            if (freeAnswer.length > 1) {
                                drag.setSpecifyRotation(freeAnswer[1]);
                            }
                            freeMoveTargetList.push(drag);
                        }

                        // console.log('drag', freeMoveIndex, drag);

                        freeMoveIndex++;
                    } else {
                        this._dragList.push([freeMovePos, 0, null]);
                    }
                } else {
                    if (list[index]) {
                        const drag = this.generateDrag(pos, this.shapeWidth, this.shapeHeight, list[index]);
                        this._dragList.push([pos, 1, drag]);
                        if (isBorder) {
                            drag.setRotation();
                        }
                    } else {
                        this._dragList.push([pos, 0, null]);
                    }
                }
                
                // 划线
                if (dragLineType) {
                    if (isBorder) {
                        this.drawLine(pos.clone(), this.shapeHeight, this.shapeWidth, dragLineType, shape);
                    } else {
                        if (isBorderShape && i % 2 === 0 && j === 0)  continue;
                        this.drawLine(pos.clone(), this.shapeWidth, this.shapeHeight, dragLineType, shape);
                    }
                }
            }
        }

        if (isFreeMoveMode && freeMoveTargetList.length > 0) {
            this.dragControl && this.dragControl.setAnswerList(freeMoveTargetList);
        }
    }


    generateDrag(pos: Vec3, width: number, height: number, skinCode: number = 0) {
        // 生成拖拽节点
        const dragNode = instantiate(this.dragPrefab);
        this.setDragSize(dragNode, width, height);
        dragNode.setPosition(pos);
        dragNode.setParent(this.node);

        if (skinCode) {
            const texture = this.getTextureName(skinCode.toString());
            this.setDragSkin(dragNode, texture);
        }

        const drag = dragNode.getComponent(Drag);
        return drag;
    }

    setDragSize(dragNode: Node, width: number, height: number) {
        const newSize = new Size(width, height);
        const uiTransform = dragNode.getComponent(UITransform);
        if (uiTransform) {
            uiTransform.setContentSize(newSize);
        }
        const skinNode = dragNode.getChildByName(this._skinNodeName)
        if (skinNode) {
            skinNode.getComponent(UITransform).setContentSize(newSize);
        }
    }

    getTextureName(texture: string) {
        return this._dragSkin.namePrefix + texture
    }

    setDragSkin(dragNode: Node, texture: string, extendPath: string = '') {
        const dragTextPath = extendPath || (this._dragSkin.spriteDir + texture + '/spriteFrame')
        if (dragNode) {
            resources.load(dragTextPath, SpriteFrame, (err, spriteFrame) => {
                // console.log(err, spriteFrame)
                if (spriteFrame) {
                    let spriteNode = dragNode.getChildByName(this._skinNodeName)
                    if (spriteNode) {
                        spriteNode.getComponent(Sprite).spriteFrame = spriteFrame
                    }
                }
            })
        }
    }

    convertPosToRowCol(pos: Vec3) {
        const { shape } = this._data;
        if (Constant.MODEL_SHAPE.CIRCLE === shape) {
            return Utils.convertPosToRowColCircle(pos, this.size, this.startX, this.startY)
        } else if (Constant.MODEL_SHAPE.BORDER_RECT === shape) {
            return Utils.convertPosToRowColRectBorder(pos, this.size, this.startX, this.startY)
        } else if (Constant.MODEL_SHAPE.HEXAGON === shape) {
            return Utils.convertPosToRowColHexagon(pos, this.size, this.startX, this.startY)
        } else {
            return Utils.convertPosToRowColRect(pos, this.size, this.startX, this.startY)
        }
    }

    getIndex(row: number, col: number) {
        return row * this.colCount + col;
    }

    /** 修改dragList中的index对象值 */
    setDragListValue(index: number, drag: Drag | null) {
        if (index < 0 || index >= this._dragList.length) {
            return false;
        }
        const oldVal = this._dragList[index];
        const oldDragList = oldVal.slice(2) || [];
        if (this.isAllowRepeat) {// 允许重复
            if (drag) {// 添加
                oldVal[1] += 1;
                oldDragList.push(drag);
            } else {
                oldVal[1] -= 1;
                if (oldDragList.length > 1) {// 减少
                    oldDragList.pop();
                } else {// 只有一个的时候，清空
                    oldDragList[0] = null
                }
            }
        } else {// 不允许重复，直接替换
            oldVal[1] = drag ? 1 : 0;
            oldDragList[0] = drag
        }
        
        const newVal = [oldVal[0], oldVal[1], ...oldDragList];
        this._dragList[index] = newVal;
        return true;
    }

    /** 只返回位置和个数，防止外部修改drag对象 */
    getDragListValue(index: number) {
        if (index < 0 || index >= this._dragList.length) {
            return null;
        }
        const list = this._dragList[index];
        return list.slice(0, 2);
    }

    handleTouchStart(event: EventTouch, drag: Drag) {
        this.dragControl && this.dragControl.handleTouchStart(event, drag);
    }

    handleTouchMove(event: EventTouch, drag: Drag) {
        this.dragControl && this.dragControl.handleTouchMove(event, drag);
    }

    handleTouchEnd(event: EventTouch, drag: Drag) {
        this.dragControl && this.dragControl.handleTouchEnd(event, drag);
    }

    checkIsSameList(list: number[]) {
        // console.log('this._dragList', this._dragList.map(item => item[1]), list)
        return this._dragList.length === list.length && this._dragList.every((item, index) => {
            if (this.isAllowRepeat) {
                return item[1] === list[index]
            } else if (item[1] || list[index]) {
                return item[1] && list[index]
            }
            return true
        });
    }

    clearDragList() {
        this._dragList.forEach((item) => {
            if (item && item.length >= 3) {
                const oldDragList = item.slice(2);
                oldDragList.forEach((drag) => {
                    if (drag && drag.node) {
                        drag.node.destroy();
                    }
                });
            }
        });

        this._dragList = [];
    }

    drawLine(pos: Vec3, width: number, height: number, dragLineType: string, shape: string = Constant.MODEL_SHAPE.SQUARE) {
        if (!this._g || !dragLineType) return;
        if (Constant.MODEL_SHAPE.CIRCLE === shape) {
            if (dragLineType === Constant.DRAW_LINE_TYOPE.DOTLINE) {// 绘制虚线
                Utils.drawDotCircle(this._g, pos, this.size / 2, 3, new Color(255, 255, 255, 80));
            } else {
                Utils.drawFullCircle(this._g, pos, this.size / 2, 2, new Color(255, 255, 255, 60));
            }
        } else if (Constant.MODEL_SHAPE.HEXAGON === shape) {
            Utils.drawFullHexagon(this._g, pos, this.size / 2, 2, new Color(255, 255, 255, 60));
        } else {
            if (dragLineType === Constant.DRAW_LINE_TYOPE.DOTLINE) {// 绘制虚线
                Utils.drawDotRect(this._g, pos, width, height, 3, new Color(255, 255, 255, 80));
            } else {
                Utils.drawFullRect(this._g, pos, width, height, 2, new Color(255, 255, 255, 60));
            }
        }
    }

    clearLine() {
        if (!this._g) return;
        this._g.clear();
    }
}

