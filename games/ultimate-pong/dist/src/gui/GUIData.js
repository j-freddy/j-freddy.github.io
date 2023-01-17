"use strict";
function getGUIData() {
    const NUM_ROWS = 30;
    const u = Math.min(canvas.width, canvas.height) / NUM_ROWS;
    return {
        scaleFactor: u / 16,
        blockUnit: u,
        ball: {
            colour: "#1c7ed6",
            arrowWidth: u * 3,
        },
        paddle: {
            colour: "#212529",
        },
        effectBlock: {
            radius: u,
        },
        score: {
            fontSize: 96,
            fontFamily: "Verdana",
            colour: "#212529",
            strokeColour: "#fab005",
            strokeWidth: 4,
        },
        initialMessage: {
            fontSize: 42,
            fontFamily: "Verdana",
            colour: "#212529",
        },
        afterPointHue: {
            colour: "#ff6b6b",
            freezingColour: "#3bc9db",
        }
    };
}
