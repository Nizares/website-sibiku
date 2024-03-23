document.addEventListener('DOMContentLoaded', function () {
    const captureButton = document.getElementById('capture-button');
    const imageElement = document.getElementById('image');
    const croppedImageElement = document.getElementById('croppedImage');

    captureButton.addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Get the bounding box coordinates
        width = 800;
        height = 600;
        const boundingBox = { left: 100, top: height / 4, width: 250, height: 250 };

        // Set the canvas size to the bounding box size
        canvas.width = 800;
        canvas.height = 600;
        canvas.width = boundingBox.width;
        canvas.height = boundingBox.height;



        // Draw only the bounding box region
        context.drawImage(
            imageElement,
            boundingBox.left, boundingBox.top, boundingBox.width, boundingBox.height,
            0, 0, canvas.width, canvas.height
        );

        // Get the cropped image data as a Blob
        canvas.toBlob(function(blob) {
            // Create FormData object and append the blob
            const croppedImageUrl = URL.createObjectURL(blob);
            const formData = new FormData();
            formData.append('file', blob, 'cropped_image.jpg');

            // Send the cropped image data to your API using fetch
            fetch('https://backend-prediction-rel-tik7mr2eha-et.a.run.app/predict', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const resultElement = document.getElementById('result');
                if (data.message === 'success') {
                    resultElement.textContent = `Hasil Prediksi Abjad : ${data.result}`;
                    document.getElementById("resultclassify").classList.remove("hidden");
                    document.getElementById("croppedImage").classList.remove("hidden");
                    document.getElementById("resultclassify").classList.add("flex");
                    croppedImageElement.src = croppedImageUrl;
                } else {
                    resultElement.textContent = 'Prediksi gagal.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }, 'image/jpeg');
    });
});
