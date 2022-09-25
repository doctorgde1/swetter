"use strict"

const constructorBlocks = document.querySelectorAll(".constructor-block");
const constructorGallery = document.querySelector(".constructor__gallery");
// const prewievGallery = document.querySelectorAll(".gallery__preview");
const formSubmit = document.querySelector("form");
const maxChars = document.querySelector(".text__max-chars");
const newPostState = document.querySelector(".new-post__state");

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


constructorBlocks[0].classList.add("active");
for (let i = 1; i < constructorBlocks.length; i++) {
    constructorBlocks[i].classList.add("unactive");
}

document.addEventListener('click', (click) => {
    let previous = click.target.closest(".constructor__previous");
    let next = click.target.closest(".constructor__next");
    if(!previous && !next) return;
    let active = document.querySelector(".active");
    if(previous && active.previousElementSibling.className != "constructor__menu menu")
    {  
        active.classList.remove("active");
        active.classList.add("unactive");
        active.previousElementSibling.classList.remove("unactive");
        active.previousElementSibling.classList.add("active");
    }
    else if(next && active.nextElementSibling != null)
    {
        active.classList.remove("active");
        active.classList.add("unactive");
        active.nextElementSibling.classList.remove("unactive");
        active.nextElementSibling.classList.add("active");
    }
});


document.addEventListener('keyup', (keyup) => {
    let target = keyup.target.closest(".constructor__text textarea");
    if(!target) return;
    if(target.textLength <= 2000)
    {
        maxChars.innerHTML = `${target.textLength} / 2000`;
    }
    else
    {
        maxChars.innerHTML = `${target.textLength} / 2000 <span>text is too long</span>`;
    }
});

document.addEventListener('change', (change) => {
    let galleryInput = change.target.closest(".gallery__input");
    if(!galleryInput) return;
    constructorGallery.style.gridTemplateAreas = templtes.tem1[galleryInput.files.length];
    const galleryPrewiev = document.querySelectorAll(".gallery__preview");
    for (let i = 0; i < galleryPrewiev.length; i++) {
        galleryPrewiev[i].remove();
    }
    
    for (let i = 0; i < galleryInput.files.length; i++) {
        let reader = new FileReader();
        reader.onload = function(img)
        {
            let prewiew = document.createElement("div");
            prewiew.classList.add(`gallery__preview`, `preview-item${i + 1}`);
            prewiew.innerHTML = `<img src="${img.target.result}" alt="" srcset="">`;
            galleryInput.after(prewiew);
        }
        reader.onerror = () => {
            alert("Error");
        }
        if(galleryInput.files[i])
        {
            reader.readAsDataURL(galleryInput.files[i]);
        }
    }
});

formSubmit.addEventListener('submit', (submit) => {
    submit.preventDefault();
    upload();
});


function upload()
{
    let xmlh = new XMLHttpRequest();

    xmlh.onreadystatechange = function()
    {
        newPostState.style.cssText = "opacity : 1;";
        newPostState.style.display = "unset";
        if(this.readyState == 4)
        {
            newPostState.innerHTML = this.responseText;
            newPostState.style.cssText =
            `
            transition : all 5s linear;
            opacity : 0;
            `
            setTimeout(function() {
                newPostState.style.display = "none"
            }, 5000);
        }
        else
        {
            newPostState.innerHTML = `<img src="imgs/svgs/loading.svg" alt="" srcset="">`
        }
    }
    xmlh.open("POST", "../php/upload.php");
    const galleryInput = document.querySelector(".gallery__input").files;
    const textInput = document.querySelector(".constructor__text textarea");
    const temlate = templtes.tem1[galleryInput.length];
    const numOfFiles = galleryInput.length;
    let formData = new FormData();
    for (let i = 0; i < numOfFiles; i++) {
        formData.append("imgs[]", galleryInput[i]);
    }
    formData.append("description", textInput.value);
    formData.append("template", temlate);
    formData.append("upload", "upload");
    xmlh.send(formData);
}