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
        // this.init();
        Constant.dialogManager.showWelcomeBox();
    }

    update(deltaTime: number) {
        
    }

    init() {
        const user = User.instance();
        const userLevel = this.userLevelTest || user.getLevel();
        this._userLevel = userLevel;
        this.gameState = Constant.GAME_STATE.READY;
        const { data, type } = DragData.getDragData(this._userLevel);

        console.log('userLevel', userLevel, this._userLevel);

        if (type === Constant.PageType.PAGE_MOVE_FREE) {
            this.showPageMoveFree(true);
            this.showPageMove(false);
            this.pageMoveFree.init(data.name, data.limitTime);
        } else {
            this.showPageMoveFree(false);
            this.showPageMove(true);
            this.pageMove.init(data.name, data.limitTime);
        }

        Constant.dragManager.init(data);

        this.levelData = data;
        this.gameState = Constant.GAME_STATE.PLAYING;
    }

    showPageMove(isShow: boolean) {
        this.pageMove.node.active = isShow;
    }

    showPageMoveFree(isShow: boolean) {
        this.pageMoveFree.node.active = isShow;
    }

    updateUserLevel() {
        this._userLevel += 1;
        const user = User.instance();
        const newLevel = user.getLevel() + 1;
        user.setLevel(newLevel);
        return newLevel;
    }

    resetInitPos() {
        Constant.dragManager.init(this.levelData);
    }

    gameOver() {
        this.gameState = Constant.GAME_STATE.END;
        // 游戏超时
        Constant.dialogManager.showTimeOutBox();
        // this.init();
    }

    gamePass() {
        this.gameState = Constant.GAME_STATE.END;
        const newLevel = this.updateUserLevel();
        if (newLevel % 5 === 0 || newLevel === 2) {
            // 结束，大礼包
            Constant.dialogManager.showChest();
        }
        this.init();
    }

    useSkill(skillName: string) {
        Constant.dragManager.useSkill(skillName);
    }
}

