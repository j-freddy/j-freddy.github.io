"use strict";
class Game {
    constructor(eventHandler, singlePlayer = false) {
        this.pointsToWin = 5;
        this.eventHandler = eventHandler;
        this.startEventListeners();
        this.singlePlayer = singlePlayer;
        this.effectDuration = 5000;
        this.topPaddle = new Paddle(canvas.width / 2, 32);
        this.bottomPaddle = new Paddle(canvas.width / 2, canvas.height - 32);
        this.effectsResidue = new Map();
        this.topScore = 0;
        this.bottomScore = 0;
        if (this.singlePlayer) {
            this.ai = new AIShortSighted(this, this.topPaddle);
            // this.ai = new AIPacifist();
        }
        this.init();
        this.started = false;
        this.slipperyMode = false;
    }
    getBall() {
        return this.ball;
    }
    getEffectBlocks() {
        return this.effectBlocks;
    }
    getPointStatus() {
        return this.pointStatus;
    }
    getTopScore() {
        return this.topScore;
    }
    getBottomScore() {
        return this.bottomScore;
    }
    getTotalScore() {
        return this.topScore + this.bottomScore;
    }
    getStarted() {
        return this.started;
    }
    setStarted() {
        this.started = true;
    }
    isSlipperyMode() {
        return this.slipperyMode;
    }
    init() {
        const ballTo = (this.getTotalScore() % 2 === 0) ?
            Player.Bottom : Player.Top;
        this.ball = new Ball(canvas.width / 2, canvas.height / 2, ballTo);
        this.effectBlocks = [];
        this.rallyCount = 0;
        this.pointStatus = PointStatus.Before;
    }
    prepareNewPoint() {
        this.init();
        this.eventHandler.dispatchEvent(new Event(GameEvent.BallBefore));
    }
    addNewEffectBlock() {
        // TODO Indexing enums
        const effects = [
            Effect.BigPaddle,
            Effect.SmallPaddle,
            Effect.BigBall,
            Effect.BlinkingBall,
            Effect.SlipperyPaddle,
        ];
        const effect = effects[randomInt(0, effects.length - 1)];
        const padding = 32 * GUIData.scaleFactor;
        const block = new EffectBlock(effect, randomNumber(padding, canvas.width - padding), canvas.height / 2);
        this.effectBlocks.push(block);
    }
    // Returns true if game ended
    update(moveTopPaddle, moveBottomPaddle) {
        // Top paddle is either a user or an AI
        if (this.singlePlayer) {
            this.topPaddle.update(this.ai.choosePaddleMovement());
        }
        else {
            this.topPaddle.update(moveTopPaddle);
        }
        // Bottom paddle is always a user
        this.bottomPaddle.update(moveBottomPaddle);
        switch (this.pointStatus) {
            case PointStatus.Playing:
                // Update ball
                const pointWinner = this.ball.update(this.topPaddle, this.bottomPaddle, this.eventHandler);
                // Check point ends
                if (pointWinner) {
                    if (pointWinner === Player.Top) {
                        this.topScore++;
                        if (this.topScore >= this.pointsToWin)
                            return true;
                    }
                    else {
                        this.bottomScore++;
                        if (this.bottomScore >= this.pointsToWin)
                            return true;
                    }
                    this.pointStatus = PointStatus.After;
                    this.eventHandler.dispatchEvent(new Event(GameEvent.BallAfter));
                    break;
                }
                // Check ball collide with effect blocks
                for (let i = this.effectBlocks.length - 1; i >= 0; i--) {
                    if (Collision.circleCircle(this.ball, this.effectBlocks[i])) {
                        const eventName = effectProperties
                            .get(this.effectBlocks[i].effect).eventName;
                        this.effectBlocks.splice(i, 1);
                        this.eventHandler.dispatchEvent(new Event(eventName));
                    }
                }
                break;
            default:
                break;
        }
        return false;
    }
    startEventListeners() {
        const handler = this.eventHandler;
        handler.addEventListener(GameEvent.BallBefore, _ => {
            handler.dispatchEvent(new Event(GUIEvent.AnimateBallBefore));
            // TODO Dependency on GUI animation
            setTimeout(() => this.pointStatus = PointStatus.Playing, 2800);
        });
        handler.addEventListener(GameEvent.BallAfter, _ => {
            handler.dispatchEvent(new Event(GUIEvent.AnimateBallAfter));
            this.prepareNewPoint();
        });
        handler.addEventListener(GameEvent.BallPaddleCollision, _ => {
            this.rallyCount++;
            // Bit of a janky way to add effect blocks
            // Every 3rd hit from the 4th shot
            if (this.rallyCount % 3 === 1 && this.rallyCount >= 4) {
                this.addNewEffectBlock();
            }
        });
        handler.addEventListener(EffectEvent.BigPaddle, _ => {
            this.topPaddle.setBigWidth();
            this.bottomPaddle.setBigWidth();
            this.clearResidue(EffectEvent.BigPaddle);
            this.clearResidue(EffectEvent.SmallPaddle);
            const threadId = setTimeout(() => {
                this.topPaddle.setNormalWidth();
                this.bottomPaddle.setNormalWidth();
            }, this.effectDuration);
            this.effectsResidue.set(EffectEvent.BigPaddle, threadId);
        });
        handler.addEventListener(EffectEvent.SmallPaddle, _ => {
            this.topPaddle.setSmallWidth();
            this.bottomPaddle.setSmallWidth();
            this.clearResidue(EffectEvent.BigPaddle);
            this.clearResidue(EffectEvent.SmallPaddle);
            const threadId = setTimeout(() => {
                this.topPaddle.setNormalWidth();
                this.bottomPaddle.setNormalWidth();
            }, this.effectDuration);
            this.effectsResidue.set(EffectEvent.SmallPaddle, threadId);
        });
        handler.addEventListener(EffectEvent.BigBall, _ => {
            this.ball.setBigRadius();
            this.clearResidue(EffectEvent.BigBall);
            const threadId = setTimeout(() => {
                this.ball.setNormalRadius();
            }, this.effectDuration);
            this.effectsResidue.set(EffectEvent.BigBall, threadId);
        });
        handler.addEventListener(EffectEvent.BlinkingBall, _ => {
            this.clearResidue(EffectEvent.BlinkingBall);
            // Blink immediately
            this.ball.blink();
            // Blink consequently
            const threadId = setInterval(() => {
                this.ball.blink();
            }, this.ball.blinkDuration);
            setTimeout(() => {
                clearInterval(threadId);
            }, this.effectDuration);
            this.effectsResidue.set(EffectEvent.BlinkingBall, threadId);
        });
        handler.addEventListener(EffectEvent.SlipperyPaddle, _ => {
            handler.dispatchEvent(new Event(GUIEvent.AnimateFreezingMode));
            this.topPaddle.setSlippery();
            this.bottomPaddle.setSlippery();
            this.slipperyMode = true;
            this.clearResidue(EffectEvent.BigBall);
            const threadId = setTimeout(() => {
                this.topPaddle.setNormalMu();
                this.bottomPaddle.setNormalMu();
                this.slipperyMode = false;
            }, this.effectDuration);
            this.effectsResidue.set(EffectEvent.BigBall, threadId);
        });
    }
    clearResidue(effectEvent) {
        if (this.effectsResidue.has(effectEvent)) {
            clearInterval(this.effectsResidue.get(effectEvent));
        }
    }
}
