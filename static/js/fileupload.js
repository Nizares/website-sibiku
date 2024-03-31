
var captureImage = document.getElementById("capture-image");

// fungsi ketika tombol capture-image
captureImage.addEventListener("click", function() {
    
    // mengambil elemen dari input file
    var inputElement = document.getElementById("input-file");
    // jika elemen input file tidak ditemukan
    if (!inputElement) {
        console.error("Elemen input-file tidak ditemukan.");
        return;
    }

    // jika tidak ada file yang dipilih
    var selectedFile = inputElement.files[0];
    if (!selectedFile) {
        console.error("Tidak ada file yang dipilih.");
        return;
    }

    // file jadi FormData yang akan di proses oleh backend
    var formData = new FormData();
    formData.append("file", selectedFile);


    // mengirim file ke backend API yang sudah dibuat
    fetch('https://backend-prediction-rel-tik7mr2eha-et.a.run.app/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // menampilkan hasil prediksi atau data yang diperlukan
        var resultElement = document.getElementById('result');
        var imageUpload = document.getElementById('image-upload');

        if (data.message === 'success') {
            resultElement.textContent = `Hasil Prediksi Abjad : ${data.result}`;
            imageUpload.classList.remove("hidden");
            document.getElementById("resultclassify").classList.remove("hidden");
            document.getElementById("resultclassify").classList.add("flex");
            if (data.image_url) {
                imageUpload.src = data.image_url;
            }
        } else {
            resultElement.textContent = 'Prediksi gagal.';
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
});

// jika ada perubahan pada input file
document.getElementById("input-file").addEventListener("change", function() {
    var imageUpload = document.getElementById('image-upload');
    var reader = new FileReader();

    reader.onload = function(e) {
        imageUpload.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
});