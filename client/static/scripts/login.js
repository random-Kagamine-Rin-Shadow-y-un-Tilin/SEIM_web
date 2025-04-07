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


//REPSONSIVE

const registerFormRes = document.getElementById('regiser_form_responsive');
const registerUserRes = document.getElementById('register_user_responsive');
const registerPasswordRes = document.getElementById('register_password_responsive');
const errorMessageRegisterRes = document.getElementById('error_message_register_responsive');

registerFormRes.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    const userName = registerUserRes.value;
    const password = registerPasswordRes.value;

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
        errorMessageRegisterRes.innerText = data.message;
    }
});

const loginFormRes = document.getElementById('login_form_res');
const loginUserRes = document.getElementById('login_user_res');
const loginPasswordRes= document.getElementById('login_password_res')
const errorMessageLoginRes = document.getElementById('error_message_login_res');

loginFormRes.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const userName = loginUserRes.value;
    const password = loginPasswordRes.value;

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
        errorMessageLoginRes.innerText = data.message;
    }

});
