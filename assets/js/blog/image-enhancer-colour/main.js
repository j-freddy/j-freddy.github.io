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

const YCBCR_MATRIX = [
    [65.738/256, 129.057/256, 25.064/256],
    [-37.945/256, -74.494/256, 112.439/256],
    [112.439, -94.154/256, -18.285/256]
];

const YCBCR_CONST = math.transpose([16, 128, 128]);

/*
    pixels: Uint8ClampedArray
    return: array

    We return a normal array since YCbCr values are not clamped between 0-255.
*/
function rgb_to_ycbcr(pixels) {
    ycbcr_pixels = [];

    for (let i = 0; i < 4; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // UG0639: Color Space Conversion User Guide

        const ycbcr = math.add(
            YCBCR_CONST,
            math.multiply(YCBCR_MATRIX, math.transpose([r, g, b]))
        );

        ycbcr_pixels.push(ycbcr[0]);
        ycbcr_pixels.push(ycbcr[1]);
        ycbcr_pixels.push(ycbcr[2]);
        // For consistency: alpha channel
        ycbcr_pixels.push(pixels[i + 3]);
    }

    return ycbcr_pixels;
}

/*
    pixels: array
    to_arr: Uint8ClampedArray
    return: Uint8ClampedArray

    We want to return Uint8ClampedArray as we need to render the image. However,
    JavaScript encapsulates the construction of a Uint8ClampedArray object.
    Therefore, we pass in to_arr which is the data of our original image, and
    replace its values.
*/
function ycbcr_to_rgb(pixels, to_arr) {
    for (let i = 0; i < pixels.length; i += 4) {
        const y = pixels[i];
        const cb = pixels[i + 1];
        const cr = pixels[i + 2];

        // UG0639: Color Space Conversion User Guide

        const rgb = math.multiply(
            math.inv(YCBCR_MATRIX),
            math.subtract(math.transpose([y, cb, cr]), YCBCR_CONST)
        );

        to_arr[i] = rgb[0];
        to_arr[i + 1] = rgb[1];
        to_arr[i + 2] = rgb[2];
    }

    return to_arr;
}

// Perform histogram equalisation on image
function equalise(pixels) {
    // Convert to YCbCr
    ycbcr_pixels = rgb_to_ycbcr(pixels);

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
        // Update Y component only
        pixels[i] = intensity;
    }

    // Convert back to RGB
    rgb_pixels = ycbcr_to_rgb(ycbcr_pixels, pixels);

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
    refresh("/assets/img/blog/image-enhancer-colour/grass.jpg");
}

function main() {
    console.log("Hello world!");
    useExampleImage();
}

window.addEventListener("load", main);
