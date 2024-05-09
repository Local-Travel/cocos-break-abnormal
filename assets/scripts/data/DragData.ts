export class DragData {
    /** 获取拖动数据 */
    static getDragData(index: number) {
        const dragList = [
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 3,
                isDragLine: false,
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
                isDragLine: false,
                whRatio: 0.2,
                col: 6,
                shape: 'border-rect',
                levelName: '关卡 2',
                name: '移动2根火柴变成4个相同正方形',
                desc: '',
                list: [
                    0, 0, 2, 2, 2, 0,
                    0, 2, 2, 2, 2, 0,
                    0, 0, 2, 2, 2, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                ],
                answer: [
                    0, 0, 2, 0, 2, 0,
                    0, 2, 2, 2, 2, 0,
                    0, 0, 2, 2, 2, 0,
                    0, 0, 2, 2, 0, 0,
                    0, 0, 2, 2, 0, 0,
                    0, 2, 2, 0, 0, 0,
                    0, 0, 2, 0, 0, 0,
                ],
            },
        ]

        let data = dragList[0]
        if (index <= dragList.length && index > 0) {
            data = dragList[index - 1]
        }

        return {
            col: data.col,
            list: data.list,
            data,
        }
    }
}

