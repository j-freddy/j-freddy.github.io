const imageInput = document.getElementById("image-input");
const form = document.querySelector("form");

function readImage(e) {
    e.preventDefault();

    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        // Onload event refreshes canvas with new image
        reader.onload = () => refresh(reader.result);

        // Read file
        reader.readAsDataURL(file);
    }
}

imageInput.addEventListener("change", e => readImage(e));
