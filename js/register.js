let form = document.getElementById('form');
let username = document.getElementById('inn');
let email = document.getElementById('innn')
let password = document.getElementById('innnn');
let button = document.getElementById('but');

function validate() {
    if (username.value.length < 3) {
        alert('Iltimos, 3 tadan koproq harf kiriting');
        username.style.outlineColor = 'red';
        username.focus();
        return false;
    }
    
    if (password.value.length < 3) {
        alert('Iltimos, 3 tadan koproq harf kiriting');
        password.style.outlineColor = 'red';
        password.focus();
        return false;
    }
    return true;
}

form && form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
        return;
    }

    const user = {
        username: username.value,
        email: email.value,
        password: password.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === 'Failed! Username is already in use!') {
            alert(data.message);
        } else if (data.message === 'Failed! Email is already in use!') {
            alert(data.message);
        } else if (data.message === 'User registered successfully!') {
            window.location.assign('http://127.0.0.1:5500/pages/login.html');
        }
    })
    .catch(err => {
        console.log(err);
    })
    .finally(function() {
        form.reset();
    });
});
