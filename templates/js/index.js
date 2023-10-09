$(document).ready(function() {
    var video = document.getElementById("video");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var captureButton = document.getElementById("capture-button");

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.error("Error accessing webcam: " + err);
        });

    captureButton.addEventListener("click", function() {
        // Mengambil gambar dari video dan menggambar ke canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Mengonversi gambar dari canvas ke format blob
        canvas.toBlob(function(blob) {
            // Membuat file dari blob
            var file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

            // Membuat FormData dan mengirim file ke backend
            var formData = new FormData();
            formData.append("file", file);

            fetch('https://sibi-prediction-bjvdoiweyq-et.a.run.app/predict', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const resultElement = document.getElementById('result');
                const resultElement2 = document.getElementById('result2');
                const resultElement3 = document.getElementById('result3');
                if (data.message === 'success') {
                    resultElement.textContent = `Prediksi: ${data.result}`;
                    resultElement2.textContent = `ID: ${data.id}`;
                    resultElement3.textContent = `Skor: ${data.score}`;
                } else {
                    resultElement.textContent = 'Prediksi gagal.';
                }
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });
        }, "image/jpeg");
    });
});

// $.ajax({
            //     url: "https://sibi-prediction-bjvdoiweyq-et.a.run.app/predict", // Ganti dengan URL endpoint yang sesuai
            //     type: "POST",
            //     data: formData,
            //     contentType: false,
            //     processData: false,
            //     success: function(response) {
            //         // Tampilkan hasil deteksi objek di halaman
            //         var result_div = $("#result");
            //         result_div.empty();
            //         response.forEach(function(obj) {
            //             var class_id = obj.class_id;
            //             var confidence = obj.confidence;
            //             result_div.append(`<p>Class ID: ${class_id}, Confidence: ${confidence}</p>`);
            //         });
            //     },
            //     error: function(error) {
            //         alert("Error occurred: " + error.statusText);
            //     }
            // });