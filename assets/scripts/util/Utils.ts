import { Vec3, _decorator, sys } from 'cc';

export class Utils {
    /** 根据行列转换位置-方块，左上角起始点 */
    static convertRowColToPosRect(row: number, col: number, size: number, startX: number, startY: number): Vec3 {
        const x = startX + col * size + size / 2;
        const y = startY - (row * size + size / 2);
        return new Vec3(x, y, 0);
    }

    /** 根据位置转换行列-方块，左上角起始点 */
    static convertPosToRowColRect(pos: Vec3, size: number, startX: number, startY: number): number[] {
        const row = Math.round((startY - pos.y - size / 2) / size);
        const col = Math.round((pos.x - startX - size / 2) / size);
        return [row, col];
    }

    /** 根据行列转换位置-圆，左上角起始点 */
    static convertRowColToPosCircle(row: number, col: number, size: number, startX: number, startY: number): Vec3 {
        const x = startX + col * size + size / 2 * (row % 2 + 1);
        const y = startY - (row * size / 2 * Math.sqrt(3) + size / 2);
        console.log('convertRowColToPosCircle', row, col, x, y)
        return new Vec3(x, y, 0);
    }

    /** 根据位置转换行列-圆，左上角起始点 */
    static convertPosToRowColCircle(pos: Vec3, size: number, startX: number, startY: number): number[] {
        const row = Math.round((startY - pos.y - size / 2) / (size / 2 * Math.sqrt(3)));
        const rr = row < 0 ? 0 : row;
        const col = Math.round((pos.x - startX - size / 2 * (row % 2 + 1)) / size);
        console.log('convertPosToRowColCircle', row, col, pos.x, pos.y)
        return [row, col];
    }

    /**
      * 设置本地数据
      * @param key 
      * @param data 
      */
    static setLocalStorage(key: string, data: any) {
        try {
            sys.localStorage.setItem(key, JSON.stringify(data))
            return true
        } catch (e) {
            console.error(e)
        }
        return false
    }

    /**
     * 获取本地数据
     * @param key 
     */
    static getLocalStorage(key: string) {
        try {
            const dataStr = sys.localStorage.getItem(key)
            if (dataStr) {
                const data = JSON.parse(dataStr)
                return data
            }
        } catch (e) {
            console.error(e)
        }
        return null
    }
}

