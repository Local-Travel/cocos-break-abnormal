import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UnfoldClose')
export class UnfoldClose extends Component {
    @property(Sprite)
    sprite: Sprite = null;

    private _progress: number = 0;
    private _speed: number = 1;

    start() {
        // console.log('start', this.sprite.getSharedMaterial(0));
    }

    update(deltaTime: number) {
        // 只卷动一次
        // if(this._progress >= 1) return;
        // if(this._progress <= 0) return;

        this._progress += deltaTime * this._speed * 0.2;
        // console.log(this._progress);
        this.sprite.getSharedMaterial(0).setProperty('progress', this._progress);
        if(this._progress >= 1) {
            this._speed = -1;
        }
        if(this._progress <= 0) {
            this._speed = 1;
        }
    }
}

