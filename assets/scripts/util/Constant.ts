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
    /** 六边形 */
    HEXAGON = 'hexagon',
    /** 倒六边形 */
    HEXAGON_REVERSE = 'hexagon-reverse',
    /** 方形边框 */
    BORDER_RECT = 'border-rect',
}

// 绘制类型
enum DRAW_LINE_TYOPE {
  /** 虚线 */
  DOTLINE = 'dotline',
  /** 实心 */
  FULL = 'full',
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

enum PageType {
  /** 随意移动页面 */
  PAGE_MOVE_FREE = 'page-move-free',
  /** 固定移动页面 */
  PAGE_MOVE = 'page-move',
}

// /** 
//  * 道具名称
//  */
// enum PROPS_NAME {
//   /** 炸弹球 */
//   BOMB = 'bomb',
// }

/** 道具 */
const GAME_PROPS_TOOL = {
  /** 炸弹球 */
  bomb: {
    iconName: 'bomb',
    name: '炸弹',
    desc: '炸弹可以炸毁页面内的所有物体',
    value: 1,
  },
  /** 叠加 */
  cover: {
    iconName: 'cover',
    name: '叠加',
    desc: '叠加可以重复覆盖方块内已有的物体',
    value: 10,
  },
  /** 触摸 */
  touch: {
    iconName: 'touch',
    name: '触摸',
    desc: '触摸可以显示方块内隐藏的物体',
    value: 1,
  },
  /** 锤子 */
  hammer: {
    iconName: 'hammer',
    name: '锤子',
    desc: '锤子可以破坏方块表面物体',
    value: 1,
  },
  /** 打开门 */
  exitDoor: {
    iconName: 'exitDoor',
    name: '开门',
    desc: '开门可以离开',
    value: 100,
  },
  /** 钥匙 */
  key: {
    iconName: 'key',
    name: '钥匙',
    desc: '钥匙可以打开页面内的锁',
    value: 10,
  },
  /** 弓箭 */
  shot: {
    iconName: 'shot',
    name: '弓箭',
    desc: '弓箭可以射击顶部的物体',
    value: 1,
  },
  /** 绕行 */
  slalom: {
    iconName: 'slalom',
    name: '绕行',
    desc: '绕行技能可以巧妙通过障碍物',
    value: 1,
  },
}

/** 游戏状态 */
enum GAME_STATE {
  /** 游戏准备中 */
  READY = 'ready',
  /** 游戏进行中 */
  PLAYING = 'playing',
  /** 游戏结束 */
  END = 'end',
}

export class Constant {
  // class
  static gameManager: GameManager;
  static audioManager: AudioManager;
  static dragManager: DragManager;
  static dialogManager: DialogManager;
  
  // game
  static GAME_STATE = GAME_STATE; // 游戏状态
  
  // event
  static EVENT_TYPE = EVENT_TYPE; // 事件类型

  // model
  static MODEL_SHAPE = MODEL_SHAPE; // 模型形状

  // skin
  static SKIN_STYLE = SKIN_STYLE; // 皮肤样式
  static COMMON_PATH_PREFIX = COMMON_PATH_PREFIX; // pic公共路径

  // block
  static BLOCK_SIZE = 64; // 大小
  static GRID_START_POINT = new Vec3(-8, 0, 8 * 1.5); // 网格起始点
  static GRID_START_POINT_Y = 8; // 网格起始点Y，x需要根据列数动态计算

  // props
  static GAME_PROPS_TOOL = GAME_PROPS_TOOL;// 道具

  // drag
  static RANGE_DISTANCE = 5;// 拖拽位置的误差范围
  static DRAW_LINE_TYOPE = DRAW_LINE_TYOPE;// 绘制类型
  static UNDRAGABLED_CODE = -5; // 不能拖动的code

  // page
  static PageType = PageType; // 页面类型
}