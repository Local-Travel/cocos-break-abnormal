
interface IPosObject {
    x: number;
    y: number;
    z: number;
    /** 误差范围 */
    distance?: number;
}
interface IPosAnswer {
    /** 位置索引：[位置，旋转] */
    [index: string]: IPosObject[];
}
interface IDragData {
    /** 皮肤个数 */
    skinCount?: number;
    /** 目标个数 */
    targetCount?: number;
    /** 目标icon */
    targetIcon?: number;
    /** 时间限制，单位秒 */
    limitTime: number;
    /** 拖拽次数，-1表示无限拖拽 */
    dragCount: number;
    /** 同一位置是否允许重复覆盖 */
    isRepeat: boolean;
    /** 拖拽位置绘制的类型，空表示不绘制，对应Constant.DRAW_LINE_TYOPE */
    dragLineType: string;
    /** 宽高比例，以宽为基准 */
    whRatio: number;
    /** 列数 */
    col: number;
    /** 形状，对应Constant.MODEL_SHAPE */
    shape: string;
    /** 等级名称 */
    levelName: string;
    /** 显示名称 */
    name: string;
    /** 描述信息 */
    desc: string;
    /** 显示网格列表 */
    list: number[];
    /** 固定拖拽的答案列表 */
    answer: number[];
    /** 自由拖拽的位置对象，以列表中大于0的数据index索引为key */
    posFree?: IPosAnswer;
    /** 自由拖拽的答案对象，以列表中大于0的数据index索引为key，包含位置和旋转 */
    posFreeAnswer?: IPosAnswer;
}

export class DragData {
    /** 获取固定拖动数据 */
    static getDragData(level: number) {
        // list中的code代表皮肤
        const dragList: IDragData[] = [
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 3,
                isRepeat: false,
                dragLineType: '',
                whRatio: 1,
                col: 8,
                shape: 'circle',
                levelName: '关卡 1',
                name: '移动3个硬币使其成为正三角',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 0, 0, 0,
                    0, 0, 0, 1, 1, 0, 0, 0, 
                    0, 0, 0, 1, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                ],
                answer: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0, 0, 0, 0, 
                    0, 0, 0, 1, 1, 0, 0, 0,
                    0, 0, 1, 1, 1, 0, 0, 0,
                    0, 0, 1, 1, 1, 1, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 2,
                limitTime: 180,
                isRepeat: false,
                dragLineType: 'full',
                whRatio: 0.2,
                col: 6,
                shape: 'border-rect',
                levelName: '关卡 2',
                name: '移动2根火柴变成4个相同正方形',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 2, 2, 2, 0,
                    0, 2, 2, 2, 2, 0,
                    0, 0, 2, 2, 2, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                ],
                answer: [
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 2, 0, 2, 0,
                    0, 2, 2, 2, 2, 0,
                    0, 0, 2, 2, 2, 0,
                    0, 0, 2, 2, 0, 0,
                    0, 0, 2, 2, 0, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 4,
                limitTime: 180,
                isRepeat: true,
                dragLineType: '',
                whRatio: 1,
                col: 5,
                shape: 'squre',
                levelName: '关卡 3',
                name: '移动4个硬币变成正方形，且每边都是4枚',
                desc: '',
                list: [
                    0, 0, 0, 0, 0,  
                    0, 1, 1, 1, 0,
                    0, 1, 0, 1, 0,
                    0, 1, 1, 1, 0,
                    0, 0, 0, 0, 0,
                ],
                answer: [
                    0, 0, 0, 0, 0,  
                    0, 2, 0, 2, 0,
                    0, 0, 0, 0, 0,
                    0, 2, 0, 2, 0,
                    0, 0, 0, 0, 0, 
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 2,
                isRepeat: false,
                dragLineType: '',
                whRatio: 1,
                col: 7,
                shape: 'square',
                levelName: '关卡 1',
                name: '移动2个硬币使其成三排，每排都是4枚',
                desc: '',
                list: [
                    -1, -1, 0, 0, 0, 0, 0, 
                    -1, -1, 1, 1, 1, 0, 0,
                    -1, -1, 1, 1, 1, 0, 0,
                    -1, -1, 1, 1, 1, 0, 0,
                    -1, -1, 0, 0, 0, 0, 0,
                ],
                answer: [
                    -1, -1, 1, 0, 0, 0, 0,
                    -1, -1, 1, 1, 0, 0, 0,
                    -1, -1, 1, 0, 1, 0, 0,
                    -1, -1, 1, 1, 1, 1, 0,
                    -1, -1, 0, 0, 0, 0, 0,
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 2,
                isRepeat: false,
                dragLineType: '',
                whRatio: 1,
                col: 7,
                shape: 'circle',
                levelName: '关卡 1',
                name: '移动2个硬币使其变成六边形',
                desc: '',
                list: [
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, 1, 1, 1, 0, 0,
                    -1, -1, 1, 1, 0, 0, 0,
                    -1, -1, -1, 1, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                ],
                answer: [
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, 0, 1, 1, 0, 0,
                    -1, -1, 1, 0, 1, 0, 0,
                    -1, -1, -1, 1, 1, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                ],
            },
        ]

        let data = dragList[0]
        if (level <= dragList.length && level > 0) {
            data = dragList[level - 1]
        }

        return {
            col: data.col,
            list: data.list,
            data,
        }
    }

    /** 获取自由拖动数据 */
    static getFreeMoveData(level: number) {
        // list中的code代表皮肤
        const dragList: IDragData[] = [
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 1,
                limitTime: 60,
                isRepeat: false,
                dragLineType: 'full',
                whRatio: 0.2,
                col: 6,
                shape: 'border-rect',
                levelName: '关卡 2',
                name: '移动1根火柴使其成为正方形',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 0, 2, 2, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                ],
                answer: [],
                posFree: {
                    0: [{ x: -56, y: 208, z: 0 }],
                    1: [{ x: -100, y: 158, z: 0 }],
                    2: [{ x: -14, y: 158, z: 0 }],
                    3: [{ x: -56, y: 108, z: 0 }],
                },
                posFreeAnswer: {
                    2: [{ x: -2, y: 158, z: 0, distance: 3 }],
                },
            },
        ]

        let data = dragList[0]
        if (level <= dragList.length && level > 0) {
            data = dragList[level - 1]
        }

        return {
            col: data.col,
            list: data.list,
            data,
        }
    }
}

