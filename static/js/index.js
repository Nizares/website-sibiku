$(document).ready(function() {
    var canvas = document.createElement("canvas");
    var boundingBoxCanvas = document.getElementById("bounding-box-overlay");
    var boundingBoxCtx = boundingBoxCanvas.getContext("2d");
    var captureButton = document.getElementById("capture-button");
    const croppedImageElement = document.getElementById('croppedImage');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                var video = document.getElementById("video");
                video.srcObject = stream;
                video.play();
                // Flip video horizontally
                video.style.transform = 'scale(-1, 1)';
                video.onloadedmetadata = function() {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    drawBoundingBox(); // Call function to draw bounding box
                };
            })
            .catch(function(err) {
                console.error("Error accessing webcam: " + err);
            });
    } else {
        // The browser does not support the getUserMedia API
        console.error("Your browser does not support the getUserMedia API.");
    }
    function drawBoundingBox() {
        // Menggambar bounding box pada elemen <canvas>
        boundingBoxCtx.clearRect(0, 0, boundingBoxCanvas.width, boundingBoxCanvas.height);
        boundingBoxCtx.strokeStyle = "green";
        boundingBoxCtx.lineWidth = 3;
        boundingBoxCtx.strokeRect(100, 130, 250, 250);
    }

    captureButton.addEventListener("click", function() {
        // Mendefinisikan koordinat dan ukuran bounding box
        var boundingBox = { x: video.videoWidth - 100 - 200, y: 110, width: 250, height: 250 };

        // Mengambil gambar hanya dari bagian dalam bounding box
        var croppedImage = captureImageFromVideo(video, boundingBox);

        // Menampilkan gambar yang diambil
        croppedImageElement.src = croppedImage;

        // Mengirim gambar yang diambil ke backend
        sendImageToBackend(croppedImage);
    });

    function captureImageFromVideo(video, boundingBox) {
        // Create a <canvas> element with the same size as the bounding box
        var canvas = document.createElement('canvas');
        canvas.width = boundingBox.width;
        canvas.height = boundingBox.height;
    
        // Get the context from the canvas
        var ctx = canvas.getContext('2d');
    
        // Draw the inside of the bounding box into the <canvas>
        ctx.drawImage(video, boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height, 0, 0, boundingBox.width, boundingBox.height);
    
        // Get the image from the <canvas> and return it as a data URL
        return canvas.toDataURL("image/jpeg");
    }
    
    // Fungsi untuk mengirim gambar ke backend
    function sendImageToBackend(imageData) {
        // Membuat blob dari data URL gambar
        fetch(imageData)
            .then(response => response.blob())
            .then(blob => {
                // Membuat file dari blob
                var file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

                // Membuat FormData dan mengirim file ke backend
                var formData = new FormData();
                formData.append("file", file);

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
                    } else {
                        resultElement.textContent = 'Prediksi gagal.';
                    }
                })
                .catch(error => {
                    console.error('Terjadi kesalahan:', error);
                });
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });
    }
});
