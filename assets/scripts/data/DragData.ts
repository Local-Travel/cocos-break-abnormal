export class DragData {
    /** 获取拖动数据 */
    static getDragData(index: number) {
        const dragList = [
            {
                skinCount: 1,
                targetCount: 0,
                targetIcon: 0,
                dragCount: 3,
                col: 8,
                shape: 'circle',
                levelName: '关卡 1',
                name: '移动3个球使其成为正三角',
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

