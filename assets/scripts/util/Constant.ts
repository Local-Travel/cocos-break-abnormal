import { _decorator, sys, Vec3 } from "cc";
import { AudioManager } from "../audio/AudioManager";
import { GameManager } from "../GameManager";
import { DragManager } from "../drag/DragManager";
import { DialogManager } from "../dialog/DialogManager";

enum EVENT_TYPE {
  /** 倒三角页面重新设置 */ 
  PAGE_MOVE_RESET = 'PAGE_MOVE_RESET',
  /** 随意移动页面重新设置 */
  PAGE_MOVE_FREE_RESET = 'PAGE_MOVE_FREE_RESET',
}

enum MODEL_SHAPE {
    /** 圆形 */
    CIRCLE = 'circle',
    /** 方形 */
    SQUARE = 'square',
    /** 三角形 */
    TRIANGLE = 'triangle',
    /** 方形边框 */
    BORDER_RECT = 'border-rect',
}

const SKIN_STYLE = {
  Style1: {
    /** 皮肤数量 */
    count: 1,
    /** sprite路径前缀 */
    spriteDir: 'texture/shape/',
    /** 皮肤名前缀 */
    namePrefix: ''
  },
  Style2: {
    /** 皮肤数量 */
    count: 1,
    /** sprite路径前缀 */
    spriteDir: 'texture/shape/',
    /** 皮肤名前缀 */
    namePrefix: 'skin'
  },
}

/** 公共路径前缀 */
const COMMON_PATH_PREFIX = 'texture/common/'

/** 
 * 道具名称
 */
enum PROPS_NAME {
  /** 炸弹球 */
  BOMB = 'bomb',
}

/** 道具类型 */
const PROPS_TYPE = {
  /** 炸弹球 */
  bomb: {
    name: PROPS_NAME.BOMB,
    desc: '炸弹泡泡可以消除方圆内的泡泡',
    value: 1,
  },
}

export class Constant {
  // class
  static gameManager: GameManager;
  static audioManager: AudioManager;
  static dragManager: DragManager;
  static dialogManager: DialogManager;
  
  // game

  // event
  static EVENT_TYPE = EVENT_TYPE; // 事件类型

  // model
  static MODEL_SHAPE = MODEL_SHAPE; // 模型形状

  // skin
  static SKIN_STYLE = SKIN_STYLE; // 皮肤样式
  static COMMON_PATH_PREFIX = COMMON_PATH_PREFIX; // pic公共路径


  // block
  static BLOCK_SIZE = 64; // 大小

  // props
  static PROPS_TYPE = PROPS_TYPE;// 道具类型
  static PROPS_NAME = PROPS_NAME;// 道具名称


}