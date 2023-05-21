// Original image preview
let originalImage = document.getElementById("original-image");

// Output image canvas
const canvas = document.getElementById("output-canvas");
const ctx = canvas.getContext("2d");

// Get image data
function getImageData(image, maxWidth=image.width) {
    const aspectRatio = image.width / image.height;

    canvas.width = maxWidth;
    canvas.height = canvas.width / aspectRatio;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Perform histogram equalisation on image
function equalise(pixels) {
    // Pre: image is greyscale but in RGBA format
    // Unfortunately this is the best we can do with JavaScript canvas
    // ¯\_(ツ)_/¯
    
    // Intensity histogram
    const histogram = Array(256).fill(0);

    for (let i = 0; i < pixels.length; i += 4) {
        index = pixels[i];
        histogram[index]++;
    }

    // Normalise histogram and create pixel mapper from cumulative histogram
    const mapper = [];
    let sum = 0;

    for (let i = 0; i < histogram.length; i++) {
        histogram[i] /= (pixels.length / 4);

        sum += histogram[i];
        mapper.push(Math.floor(sum * (histogram.length - 1)));
    }

    // Update pixels
    for (let i = 0; i < pixels.length; i += 4) {
        intensity = mapper[pixels[i]];

        pixels[i] = intensity;
        pixels[i + 1] = intensity;
        pixels[i + 2] = intensity;
    }

    return pixels;
}

// -----------------------------------------------------------------------------

function refresh(imageSrc) {
    // Update image
    originalImage.src = imageSrc;

    // Perform histogram equalisation
    originalImage.onload = () => {
        const imageData = getImageData(originalImage, originalImage.width);
        const newPixels = equalise(imageData.data);

        // Update canvas
        imageData.data = newPixels;
        ctx.putImageData(imageData, 0, 0);
    }
}

function useExampleImage() {
    refresh("/assets/img/blog/image-enhancer/hills.png");
}

function main() {
    console.log("Hello world!");
    useExampleImage();
}

window.addEventListener("load", main);
