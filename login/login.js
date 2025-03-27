document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Data username dan password yang diperbolehkan
    const allowedUsers = {
        "lucky": "12345",
        "reni": "67890"
    };

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah form submit bawaan

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (allowedUsers[username] && allowedUsers[username] === password) {
            window.location.href = "lobi.html"; // Redirect jika login berhasil
        } else {
            errorMessage.textContent = "Username atau password salah!";
            errorMessage.style.display = "block";
        }
    });
});