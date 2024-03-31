$(document).ready(function() {
    var canvas = document.createElement("canvas");
    var boundingBoxCanvas = document.getElementById("bounding-box-overlay");
    var boundingBoxCtx = boundingBoxCanvas.getContext("2d");
    var captureButton = document.getElementById("capture-button");
    const croppedImageElement = document.getElementById('croppedImage');

    // mengaktifkan webcam/kamera yang akan digunakan
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                // mendapatkan video dari webcam
                // lalu merubah posisi jadi mirroring
                // menampilkan canvas yang berisi bounding box
                var video = document.getElementById("video");
                video.srcObject = stream;
                video.play();
                video.style.transform = 'scale(-1, 1)';
                video.onloadedmetadata = function() {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    drawBoundingBox(); 
                };
            })
            .catch(function(err) {
                console.error("Tidak dapat memuat webcam: " + err);
            });
    } else {
        console.error("Tidak dapat mengakses webcam");
    }

    // Fungsi untuk menggambar bounding box
    function drawBoundingBox() {
        boundingBoxCtx.clearRect(0, 0, boundingBoxCanvas.width, boundingBoxCanvas.height);
        boundingBoxCtx.strokeStyle = "green";
        boundingBoxCtx.lineWidth = 3;
        boundingBoxCtx.strokeRect(100, 130, 250, 250);
    }

    // ketika tombol capture-button diklik
    captureButton.addEventListener("click", function() {
        
        document.getElementById('spinner').classList.remove('hidden');
    
        setTimeout(function() {
            // koordinat bounding box
            var boundingBox = { x: video.videoWidth - 100 - 200, y: 110, width: 250, height: 250 };
    
            // mengambil gambar dari video
            var croppedImage = captureImageFromVideo(video, boundingBox);
    
            // tampikan gambar yang telah di-capture ke dalam elemen img
            croppedImageElement.src = croppedImage;
    
            // mengirim gambar ke backend
            sendImageToBackend(croppedImage);
    
            
            document.getElementById('spinner').classList.add('hidden');
        }, 3000);
    });

    // Fungsi untuk mengambil gambar yang berada pada bounding box dari video
    function captureImageFromVideo(video, boundingBox) {
        
        var canvas = document.createElement('canvas');
        canvas.width = boundingBox.width;
        canvas.height = boundingBox.height;
    
        // mendapatkan nilai konteks 2D dari fungsi canvas
        var ctx = canvas.getContext('2d');
    
        // menggambar nilai konteks 2D dari fungsi video
        ctx.drawImage(video, boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height, 0, 0, boundingBox.width, boundingBox.height);
    
        // dapat link gambar lalu dijadikan format gambar yang akan dikirim ke backend
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

                // Mengirim data ke backend API yang sudah dibuat
                fetch('https://backend-prediction-rel-tik7mr2eha-et.a.run.app/predict', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Menampilkan hasil prediksi atau data yang diperlukan
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
