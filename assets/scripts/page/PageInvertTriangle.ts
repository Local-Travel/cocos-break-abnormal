import { _decorator, Component, director, Label, Node } from 'cc';
import { Constant } from '../util/Constant';
import { DragData } from '../data/DragData';
const { ccclass, property } = _decorator;

/** 倒三角页面 */
@ccclass('PageInvertTriangle')
export class PageInvertTriangle extends Component {
    @property(Node)
    taskLabel: Node = null;

    protected onLoad(): void {
        director.on(Constant.EVENT_TYPE.PAGE_INVERT_TRIANGLE_RESET, this.init, this);
    }

    start() {
        this.init();
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        // 移除监听
        director.off(Constant.EVENT_TYPE.PAGE_INVERT_TRIANGLE_RESET, this.init, this);
    }

    init() {
        const { data } = DragData.getDragData(0);
        Constant.dragManager.init(data);

        this.setTitle(data.name);
    }

    setTitle(title: string) {
        this.taskLabel.getComponent(Label).string = title;
    }
}

