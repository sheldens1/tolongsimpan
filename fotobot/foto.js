const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const captureBtn = document.getElementById("capture");
const filterSelect = document.getElementById("filter");
const bgColorPicker = document.getElementById("bgColor");
const downloadLink = document.getElementById("download");

// Aktifkan kamera
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
});

// Ambil foto
captureBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ctx.fillStyle = bgColorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.filter = filterSelect.value;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Tampilkan tombol download
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.style.display = "block";
});

// Ubah filter kamera
filterSelect.addEventListener("change", () => {
    video.style.filter = filterSelect.value;
});

navigator.mediaDevices.enumerateDevices().then(devices => {
    let cameras = devices.filter(device => device.kind === "videoinput");
    console.log(cameras); // Lihat daftar kamera di console

    if (cameras.length > 1) { // Kalau ada lebih dari satu kamera
        let cameraId = cameras[1].deviceId; // Pilih kamera kedua (bisa diganti sesuai kebutuhan)
        navigator.mediaDevices.getUserMedia({ video: { deviceId: cameraId } })
            .then(stream => {
                document.querySelector("video").srcObject = stream;
            })
            .catch(err => console.error("Gagal mengakses kamera:", err));
    }
});