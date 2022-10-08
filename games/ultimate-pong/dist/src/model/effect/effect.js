"use strict";
var Effect;
(function (Effect) {
    Effect["BigPaddle"] = "BigPaddle";
    Effect["SmallPaddle"] = "SmallPaddle";
    Effect["BigBall"] = "Bigball";
    Effect["BlinkingBall"] = "BlinkingBall";
    Effect["SlipperyPaddle"] = "SlipperyPaddle";
})(Effect || (Effect = {}));
const effectProperties = new Map([
    [
        Effect.BigPaddle,
        {
            eventName: EffectEvent.BigPaddle,
            blockImage: img.effectBigPaddle,
        }
    ],
    [
        Effect.SmallPaddle,
        {
            eventName: EffectEvent.SmallPaddle,
            blockImage: img.effectSmallPaddle,
        }
    ],
    [
        Effect.BigBall,
        {
            eventName: EffectEvent.BigBall,
            blockImage: img.effectBigBall,
        }
    ],
    [
        Effect.BlinkingBall,
        {
            eventName: EffectEvent.BlinkingBall,
            blockImage: img.effectBlinkingBall,
        }
    ],
    [
        Effect.SlipperyPaddle,
        {
            eventName: EffectEvent.SlipperyPaddle,
            blockImage: img.effectSlipperyPaddle,
        }
    ],
]);
