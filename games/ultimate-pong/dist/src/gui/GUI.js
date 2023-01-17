"use strict";
var GUIEvent;
(function (GUIEvent) {
    GUIEvent["AnimateBallBefore"] = "animateBallBefore";
    GUIEvent["AnimateBallAfter"] = "animateBallAfter";
    GUIEvent["AnimateFreezingMode"] = "animateFreezingMode";
})(GUIEvent || (GUIEvent = {}));
class GUI {
    constructor(game) {
        this.keyDown = new Map();
        this.props = {
            ballAlpha: 1,
            ballArrowAlpha: 1,
            scoreAlpha: 1,
            iciclesAlpha: 0,
            iciclesSize: 512,
            afterPointHueAlpha: 0,
        };
        this.game = game;
        this.startObservables();
    }
    static getInstance(game) {
        if (game) {
            GUI.instance = new GUI(game);
        }
        else {
            if (!GUI.instance) {
                throw new Error("Instance does not exist and game is unspecified.");
            }
        }
        return GUI.instance;
    }
    switchContext(game) {
        this.game = game;
    }
    get keyDownMappings() {
        return this.keyDown;
    }
    drawPaddle(paddle) {
        ctx.save();
        ctx.fillStyle = GUIData.paddle.colour;
        ctx.fillRect(paddle.x - paddle.width / 2, paddle.y - paddle.height / 2, paddle.width, paddle.height);
        ctx.restore();
    }
    drawBall(ball) {
        const visible = this.game.getBall().getVisible() ? 1 : 0;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
        ctx.fillStyle = GUIData.ball.colour;
        ctx.globalAlpha = this.props.ballAlpha * visible;
        ctx.fill();
        ctx.restore();
    }
    drawArrow() {
        const ball = this.game.getBall();
        const w = GUIData.ball.arrowWidth;
        ctx.save();
        ctx.translate(ball.x, ball.y);
        ctx.rotate(ball.getDir());
        ctx.globalAlpha = this.props.ballArrowAlpha;
        ctx.drawImage(img.arrowUp, -w / 2, -w / 2, w, w);
        ctx.restore();
    }
    drawInitialMessage() {
        const msgData = GUIData.initialMessage;
        ctx.save();
        ctx.font = `${msgData.fontSize}px ${msgData.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CLICK TO START", canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }
    drawScore(alpha = this.props.scoreAlpha, outline = false) {
        ctx.save();
        const score = `${this.game.getBottomScore()} : ${this.game.getTopScore()}`;
        ctx.font = `${GUIData.score.fontSize}px ${GUIData.score.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = GUIData.score.colour;
        ctx.globalAlpha = alpha;
        ctx.fillText(score, canvas.width / 2, canvas.height / 2);
        if (outline) {
            ctx.lineWidth = GUIData.score.strokeWidth;
            ctx.strokeStyle = GUIData.score.strokeColour;
            ctx.strokeText(score, canvas.width / 2, canvas.height / 2);
        }
        ctx.restore();
    }
    drawFinalScreen() {
        this.drawScore(1, true);
    }
    drawEffectBlocks() {
        for (const effectBlock of this.game.getEffectBlocks()) {
            const image = effectProperties.get(effectBlock.effect).blockImage;
            const d = effectBlock.r * 2;
            ctx.drawImage(image, effectBlock.x - d / 2, effectBlock.y - d / 2, d, d);
        }
    }
    drawBackground() {
        ctx.drawImage(img.background, 0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = this.game.isSlipperyMode() ?
            GUIData.afterPointHue.freezingColour :
            GUIData.afterPointHue.colour;
        ctx.globalAlpha = this.props.afterPointHueAlpha;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        if (this.game.isSlipperyMode()) {
            ctx.save();
            ctx.globalAlpha = this.props.iciclesAlpha;
            ctx.drawImage(img.icicles, canvas.width / 2 - this.props.iciclesSize / 2, canvas.height / 2 - this.props.iciclesSize / 2, this.props.iciclesSize, this.props.iciclesSize);
            ctx.restore();
        }
    }
    drawForeground() {
        const image = this.game.isSlipperyMode() ?
            img.freezingForeground :
            img.foreground;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    refresh() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackground();
        this.drawPaddle(this.game.topPaddle);
        this.drawPaddle(this.game.bottomPaddle);
        if (this.game.getStarted()) {
            this.drawEffectBlocks();
            this.drawBall(this.game.getBall());
            if (this.game.getPointStatus() === PointStatus.Before) {
                this.drawArrow();
                this.drawScore();
            }
        }
        else {
            this.drawInitialMessage();
        }
        this.drawForeground();
    }
    startObservables() {
        console.log("Observables started.");
        // Start new game
        const newGameButton = document.getElementById("new-game");
        newGameButton.addEventListener("click", _ => {
            const mode = document.querySelector("input[name='mode']:checked");
            const singlePlayer = mode.id === "1-player";
            switchContextToNewGame(singlePlayer);
        });
        window.addEventListener("keydown", e => {
            this.keyDown.set(e.key, true);
        });
        window.addEventListener("keyup", e => {
            this.keyDown.set(e.key, false);
        });
        canvas.addEventListener(GUIEvent.AnimateBallBefore, _ => {
            this.props.ballAlpha = 0;
            this.props.ballArrowAlpha = 0;
            this.props.scoreAlpha = 1;
            gsap.timeline()
                .set(this.props, { scoreAlpha: 0, delay: 1.25 })
                .to(this.props, { ballAlpha: 1, duration: 0.25, delay: 0.35 })
                // TODO Refactor
                .set(this.props, { ballArrowAlpha: 1, delay: 0.4 })
                .set(this.props, { ballArrowAlpha: 0, delay: 0.15 })
                .set(this.props, { ballArrowAlpha: 1, delay: 0.15 })
                .set(this.props, { ballArrowAlpha: 0, delay: 0.15 });
        });
        canvas.addEventListener(GUIEvent.AnimateBallAfter, _ => {
            this.props.afterPointHueAlpha = 0;
            gsap.timeline()
                .to(this.props, { afterPointHueAlpha: 0.5, duration: 0.15 })
                .to(this.props, { afterPointHueAlpha: 0, duration: 0.15 });
        });
        canvas.addEventListener(GUIEvent.AnimateFreezingMode, _ => {
            this.props.iciclesAlpha = 0.5;
            this.props.iciclesSize = 128;
            gsap.timeline()
                .to(this.props, { iciclesAlpha: 0, duration: 0.5 })
                .to(this.props, { iciclesSize: 512, duration: 0.5 }, "<");
        });
    }
}
