(() => {
    login();
    signOut();
    createCate();
    createTag();
    createNews();
<<<<<<< HEAD
    createVideos();
=======
    createPictures();
>>>>>>> 908586a4afb8c01a4cc9a1097a5b3ec396ac9fc8
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


function deleteTag(tid) {
    
    fetch("http://localhost:3000/admin/tag/" + tid, {
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

function createTag() {
    console.log(3);
    let createBtn = document.querySelector("#tagCreateBtn");
    
    if (createBtn) {
        console.log(4);
        createBtn.onclick = () => {
            console.log(2);
            let name = document.querySelector("#inputTagName");
            let actived = document.querySelector("#inputTagActived");
            // let level = document.querySelector("#inputLevel");
            let id = createBtn.getAttribute("tid");
            let url = "http://localhost:3000/admin/tag/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "http://localhost:3000/admin/tag/" + id;
                method = "PUT";
            }
            let data = {
                name: name.value,
                actived: actived.value
                
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
                    window.location.href = "http://localhost:3000/admin/tag";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}


function deleteNews(nid) {
    
    fetch("http://localhost:3000/admin/news/" + nid, {
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

function createNews() {
    let createBtn = document.querySelector("#newsCreateBtn");
    
    if (createBtn) {
        createBtn.onclick = () => {
            let tags = [];
            let priority = [];
            let title = document.querySelector("#newsTitle");
            let author = document.querySelector("#newsAuthor");
            let link = document.querySelector("#newsLink");
            let categoryId = document.querySelector("#newsCategory");
            let tagsSelected = document.querySelectorAll(".otag:checked");
            tagsSelected.forEach((v) => {
                tags.push(v.value);
            });
            let pSelected = document.querySelectorAll(".op:checked");
            pSelected.forEach((v) => {
                priority.push(Number(v.value));
            });
            let actived = document.querySelector("#newsActived");
            let intro = document.querySelector("#newsIntro");
            let content = document.querySelector("#newsContent");
            

            let id = createBtn.getAttribute("nid");
            let url = "http://localhost:3000/admin/news/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "http://localhost:3000/admin/news/" + id;
                method = "PUT";
            }
            let data = {
                title: title.value,
                actived: actived.value,
                author: author.value,
                link: link.value,
                categoryId: categoryId.value,
                tags: tags,
                priority: priority,
                intro: intro.value,
                content: content.value
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
                    window.location.href = "http://localhost:3000/admin/news";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}



function deleteVideos(vid) {
    
    fetch("http://localhost:3000/admin/videos/" + vid, {
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

function createVideos() {
    let createBtn = document.querySelector("#videosCreateBtn");
    
    if (createBtn) {
        createBtn.onclick = () => {
            //let tags = [];
            //let priority = [];
            let title = document.querySelector("#videosTitle");
            let author = document.querySelector("#videosAuthor");
            let link = document.querySelector("#videosLink");
            let picture = document.querySelector("#pictureLink");
            let actived = document.querySelector("#videosActived");
            let intro = document.querySelector("#videosIntro");         
            let id = createBtn.getAttribute("vid");
            let url = "http://localhost:3000/admin/videos/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "http://localhost:3000/admin/videos/" + id;
                method = "PUT";
            }
            let data = {
                title: title.value,
                actived: actived.value,
                author: author.value,
                link: link.value,
                picture: picture.value,
                intro: intro.value
                
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
                    window.location.href = "http://localhost:3000/admin/videos";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}
function deletePictures(pid) {
    
    fetch("http://localhost:3000/admin/pictures/" + pid, {
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

function createPictures() {
    let createBtn = document.querySelector("#picturesCreateBtn");
    
    if (createBtn) {
        createBtn.onclick = () => {
            //let tags = [];
            //let priority = [];
            let title = document.querySelector("#picturesTitle");
            let author = document.querySelector("#picturesAuthor");
            let link = document.querySelector("#picturesLink");
            //let categoryId = document.querySelector("#newsCategory");
            //let tagsSelected = document.querySelectorAll(".otag:checked");
            // tagsSelected.forEach((v) => {
            //     tags.push(v.value);
            // });
            // let pSelected = document.querySelectorAll(".op:checked");
            // pSelected.forEach((v) => {
            //     priority.push(Number(v.value));
            // });
            let actived = document.querySelector("#picturesActived");
            let intro = document.querySelector("#picturesIntro");
            //let content = document.querySelector("#newsContent");
            

            let id = createBtn.getAttribute("pid");
            let url = "http://localhost:3000/admin/pictures/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "http://localhost:3000/admin/pictures/" + id;
                method = "PUT";
            }
            let data = {
                title: title.value,
                actived: actived.value,
                author: author.value,
                link: link.value,
                //categoryId: categoryId.value,
                //tags: tags,
                //priority: priority,
                intro: intro.value
                //content: content.value
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
                    window.location.href = "http://localhost:3000/admin/pictures";
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