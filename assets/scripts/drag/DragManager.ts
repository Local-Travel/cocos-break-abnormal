import { _decorator, Color, Component, EventTouch, Graphics, instantiate, math, Node, Prefab, resources, Size, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { Constant } from '../util/Constant';
import { DragData } from '../data/DragData';
import { Drag } from './Drag';
import { Utils } from '../util/Utils';
import { DragControl } from './DragControl';
const { ccclass, property } = _decorator;

@ccclass('DragManager')
export class DragManager extends Component {

    @property(Prefab)
    dragPrefab: Prefab = null!;

    @property(DragControl)
    dragControl: DragControl = null!;

    startX: number = 0;
    startY: number = 0;
    size: number = 0;// 方块大小
    width: number = 0;
    colCount: number = 0;// 列数
    dragCount: number = 0;// 拖动次数

    private _dragList: any[] = [];
    private _data = null;
    private _dragSkin = null;
    private _skinNodeName: string = 'skin';

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
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    init(data: any = null, skinType: string = 'Style1') {
        this._data = null;
        this.size = 0;
        this.colCount = 0;
        this.dragCount = 0;
        this._dragSkin = Constant.SKIN_STYLE[skinType] || {}

        this.clearDragList();
        this.dragControl.resetData();

        if (data) {
            const { list, answer, col, shape, dragCount } = data || {};
            const c = col > 0 ? col : 1;
            this.colCount = c;
            this.dragCount = dragCount;
            this._data = data;

            this.dragControl.setAnswerList(answer);
            this.batchGenerateDrag(list, c, shape);
        }
    }

    batchGenerateDrag(list: number[], col: number, shape: string = Constant.MODEL_SHAPE.SQUARE) {
        const row = Math.ceil(list.length / col);
        const size = this.width / col;
        // const triangleList = [];
        this.size = size;
        for(let i = 0; i < row; i++) {
            for(let j = 0; j < col; j++) {
                let pos;
                const index = this.getIndex(i, j);
                if (Constant.MODEL_SHAPE.CIRCLE === shape) {
                    pos = Utils.convertRowColToPosCircle(i, j, size, this.startX, this.startY)
                } else {
                    pos = Utils.convertRowColToPosRect(i, j, size, this.startX, this.startY)
                }
                
                if (list[index]) {
                    // const skinCode = list[i * col + j];
                    // const drag = this.generateDrag(pos, size, skinCode);
                    const drag = this.generateDrag(pos, size)
                    this._dragList.push([pos, 1, drag]);
                    // triangleList[index] = 1;
                } else {
                    this._dragList.push([pos, 0, null]);
                    // triangleList[index] = 0;
                }
            }
        }
        // this.dragControl.setChangeList(triangleList);
    }

    generateDrag(pos: Vec3, size: number, skinCode: number = 0) {
        // 生成拖拽节点
        const dragNode = instantiate(this.dragPrefab);
        this.setDragSize(dragNode, size);
        dragNode.setPosition(pos);
        dragNode.setParent(this.node);

        if (skinCode) {
            const texture = this.getTextureName(skinCode.toString());
            this.setDragSkin(dragNode, texture);
        }

        const drag = dragNode.getComponent(Drag);
        return drag;
    }

    setDragSize(dragNode: Node, size: number) {
        const newSize = new Size(size, size);
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
        } else {
            return Utils.convertPosToRowColRect(pos, this.size, this.startX, this.startY)
        }
    }

    getIndex(row: number, col: number) {
        return row * this.colCount + col;
    }

    setDragListValue(index: number, drag: Drag | null) {
        if (index < 0 || index >= this._dragList.length) {
            return;
        }
        const oldVal = this._dragList[index];
        const flag = drag ? 1 : 0;
        const newVal = [oldVal[0], flag, drag];
        this._dragList[index] = newVal;
    }

    getDragListValue(index: number) {
        if (index < 0 || index >= this._dragList.length) {
            return null;
        }
        const list = this._dragList[index];
        return [...list];
    }

    handleTouchStart(event: EventTouch, drag: Drag) {
        this.dragControl.handleTouchStart(event, drag);
    }

    handleTouchMove(event: EventTouch, drag: Drag) {
        this.dragControl.handleTouchMove(event, drag);
    }

    handleTouchEnd(event: EventTouch, drag: Drag) {
        this.dragControl.handleTouchEnd(event, drag);
    }

    checkIsSameList(list: number[]) {
        return this._dragList.length === list.length && this._dragList.every((item, index) => item[1] === list[index]);
    }

    clearDragList() {
        this._dragList.forEach((item) => {
            if (item && item.length >= 3 && item[2]) {
                const drag = item[2];
                if (drag && drag.node) {
                    drag.node.destroy();
                }
            }
        });

        this._dragList = [];
    }
}

