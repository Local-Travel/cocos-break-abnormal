import { _decorator, CCInteger, Component, Node } from 'cc';
import { Constant } from './util/Constant';
import { User } from './data/User';
import { PageMove } from './page/PageMove';
import { PageMoveFree } from './page/PageMoveFree';
import { DragData } from './data/DragData';
import { DragManager } from './drag/DragManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(PageMove)
    pageMove: PageMove = null;
    @property(PageMoveFree)
    pageMoveFree: PageMoveFree = null;

    @property({ type: CCInteger })
    userLevelTest: number = 0;

    public levelData: any = null;
    public gameState: string = Constant.GAME_STATE.READY;

    private _userLevel: number = 1;

    protected __preload(): void {
        Constant.gameManager = this;
    }
    
    start() {
        this.init();
    }

    update(deltaTime: number) {
        
    }

    init() {
        const user = User.instance();
        const userLevel = this.userLevelTest || user.getLevel();
        // const { col, list, data } = BlockData.getLevelData(userLevel);
        // this.levelData = data;
        console.log('userLevel', userLevel)
        this._userLevel = userLevel;

        this.gameState = Constant.GAME_STATE.READY;

        const { data, type } = DragData.getDragData(userLevel);

        if (type === Constant.PageType.PAGE_MOVE_FREE) {
            this.pageMoveFree.init(data.name, data.limitTime);
        } else {
            this.pageMove.init(data.name, data.limitTime);
        }

        Constant.dragManager.init(data);

        this.gameState = Constant.GAME_STATE.PLAYING;
    }

    updateUserLevel() {
        const user = User.instance();
        const newLevel = user.getLevel() + 1;
        user.setLevel(newLevel);
        return newLevel;
    }

    gameOver() {
        this.gameState = Constant.GAME_STATE.END;
        // 失败，重新开始
        this.init();
    }

    gamePass() {
        this.gameState = Constant.GAME_STATE.END;
        const newLevel = this.updateUserLevel();
        if (newLevel % 5 || newLevel === 2) {
            // 结束，大礼包
            Constant.dialogManager.showChest();
        }
        this.init();
    }

    useSkill(skillName: string) {
        Constant.dragManager.useSkill(skillName);
    }
}

