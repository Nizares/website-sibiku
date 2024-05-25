
var captureImage = document.getElementById("capture-image");
// fungsi ketika tombol capture-image
captureImage.addEventListener("click", function() {
    var alertNoFile = document.getElementById("alert-no-file");
    // mengambil elemen dari input file
    var inputElement = document.getElementById("input-file");
    var alertFalseFormat = document.getElementById("alert-false-format");
    // jika elemen input file tidak ditemukan
    if (!inputElement) {
        console.error("Elemen input-file tidak ditemukan.");
        return;
    }

    // jika tidak ada file yang dipilih
    var selectedFile = inputElement.files[0];
    if (!selectedFile) {
        // peringatan jika tidak ada file yang dipilih
        alertNoFile.classList.remove("hidden");
        alertFalseFormat.classList.add("hidden");
        console.error("Tidak ada file yang dipilih.");
        return;
    }
    
    if (selectedFile.size >= 2.5 * 1024 * 1024) {
        // peringatan jika ukuran file terlalu besar
        alertNoFile.classList.add("hidden");
        alertFalseFormat.classList.remove("hidden");
        console.error("Ukuran file terlalu besar.");
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

        if (data.message === 'success') {
            resultElement.textContent = `Hasil Prediksi Abjad : ${data.result}`;
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
    var alertNoFile = document.getElementById("alert-no-file");
    var alertFalseFormat = document.getElementById("alert-false-format");
    if (this.files && this.files[0]) {
        var fileType = this.files[0].type;
        if (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg" || fileType === "image/webp") {
            imageUpload.classList.remove("hidden");

            var reader = new FileReader();

            reader.onload = function(e) {
                imageUpload.src = e.target.result;
                alertNoFile.classList.add("hidden");
                alertFalseFormat.classList.add("hidden");
            };
            reader.readAsDataURL(this.files[0]);
        } else {
            // tampilkan peringatan jika format file tidak sesuai
            alertFalseFormat.classList.remove("hidden");
            alertNoFile.classList.add("hidden");
        }
    }
});