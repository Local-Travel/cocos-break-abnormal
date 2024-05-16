import { Color, Graphics, Vec2, Vec3, _decorator, math, misc, sys, log } from 'cc';
import { WECHAT, BYTEDANCE, BAIDU } from "cc/env"

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

    /** 根据行列转换位置-边界，左上角起始点 */
    static convertRowColToPosRectBorder(row: number, col: number, size: number, startX: number, startY: number): Vec3 {
        const x = startX + col * size + size / 2 * (row % 2);
        const y = startY - (row + 1) * size / 2;
        return new Vec3(x, y, 0);
    }

    /** 根据位置转换行列-边界，左上角起始点 */
    static convertPosToRowColRectBorder(pos: Vec3, size: number, startX: number, startY: number): number[] {
        const row = Math.round((startY - pos.y) / (size / 2) - 1);
        const col = Math.round((pos.x - startX - size / 2 * (row % 2)) / size);
        return [row, col];
    }

    /** 根据行列转换位置-圆，左上角起始点 */
    static convertRowColToPosCircle(row: number, col: number, size: number, startX: number, startY: number): Vec3 {
        const x = startX + col * size + size / 2 * (row % 2 + 1);
        const y = startY - (row * size / 2 * Math.sqrt(3) + size / 2);
        return new Vec3(x, y, 0);
    }

    /** 根据位置转换行列-圆，左上角起始点 */
    static convertPosToRowColCircle(pos: Vec3, size: number, startX: number, startY: number): number[] {
        const row = Math.round((startY - pos.y - size / 2) / (size / 2 * Math.sqrt(3)));
        // const rr = row < 0 ? 0 : row;
        const col = Math.round((pos.x - startX - size / 2 * (row % 2 + 1)) / size);
        return [row, col];
    }

    /** 根据行列转换位置-六边形，左上角起始点 */
    static convertRowColToPosHexagonReverse(row: number, col: number, size: number, startX: number, startY: number): Vec3 {
        const radius = size / 2;
        const w = 1 / 2 * radius * Math.sqrt(3);
        const x = startX + col * w * 2 + w * (row % 2 + 1);
        const y = startY - (row * radius * 1.5);
        return new Vec3(x, y, 0);
    }

    /** 根据位置转换行列-六边形，左上角起始点 */
    static convertPosToRowColHexagonReverse(pos: Vec3, size: number, startX: number, startY: number): number[] {
        const radius = size / 2;
        const w = 1 / 2 * radius * Math.sqrt(3);
        const row = Math.round((startY - pos.y) / (radius * 1.5));
        // const rr = row < 0 ? 0 : row;
        const col = Math.round((pos.x - startX - w * (row % 2 + 1)) / (2 * w));
        return [row, col];
    }

    /** 根据行列转换位置-倒六边形，左上角起始点 */
    static convertRowColToPosHexagon(row: number, col: number, size: number, startX: number, startY: number): Vec3 {
        const radius = size / 2;
        const h = 1 / 2 * radius * Math.sqrt(3);
        const x = startX + radius + col * 1.5 * radius;
        const y = startY - (h + col % 2 * h + row * 2 * h);
        return new Vec3(x, y, 0);
    }

    /** 根据位置转换行列-倒六边形，左上角起始点 */
    static convertPosToRowColHexagon(pos: Vec3, size: number, startX: number, startY: number): number[] {
        const radius = size / 2;
        const h = 1 / 2 * radius * Math.sqrt(3);
        const col = Math.round((pos.x - startX - radius) / (1.5 * radius));
        const row = Math.round((startY - pos.y - col % 2 * h - h) / ( 2 * h));
        // const rr = row < 0 ? 0 : row;
        // const col = Math.round((pos.x - startX - w * (row % 2 + 1)) / (2 * w));
        return [row, col];
    }

    /** 是否超出边界 */
    static checkOutOfBounds(pos: Vec3, box: math.Rect, s: number = 0) {
        const { x, y, width, height } = box;
        const { x: dx, y: dy } = pos;
        let xLeft = x + s;
        let xRight = x + width - s;
        let yTop = y + height - s;
        let yBottom = y + s;
        if (x === 0 && y === 0) {// 说明是左下角起始点的
            const sw = width / 2;
            const sh = height / 2;
            xLeft = -sw + s;
            xRight = sw - s;
            yTop = sh - s;
            yBottom = -sh + s;
        }
        // console.log(pos, parentBox);
        if (dx < xLeft || dx > xRight || dy < yBottom || dy > yTop) {
            console.log('超出边界');
            return true;
        }
        return false;
    }

    /** 画一个虚线圆 */
    static drawDotCircle(g: Graphics, pos: Vec3, radius: number, lineWidth: number, strokeColor: Color) {
        const certer = new Vec2(pos.x, pos.y);
        const spaceAngle = 20;
        const deltaAngle = 20;
        const angle = spaceAngle + deltaAngle;

        g.lineWidth = lineWidth;
        g.strokeColor = strokeColor;
        for(let i = 0; i < 360; i+= angle) {
            const sR = misc.degreesToRadians(i);
            const eR = misc.degreesToRadians(i + deltaAngle);
            g.arc(certer.x, certer.y, radius, sR, eR, true);
            g.stroke();
        }
    }

    /** 画一个实体圆 */
    static drawFullCircle(g: Graphics, pos: Vec3, radius: number, lineWidth: number, fillColor: Color) {
        g.lineWidth = lineWidth;
        g.fillColor = fillColor;
        g.circle(pos.x, pos.y, radius);
        g.fill();
    }

    /** 画一个虚线矩形 */
    static drawDotRect(g: Graphics, pos: Vec3, width: number, height: number, lineWidth: number, strokeColor: Color) {
        const begin = new Vec2(pos.x - width / 2, pos.y - height / 2);
        const end = new Vec2(pos.x + width / 2, pos.y + height / 2);
        const min = Math.min(width, height);
        const lineLen = Math.min(20, min);
        const spaceLen = Math.min(10, min);

        g.lineWidth = lineWidth;
        g.strokeColor = strokeColor;
        // 横向
        for(let i = 0; i < width; ) {
            if(i + lineLen > width) break;
            g.moveTo(begin.x + i, begin.y);
            g.lineTo(begin.x + i + lineLen, begin.y);
            
            g.moveTo(begin.x + i, end.y);
            g.lineTo(begin.x + i + lineLen, end.y);

            i += (lineLen + spaceLen);
            g.stroke();
        }
        // 纵向
        for(let i = 0; i < height; ) {
            if(i + lineLen > height) break;
            g.moveTo(begin.x, begin.y + i);
            g.lineTo(begin.x, begin.y + i + lineLen);
            
            g.moveTo(end.x, begin.y + i);
            g.lineTo(end.x, begin.y + i + lineLen);

            i += (lineLen + spaceLen);
            g.stroke();
        }
    }

    /** 画一个实体矩形 */
    static drawFullRect(g: Graphics, pos: Vec3, width: number, height: number, lineWidth: number, fillColor: Color) {
        g.lineWidth = lineWidth;
        g.fillColor = fillColor;
        
        const begin = new Vec2(pos.x - width / 2, pos.y - height / 2);
        g.rect(begin.x, begin.y, width, height);
        g.fill();
    }

    /** 画一个实体六边形 */
    static drawFullHexagonReverse(g: Graphics, pos: Vec3, radius: number, lineWidth: number, fillColor: Color) {
        g.lineWidth = lineWidth;
        g.fillColor = fillColor;
        g.strokeColor = new Color(0, 0, 0, 150);
        const begin = new Vec2(pos.x, pos.y);
        const w = 1 / 2 * radius * Math.sqrt(3);        
        
        // 左上
        g.moveTo(begin.x - w, begin.y + 1 / 2 * radius);
        // 上
        g.lineTo(begin.x, begin.y + radius);
        // 右上
        g.lineTo(begin.x + w, begin.y + 1 / 2 * radius);
        // 右下
        g.lineTo(begin.x + w, begin.y - 1 / 2 * radius);
        // 下
        g.lineTo(begin.x, begin.y - radius);
        // 左下
        g.lineTo(begin.x - w, begin.y - 1 / 2 * radius);

        g.stroke();
        g.fill();
    }

    /** 画一个实体倒六边形 */
    static drawFullHexagon(g: Graphics, pos: Vec3, radius: number, lineWidth: number, fillColor: Color) {
        g.lineWidth = lineWidth;
        g.fillColor = fillColor;
        g.strokeColor = new Color(0, 0, 0, 150);
        const begin = new Vec2(pos.x, pos.y);
        const h = 1 / 2 * radius * Math.sqrt(3);        
        
        // 左上
        g.moveTo(begin.x - 1 / 2 * radius, begin.y + h);
        // 右上
        g.lineTo(begin.x + 1 / 2 * radius, begin.y + h);
        // 右
        g.lineTo(begin.x + radius, begin.y);
        // 右下
        g.lineTo(begin.x + 1 / 2 * radius, begin.y - h);
        // 左下
        g.lineTo(begin.x - 1 / 2 * radius, begin.y - h);
        // 左
        g.lineTo(begin.x - radius, begin.y);

        g.stroke();
        g.fill();
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

    /**
  * 调用振动效果
  */
  static vibrateShort() {
    if (WECHAT && typeof (<any>window).wx !== undefined) {// 微信
      (<any>window).wx.vibrateShort({
        type: 'heavy',
        success: () => log('调用振动成功'),
        fail: (err) => log('调用振动失败', err),
      });
    }
    if (BYTEDANCE && typeof (<any>window).tt !== undefined) {// 字节
      (<any>window).tt.vibrateShort({
        success: () => log('调用振动成功'),
        fail: (err) => log('调用振动失败', err),
      });
    }
    if (BAIDU && typeof (<any>window).swan !== undefined) {// 百度
      (<any>window).swan.vibrateShort({
        success: () => log('调用振动成功'),
        fail: (err) => log('调用振动失败', err),
      });
    }
  }

  /**
   * 被动分享
   */
  static passiveShare() {
    if (WECHAT && typeof (<any>window).wx !== undefined) {// 微信
      // 显示当前页面的转发按钮
      (<any>window).wx.showShareMenu({
        withShareTicket: false,
        menus: ['shareAppMessage', 'shareTimeline'],
        success: (res) => {
          console.log('开启被动转发成功！');
        },
        fail: (res) => {
          console.log(res);
          console.log('开启被动转发失败！');
        }
      });

      // 监听用户点击右上角分享按钮
      (<any>window).wx.onShareAppMessage((res) => {
        console.log('用户点击右上角分享按钮', res);
        return {
          // title: '',
          query: 'shareMsg=' + 'share user2'  // query最大长度(length)为2048
        }
      })
        // 监听用户点击右上角分享按钮
        (<any>window).wx.onShareTimeline((res) => {
          console.log('用户点击右上角分享按钮', res);
          return {
            // title: '', 
            query: 'shareMsg=' + 'share user3'  // query最大长度(length)为2048
          }
        })
    }
  }

  /**
   * 调用主动分享
   */
  static activeShare(shareStr: string = 'share user1') {
    // 主动分享按钮
    if (WECHAT && typeof (<any>window).wx !== undefined) {// 微信
      (<any>window).wx.shareAppMessage({
        // imageUrl: '',
        query: 'shareMsg=' + shareStr  // query最大长度(length)为2048
      });
    }
  }


  /**
   * 获取微信分享数据
   * 当其他玩家从分享卡片上点击进入时，获取query参数
   * @returns 
   */
  static getWXQuery() {
    if (WECHAT && typeof (<any>window).wx !== undefined) {// 微信
      let object = (<any>window).wx.getLaunchOptionsSync();
      let shareMsg = object.query['shareMsg'];
      console.log(shareMsg);
      return shareMsg;
    }
  }
}

