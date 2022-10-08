"use strict";
class EffectBlock {
    constructor(effect, x, y) {
        this.r = GUIData.effectBlock.radius;
        this.effect = effect;
        // Center
        this.pos = new Point(x, y);
    }
    get x() {
        return this.pos.getX();
    }
    get y() {
        return this.pos.getY();
    }
}
