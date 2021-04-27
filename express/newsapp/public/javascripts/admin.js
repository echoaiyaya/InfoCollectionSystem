(() => {
    login();
    signOut();
    createCate();
    createTag();
    createNews();
    createSpider();
    createPictures();
    createVideos();
    postFeedBack();
})();

function toSearch() {
    let search = document.querySelector("#searchId");
    let content = search.value;
    console.log(content);
    if (content == "" || content == 'undefined') {
        alert('searching empty');
    } else {
        window.location.href = "/search/" + content;
    }
    
}

function closethis() {
    let model = document.querySelector("#feedback-modal");
    model.style.display = 'none';
}

function readFeedback(id, comment) {
    let model = document.querySelector("#feedback-modal");
    let body = document.querySelector(".modal-body");
    let changeText = document.querySelector('[fid="'+id+'"]');
    if (changeText.innerHTML != 'read') {
        changeText.innerHTML = 'read';
        changeText.classList.remove("text-danger");
        fetch("/admin/feedback/read/" + id)
        .then((res) => {return res.json();})
        .then((result) => {
        });
    } 
    model.style.display = 'block';
    body.innerHTML = comment;
    
}

function postFeedBack() {
    console.log(1)
    let fbBtn = document.querySelector("#fbSubmit");
    console.log(fbBtn);
    if (fbBtn) {
        fbBtn.onclick = () => {
            let fn = document.querySelector("#first-name");
            let ln = document.querySelector("#last-name");
            let email = document.querySelector("#email");
            let comment = document.querySelector("#comment");
            let data = {
                firstName: fn.value,
                lastName: ln.value,
                email: email.value,
                comment: comment.value
            };
            fetch("/feedback", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then((res) => {return res.json();})
            .then((result) => {
                if(result.code == 200) {
                    alert(result.message);
                    window.location.href = "/aboutus";
                } else {
                    alert(result.message);
                }
            });
        }
    }
    
}

function deleteSpider(sid) {
    
    fetch("/admin/spider/" + sid, {
        method: 'DELETE',
    })
    .then((res) => {return res.json();})
    .then((result) => {
        if(result.code == 200) {
            
            window.location.reload();
        }
    });

}

function runSpider(sid) {
    
    fetch("/admin/spider/run/" + sid, {
        method: 'GET',
    })
    .then((res) => {return res.json();})
    .then((result) => {
        if(result.code == 200) {
            
            window.location.reload();
        }
    });

}

function createSpider() {
    let createBtn = document.querySelector("#spiderCreateBtn");
    
    if (createBtn) {
        createBtn.onclick = () => {
            let name = document.querySelector("#spidersName");
            let targetName = document.querySelector("#spidersTargetName");
            let frequency = document.querySelector("#spidersFrequency");
            let actived = document.querySelector("#spidersActived");
            let spidersTime = document.querySelector("#spidersTime");
            let category = document.querySelector("#spidersCategory");
            let limit = document.querySelector("#spidersLimit");
            let start_url = document.querySelector("#spidersUrl");
            let linkS = document.querySelector("#spidersLS");
            let titleS = document.querySelector("#spidersTS");
            let publicTimeS = document.querySelector("#spidersPTS");
            let pictureS = document.querySelector("#spidersPS");
            let authorS = document.querySelector("#spidersAS");
            let contentS = document.querySelector("#spidersCS");
            let type = document.querySelector("#spidersType");
            let id = createBtn.getAttribute("sid");
            let url = "/admin/spider/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "/admin/spider/" + id;
                method = "PUT";
            }
            let data = {
                name: name.value,
                start_url: start_url.value,
                actived: actived.value,
                targetName: targetName.value,
                frequency: frequency.value,
                startTime: spidersTime.value,
                categoryId: category.value,
                limit: limit.value,
                linksSelector: linkS.value,
                titleSelector: titleS.value,
                publicTimeSelector: publicTimeS.value,
                pictureSelector: pictureS.value,
                authorSelector: authorS.value,
                contentSelector: contentS.value,
                type: type.value
            }
            //console.log(data);
            // return;
            fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then((res) => {return res.json();})
            .then((result) => {
                if(result.code == 200) {
                    alert(result.message);
                    window.location.href = "/admin/spider/data";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}

function deleteCate(cid) {
    
    fetch("/admin/category/" + cid, {
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
            let url = "/admin/category/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "/admin/category/" + id;
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
                    window.location.href = "/admin/category/data";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}


function deleteTag(tid) {
    
    fetch("/admin/tag/" + tid, {
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
            let url = "/admin/tag/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "/admin/tag/" + id;
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
                    window.location.href = "/admin/tag/data";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}


function deleteNews(nid) {
    
    fetch("/admin/news/" + nid, {
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
            let url = "/admin/news/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "/admin/news/" + id;
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
                    window.location.href = "/admin/news/data";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}



function deleteVideos(vid) {
    
    fetch("/admin/videos/" + vid, {
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
    console.log(1)
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
            let url = "/admin/videos/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "/admin/videos/" + id;
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
                    window.location.href = "/admin/videos/data";
                } else {
                    alert(result.message);
                }
            });
        };
    }
    
}
function deletePictures(pid) {
    
    fetch("/admin/pictures/" + pid, {
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
            let actived = document.querySelector("#picturesActived");
            let intro = document.querySelector("#picturesIntro");
            let pic = document.querySelector("#pictiuresPic")
            //let content = document.querySelector("#newsContent");
            

            let id = createBtn.getAttribute("pid");
            let url = "/admin/pictures/create";
            let method = "POST";
            if (id) {
                console.log(1);
                url = "/admin/pictures/" + id;
                method = "PUT";
            }
            let data = {
                title: title.value,
                actived: actived.value,
                author: author.value,
                link: link.value,
                picutre: pic.value,
                //categoryId: categoryId.value,
                //tags: tags,
                //priority: priority,
                intro: intro.value,
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
                    window.location.href = "/admin/pictures/data";
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
            fetch("/admin/signout")
            .then((res) => {return res.json();})
            .then((result) => {
                if(result.code == 200) {
                    window.location.href = "/admin/login";
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
            fetch("/admin/login", {
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
                    window.location.href = "/admin";
                } else {
                    alert(result.message);
                }
            })
        }
    }
    
}