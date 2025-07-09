const signInBtn = document.getElementById("sign-in") as HTMLButtonElement;
const signUpBtn = document.getElementById("sign-up") as HTMLButtonElement;
const message = document.getElementById("message") as HTMLParagraphElement;

signInBtn?.addEventListener("click", () => {
    const username = (document.getElementById("username") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";  // chuyển về trang home
    } else {
        message.textContent = "Sai tên đăng nhập hoặc mật khẩu!";
        message.style.color = "red";
    }
});

signUpBtn?.addEventListener("click", () => {
    const username = (document.getElementById("username") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!username || !password) {
        message.textContent = "Không được để trống!";
        message.style.color = "orange";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u: any) => u.username === username)) {
        message.textContent = "Tên đăng nhập đã tồn tại!";
        message.style.color = "orange";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    message.textContent = "Đăng ký thành công! Bạn có thể đăng nhập.";
    message.style.color = "green";
});
