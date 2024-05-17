import { Constant } from "../util/Constant";

interface IPosObject {
    x: number;
    y: number;
    z: number;
}
interface IPosAnswerObject {
    x: number;
    y: number;
    z: number;
    /** 误差范围 */
    distance: number;
}
interface IPos {
    /** 位置索引：[位置，旋转] */
    [index: string]: IPosObject[];
}
interface IPosAnswer {
    /** 位置索引：[位置，旋转] */
    [index: string]: IPosAnswerObject[];
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
    /** 任务名称 */
    name: string;
    /** 描述信息 */
    desc: string;
    /** 显示网格列表，-1表示占位，-5表示不能移动 */
    list: number[];
    /** 固定拖拽的答案列表 */
    answer: number[];
    /** 自由拖拽的位置对象，以列表中大于0的数据index索引为key */
    posFree?: IPos;
    /** 自由拖拽的答案对象，以列表中大于0的数据index索引为key，包含位置和旋转 */
    posFreeAnswer?: IPosAnswer;
}

export class DragData {
    /** 获取固定拖动数据 */
    static getFixedMoveData(level: number) {
        // list中的code代表皮肤
        const dragList: IDragData[] = [
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
                dragCount: 3,
                isRepeat: false,
                dragLineType: 'full',
                whRatio: 1,
                col: 9,
                shape: 'square',
                levelName: '关卡 1',
                name: '移动3个硬币使其变成4-3-2-1',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0, 0, 0, -1,
                    0, 0, 0, 0, 0, 0, 0, 0, -1, 
                    0, 0, 0, 0, 1, 0, 1, 0, -1,
                    1, 0, 1, 0, 1, 0, -5, 0, 0,
                    0, 0, 1, 0, 1, 0, -5, 0, -1, 
                    0, 0, 0, 0, 0, 0, 1, 0, -1,
                    0, 0, 0, 0, 0, 0, 0, 0, -1,
                    0, 0, 0, 0, 0, 0, 0, 0, -1,
                ],
                answer: [
                    0, 0, 0, 0, 0, 0, 0, 0, -1,
                    0, 0, 0, 0, 0, 0, 0, 0, -1,
                    0, 0, 1, 0, 1, 0, 0, 0, -1,
                    0, 0, 1, 0, 1, 0, -5, 0, 1,
                    0, 0, 1, 0, 1, 0, -5, 0, -1, 
                    0, 0, 1, 0, 0, 0, 0, 0, -1,
                    0, 0, 0, 0, 0, 0, 0, 0, -1, 
                    0, 0, 0, 0, 0, 0, 0, 0, -1,
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
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 3,
                isRepeat: false,
                dragLineType: 'full',
                whRatio: 1,
                col: 7,
                shape: 'hexagon-reverse',
                levelName: '关卡 1',
                name: '移动3个方块使其变成六边形',
                desc: '',
                list: [
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    0, 0, 4, 4, 4, 0, 0,
                    0, 4, 4, 4, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                ],
                answer: [
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    0, 0, 0, 4, 4, 4, 0,
                    0, 0, 0, 4, 0, 4, 0,
                    -1, -1, -1, 0, 4, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                    -1, -1, -1, 0, 0, 0, 0,
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 3,
                isRepeat: false,
                dragLineType: 'full',
                whRatio: 1,
                col: 8,
                shape: 'hexagon',
                levelName: '关卡 1',
                name: '移动3个方块使其成为正三角',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 3, 3, 3, 3, 0, 0,
                    0, 0, 3, 3, 3, 0, 0, 0,
                    0, 0, 0, 3, 3, 0, 0, 0, 
                    0, 0, 0, 3, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                ],
                answer: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 3, 0, 0, 0, 0, 
                    0, 0, 0, 3, 3, 0, 0, 0,
                    0, 0, 3, 3, 3, 0, 0, 0,
                    0, 0, 3, 3, 3, 3, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
                    0, 0, 0, 0, 0, 0, 0, 0, 
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
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 3,
                isRepeat: false,
                dragLineType: '',
                whRatio: 1,
                col: 7,
                shape: 'square',
                levelName: '关卡 1',
                name: '在不移动周围硬币的情况下，取出中间的硬币',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                ],
                answer: [
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 1, 0, 0,
                    0, 0, 1, 0, 1, 0, 0,
                    0, 0, 1, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0,
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                limitTime: 180,
                dragCount: 1,
                isRepeat: false,
                dragLineType: '',
                whRatio: 1,
                col: 7,
                shape: 'square',
                levelName: '关卡 1',
                name: '移动一枚硬币使两排的个数都是5',
                desc: '',
                list: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 1, 1, 1, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                ],
                answer: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                ],
            },
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 11,
                limitTime: 180,
                isRepeat: false,
                dragLineType: 'full',
                whRatio: 0.2,
                col: 6,
                shape: 'border-rect',
                levelName: '关卡 2',
                name: '移动火柴变成1个相同正方形',
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
                    0, 0, 2, 0, 0, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
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
            type: Constant.PageType.PAGE_MOVE,
            data,
        }
    }

    /** 获取自由拖动数据 */
    static getFreeMoveData(index: number) {
        // list中的code代表皮肤
        const dragList: IDragData[] = [
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 1,
                limitTime: 120,
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
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 1,
                limitTime: 180,
                isRepeat: true,
                dragLineType: 'full',
                whRatio: 0.2,
                col: 6,
                shape: 'border-rect',
                levelName: '关卡 2',
                name: '移动1根火柴使等式成立',
                desc: '',
                list: [
                    0, 0, 2, 0, 2, 0,
                    0, 2, 2, 2, 2, 0,
                    0, 2, 2, 2, 2, 0,
                    0, 2, 0, 2, 0, 2,
                    0, 0, 2, 0, 0, 0,
                ],
                answer: [],
                posFree: {
                    0: [{ x: 2, y: 266, z: 0 }],
                    1: [{ x: 216, y: 266, z: 0 }],

                    2: [{ x: -162, y: 212, z: 0 }],
                    3: [{ x: -106, y: 160, z: 0 }],
                    4: [{ x: 52, y: 212, z: 0 }],
                    5: [{ x: 266, y: 212, z: 0 }],

                    6: [{ x: -106, y: 160, z: 0 }],
                    7: [{ x: 2, y: 160, z: 0 }],
                    8: [{ x: 108, y: 122, z: 0 }],
                    9: [{ x: 108, y: 202, z: 0 }],

                    10: [{ x: -160, y: 106, z: 0 }],
                    11: [{ x: -54, y: 106, z: 0 }],
                    12: [{ x: 264, y: 106, z: 0 }],

                    13: [{ x: 2, y: 54, z: 0 }],

                },
                posFreeAnswer: {
                    1: [{ x: -212, y: 160, z: 0, distance: 3 }],
                },
            },
        ]

        let data = dragList[index]

        return {
            col: data?.col,
            list: data?.list,
            type: Constant.PageType.PAGE_MOVE_FREE,
            data,
        }
    }

    static getDragData(level: number) {
        // 自由拖动的等级
        const freeLevel = [6, 8];
        const index = freeLevel.findIndex(item => item === level);

        if (index < 0) {
            return this.getFixedMoveData(level - freeLevel.length);
        } else {
            return this.getFreeMoveData(index);
        }
    }
}

