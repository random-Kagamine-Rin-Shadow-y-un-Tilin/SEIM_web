const registerForm = document.getElementById('regiser_form');
const registerUser = document.getElementById('register_user');
const registerPassword = document.getElementById('register_password');
const errorMessageRegister = document.getElementById('error_message_register');

registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    const userName = registerUser.value;
    const password = registerPassword.value;

    const response = await fetch('/register', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({userName, password}),
    });

    const data = await response.json();

    if(response.ok){

        localStorage.setItem("token_SEIM", data.token);
        localStorage.setItem("user_SEIM", JSON.stringify(data.currentUser));
        window.location.href = "/";
       
    } else{
        errorMessageRegister.innerText = data.message;
    }
});

const loginForm = document.getElementById('login_form');
const loginUser = document.getElementById('login_user');
const loginPassword = document.getElementById('login_password')
const errorMessageLogin = document.getElementById('login_error_message');

loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const userName = loginUser.value;
    const password = loginPassword.value;

    console.log(userName, password)

    const response = await fetch('/loginUser', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({userName, password}),
    });

    const data = await response.json();

    if(response.ok){

        localStorage.setItem("token_SEIM", data.token);
        localStorage.setItem("user_SEIM", JSON.stringify(data.currentUser));
        window.location.href = "/";
       
    } else{
        errorMessageLogin.innerText = data.message;
    }

});
