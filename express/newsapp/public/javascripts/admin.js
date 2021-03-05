(() => {
    login();
    signOut();
    createCate();
})();

function deleteCate(cid) {
    
    fetch("http://localhost:3000/admin/category/" + cid, {
        method: 'DELETE',
    })
    .then((res) => {return res.json();})
    .then((result) => {
        alert(result.message);
        if(result.code == 200) {
            
            window.location.reload();
        }
    });

}

function createCate() {
    let createBtn = document.querySelector("#cateCreateBtn");
    
    if (createBtn) {
        createBtn.onclick = () => {
            let name = document.querySelector("#inputCategoryName");
            let actived = document.querySelector("#inputCategoryActived");
            let level = document.querySelector("#inputLevel");
            let id = createBtn.getAttribute("cid");
            let url = "http://localhost:3000/admin/category/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "http://localhost:3000/admin/category/" + id;
                method = "PUT";
            }
            let data = {
                name: name.value,
                actived: actived.value,
                level: level.value
            }
            fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then((res) => {return res.json();})
            .then((result) => {
                if(result.code == 200) {
                    alert(result.message);
                    window.location.href = "http://localhost:3000/admin/category";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}

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