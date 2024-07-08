document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('inn');
    const password = document.getElementById('innnn');

    function validate() {
        let isValid = true;

        if (username.value.length < 3) {
            alert('Iltimos, 3 tadan koproq harf kiriting');
            username.style.outlineColor = 'red';
            username.focus();
            isValid = false;
        } else {
            username.style.outlineColor = '';
        }

        if (password.value.length < 3) {
            alert('Iltimos, 3 tadan koproq harf kiriting');
            password.style.outlineColor = 'red';
            password.focus();
            isValid = false;
        } 
        return isValid;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const user = {
            username: username.value,
            password: password.value,
        };

        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Failed! Username is already in use!') {
                alert(data.message);
            }
            if (data.message === 'User registered successfully!') {
               
            } else {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data));
                window.location.assign("http://127.0.0.1:5500/pages/index.html");
            }
        })
        .catch(err => {
            console.error('Xato:', err);
            
        })
        .finally(() => {
            form.reset();
        });
    });
});
