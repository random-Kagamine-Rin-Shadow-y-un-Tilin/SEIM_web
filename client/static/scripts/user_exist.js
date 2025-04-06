const ifNotUser = document.getElementById('if_not_user');

document.addEventListener("DOMContentLoaded", () => {
    const userToken = localStorage.getItem("token_SEIM");
    const currentUser = localStorage.getItem("user_SEIM");
    const storedUser = localStorage.getItem("user_SEIM");
    const loginButton = document.getElementById('button')

    if (userToken && currentUser) {
        const currentUser = JSON.parse(storedUser); 
        document.getElementById("button").textContent = `${currentUser.user_name}`;
        document.getElementById('button').classList.add('user-view');
        document.getElementById('button_burguer').textContent = `${currentUser.user_name}`
        document.getElementById('button_burguer').classList.add('user-view');
        document.getElementById('button_burguer').href = '/user';
        loginButton.href = "/user"; 
    } else {
        ifNotUser.style.display = 'block'
        loginButton.textContent = "Inicia sesion";
        loginButton.href = "./login";
        form.style.display = 'none';
    }
});