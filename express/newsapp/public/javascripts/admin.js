(() => {
    login();
    signOut();
})();

function signOut() {
    let logoutBtn = document.querySelector("#signOut");
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            fetch("http://localhost:3000/admin/signout")
            .then((res) => {return res.json();})
            .then((result) => {
                if(result.code == 200) {
                    window.location.href = "http://localhost:3000/admin/login";
                }
            });
        }
    }
    
}

function login() {
    let account = document.querySelector("#inputAccount");
    let password = document.querySelector("#inputPassword");
    let submitBtn = document.querySelector("#loginBtn");
    if (submitBtn) {
        submitBtn.onclick = () => {
            let data = {account: account.value, password: password.value};
            fetch("http://localhost:3000/admin/login", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                console.log(result);
                if(result.code == 200) {
                    console.log(result.code);
                    alert(result.message);
                    window.location.href = "http://localhost:3000/admin";
                } else {
                    alert(result.message);
                }
            })
        }
    }
    
}