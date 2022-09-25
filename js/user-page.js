"use strict"


let submit;
const feed = document.querySelector(".feed");
const formSubmit = document.querySelector("form");
const editPostState = document.querySelector(".edit-post__state");


function getPosts() {
    let xmlh = new XMLHttpRequest();
    xmlh.onreadystatechange = function () {
        if (this.readyState == 4) {
            feed.innerHTML = this.responseText;
            setActive();
        }
        else {
            feed.innerHTML = `<img src="imgs/svgs/loading.svg" alt="" srcset="">`;
        }
    }
    xmlh.open("GET", "../php/user-page.php");
    xmlh.send();
}

getPosts()



const templtes =
{
    tem1:
    {
        1:
            `
        "img1"
        `,
        2:
            `
        "img1 img2"
        `,
        3:
            `
        "img1 img3"
        "img2 img3"
        `,
        4:
            `
        "img1 img3"
        "img2 img3"
        "img2 img4"
        `,
        5:
            `
        "img1 img3 img5"
        "img2 img3 img5"
        "img2 img4 img4"
        `,
        6:
            `
        "img1 img3 img5 img6"
        "img2 img3 img5 img6"
        "img2 img4 img4 img6"
        `,
        7:
            `
        "img1 img3 img5 img5"
        "img2 img3 img6 img7"
        "img2 img4 img4 img7"
        `
    },

}



function setActive() {
    const constructors = document.querySelectorAll(".constructor");
    for (let i = 0; i < constructors.length; i++) {
        const constructorBlocks = constructors[i].querySelectorAll(".constructor-block");
        constructorBlocks[0].classList.add("active");
        for (let j = 1; j < constructorBlocks.length; j++) {
            constructorBlocks[j].classList.add("unactive");
        }
    }
}

document.addEventListener('click', (click) => {
    let previous = click.target.closest(".constructor__previous");
    let next = click.target.closest(".constructor__next");
    if (!previous && !next) return;
    let active = click.target.closest(".constructor").querySelector(".active");
    if (previous && active.previousElementSibling.className != "constructor__menu menu") {
        active.classList.remove("active");
        active.classList.add("unactive");
        active.previousElementSibling.classList.remove("unactive");
        active.previousElementSibling.classList.add("active");
    }
    else if (next && active.nextElementSibling != null) {
        active.classList.remove("active");
        active.classList.add("unactive");
        active.nextElementSibling.classList.remove("unactive");
        active.nextElementSibling.classList.add("active");
    }
});
document.addEventListener('keyup', (keyup) => {
    let target = keyup.target.closest(".constructor__text textarea");
    if (!target) return;
    const maxChars = keyup.target.closest(".constructor").querySelector(".text__max-chars");
    if (target.textLength <= 2000) {
        maxChars.innerHTML = `${target.textLength} / 2000`;
    }
    else {
        maxChars.innerHTML = `${target.textLength} / 2000 <span>text is too long</span>`;
    }
});
document.addEventListener('change', (change) => {
    let galleryInput = change.target.closest(".gallery__input");
    if (!galleryInput) return;
    const constructorGallery = change.target.closest(".constructor").querySelector(".constructor__gallery");
    constructorGallery.style.gridTemplateAreas = templtes.tem1[galleryInput.files.length];
    const galleryPrewiev = change.target.closest(".constructor").querySelectorAll(".gallery__preview");
    for (let i = 0; i < galleryPrewiev.length; i++) {
        galleryPrewiev[i].remove();
    }

    for (let i = 0; i < galleryInput.files.length; i++) {
        let reader = new FileReader();
        reader.onload = function (img) {
            let prewiew = document.createElement("div");
            prewiew.classList.add(`gallery__preview`, `preview-item${i + 1}`);
            prewiew.innerHTML = `<img src="${img.target.result}" alt="" srcset="">`;
            galleryInput.after(prewiew);
        }
        reader.onerror = () => {
            alert("Error");
        }
        if (galleryInput.files[i]) {
            reader.readAsDataURL(galleryInput.files[i]);
        }
    }
});





formSubmit.addEventListener('submit', (submit) => {
    submit.preventDefault();
    upload(submit.target);
});



function clicked(button)
{
    submit = button;
}

function upload(target) {
    let xmlh = new XMLHttpRequest();

    xmlh.onreadystatechange = function () {
        editPostState.style.cssText = "opacity : 1;";
        editPostState.style.display = "unset";
        if (this.readyState == 4) {
            editPostState.innerHTML = this.responseText;
            editPostState.style.cssText =
                `
            transition : all 5s linear;
            opacity : 0;
            `
            setTimeout(function () {
                editPostState.style.display = "none"
            }, 5000);
        }
        else {
            editPostState.innerHTML = `<img src="imgs/svgs/loading.svg" alt="" srcset="">`
        }
    }

    xmlh.open("POST", "../php/upload.php");
    const galleryInput = target.querySelector(".gallery__input").files;
    const textInput = target.querySelector(".constructor__text textarea");
    const temlate = templtes.tem1[galleryInput.length];
    const numOfFiles = galleryInput.length;

    let formData = new FormData();
    for (let i = 0; i < numOfFiles; i++) {
        formData.append("imgs[]", galleryInput[i]);
    }
    
    formData.append("description", textInput.value);
    formData.append("template", temlate);
    formData.append("upload", submit.value);
    formData.append("post_id", submit.closest(".constructor").id);

    xmlh.send(formData);
}
