"use strict"
let zoom, drag, close;
let translateX = 0;
let translateY = 0;
let isDrag = false;


const feed = document.querySelector(".feed");



function getPosts()
{
    let xmlh = new XMLHttpRequest();
    xmlh.onreadystatechange = function()
    {
        if (this.readyState == 4) {
            feed.innerHTML = this.responseText;
        }
        else
        {
            feed.innerHTML = `<img src="imgs/svgs/loading.svg" alt="" srcset="">`;
        }
    }
    xmlh.open("GET", "../php/feed.php");
    xmlh.send();
}

getPosts()

// function updateComments()
// {
//     let xmlh = new XMLHttpRequest();
//     xmlh.onload = function()
//     {
//         console.log(this.responseText);
//     }
//     xmlh.open("GET", "feed.php");
//     xmlh.send();
// }




document.addEventListener('click', (click) => {
    let menuGallery = click.target.closest(".menu__gallery");
    let menuText = click.target.closest(".menu__text");
    let menuComments = click.target.closest(".menu__comments");
    if (!menuGallery && !menuText && !menuComments) return;
    if (menuGallery) {
        let gallery = menuGallery.parentElement.parentElement.querySelector(".post__gallery");
        let text = menuGallery.parentElement.parentElement.querySelector(".post__text");
        setTranslate(text, `translateX(0%)`, "right");
        setTranslate(gallery, `translateY(0%)`, "bottom")
        gallery.style.pointerEvents = "";
        translateX = text.getBoundingClientRect().width * (-1);
        document.removeEventListener('mousemove', drag);
        isDrag = false;
        setTimeout(function () {
            document.addEventListener("click", zoom);
        }, 300);
        return;
    }
    else if (menuText) {
        let gallery = menuText.parentElement.parentElement.querySelector(".post__gallery");
        setTranslate(gallery, `translateY(0%)`, "bottom")
        setTranslate(gallery, `translateX(calc(-100% - ${getComputedStyle(gallery.parentElement).gap}))`, "left")
        translateX = 0;
        document.removeEventListener('mousemove', drag);
        isDrag = false;
        return;
    }
    else if (menuComments) {
        let gallery = menuComments.parentElement.parentElement.querySelector(".post__gallery");
        let text = menuComments.parentElement.parentElement.querySelector(".post__text");
        setTranslate(text, `translateX(0%)`, "right");
        setTranslate(gallery, `translateY(calc(100% - 10px - (34px + 10 * ((100vw - 320px) / (1320 - 320)))))`, "bottom")
        gallery.style.pointerEvents = "none";
        if (gallery.previousElementSibling.classList[0] == "post__comments") {
            gallery.previousElementSibling.style.transform = `translateY(100%)`;
        }
        translateY = 0;
        document.removeEventListener('mousemove', drag);
        document.addEventListener('click', close = (click) => {
            let closeButton = click.target.closest(".comments__close");
            if (closeButton) {
                if (closeButton.parentElement.nextElementSibling == gallery) {
                    setTranslate(gallery, `translateY(0%)`, "bottom")
                    gallery.style.pointerEvents = "";
                    setTimeout(function () {
                        document.addEventListener("click", zoom);
                    }, 300);
                    document.removeEventListener('click', close);
                }
            }
            else {
                return;
            }
        });
        isDrag = false;
        return;
    }
}); 
document.addEventListener('click', zoom = (click) => {
    let target = click.target.closest(".gallery__img");
    if (!target) return;
    let allImgs = target.parentElement.children;
    for (let i = 0; i < allImgs.length; i++) {
        if (allImgs[i] != target) {
            allImgs[i].classList.toggle("turn-off");
        }
    }
    target.parentElement.classList.toggle("gallery");
    target.parentElement.classList.toggle("single");
});
function setTranslate(element, translateValue, orient) {
    element.style.transition = `all 0.3s linear`;
    element.style.transform = `${translateValue}`;
    if (orient == "left") {
        if (element.nextElementSibling.classList[0] == "post__text") {
            element.nextElementSibling.style.transition = `all 0.3s linear`;
            element.nextElementSibling.style.transform = `${translateValue}`;
            element.style.visibility = `hidden`;
            element.style.opacity = `0`;
            element.nextElementSibling.style.visibility = `visible`;
            element.nextElementSibling.style.opacity = `1`;
        }
    }
    else if (orient == "right") {
        if (element.previousElementSibling.classList[0] == "post__gallery") {
            element.previousElementSibling.style.transition = `all 0.3s linear`;
            element.previousElementSibling.style.transform = `${translateValue}`;
            element.style.visibility = `hidden`;
            element.style.opacity = `0`;
            element.previousElementSibling.style.visibility = `visible`;
            element.previousElementSibling.style.opacity = `1`;
        }
    }
    else if (orient == "bottom") {
        if (element.previousElementSibling.classList[0] == "post__comments") {
            element.previousElementSibling.style.transition = `all 0.3s linear`;
            element.previousElementSibling.style.transform = `${translateValue}`;
            element.previousElementSibling.style.visibility = `visible`;
            element.previousElementSibling.style.opacity = `1`;
        }
    }
    else {
        console.log(`Wrong ${orient} orientation`);
        return
    }
}
document.addEventListener('mousedown', (mdown) => {
    let gallery = mdown.target.closest(".gallery");
    let text = mdown.target.closest(".post__text");
    if (!gallery && !text) return;
    translateX = gallery ? 0 : text.getBoundingClientRect().width * (-1);
    translateY = 0;
    document.addEventListener('mousemove', drag = (move) => {
        isDrag = true;
        document.removeEventListener("click", zoom);
        move.stopPropagation();
        translateX += move.movementX;
        translateY += move.movementY;
        if (gallery) {
            if (Math.abs(translateX) >= Math.abs(translateY)) {
                let maxDrag = gallery.getBoundingClientRect().width / 2;
                if (-translateX > maxDrag) {
                    setTranslate(gallery, `translateX(calc(-100% - ${getComputedStyle(gallery.parentElement).gap}))`, "left")
                    translateX = 0;
                    document.removeEventListener('mousemove', drag);
                    isDrag = false;
                    return;
                }
                else if (translateX < 0) {
                    gallery.style.transform = `translateX(${translateX}px)`;
                    gallery.style.transition = ``;
                    gallery.style.opacity = ``;
                    gallery.style.visibility = ``;
                    if (gallery.nextElementSibling.classList[0] == "post__text") {
                        gallery.nextElementSibling.style.cssText = `transform : translateX(${translateX}px)`;
                    }
                }
            }
            else {
                let maxDrag = gallery.getBoundingClientRect().height / 2;
                if (translateY > maxDrag) {
                    setTranslate(gallery, `translateY(calc(100% - 10px - (34px + 10 * ((100vw - 320px) / (1320 - 320)))))`, "bottom")
                    gallery.style.pointerEvents = "none";
                    if (gallery.previousElementSibling.classList[0] == "post__comments") {
                        gallery.previousElementSibling.style.transform = `translateY(100%)`;
                    }
                    translateY = 0;
                    document.removeEventListener('mousemove', drag);
                    document.addEventListener('click', close = (click) => {
                        let closeButton = click.target.closest(".comments__close");
                        if (closeButton) {
                            if (closeButton.parentElement.nextElementSibling == gallery) {
                                gallery.style.pointerEvents = "";
                                setTranslate(gallery, `translateY(0%)`, "bottom")
                                setTimeout(function () {
                                    document.addEventListener("click", zoom);
                                }, 300);
                                document.removeEventListener('click', close);
                            }
                        }
                        else {
                            return;
                        }
                    });
                    isDrag = false;
                    return;
                }
                else if (translateY > 0) {
                    gallery.style.transform = `translateY(${translateY}px)`;
                    gallery.style.transition = ``;
                    gallery.style.opacity = ``;
                    gallery.style.visibility = ``;
                    if (gallery.previousElementSibling.classList[0] == "post__comments") {
                        gallery.previousElementSibling.style.cssText = `transform : translateY(${translateY}px);`;
                    }
                }
            }
        }
        else if (text) {
            let maxDrag = text.getBoundingClientRect().width / 2;
            if (-translateX < maxDrag) {
                setTranslate(text, `translateX(0%)`, "right");
                translateX = text.getBoundingClientRect().width * (-1);
                document.removeEventListener('mousemove', drag);
                isDrag = false;
                setTimeout(function () {
                    document.addEventListener("click", zoom);
                }, 300);
                return;
            }
            else if (translateX > -text.getBoundingClientRect().width) {
                text.style.cssText = `transform : translateX(${translateX}px);`;
                if (text.previousElementSibling.classList[0] == "post__gallery") {
                    text.previousElementSibling.style.transform = `translateX(${translateX}px)`;
                    text.previousElementSibling.style.transition = ``;
                    text.previousElementSibling.style.opacity = ``;
                    text.previousElementSibling.style.visibility = ``;
                }
            }
        }
    });
});
document.addEventListener('mouseup', (mup) => {
    let gallery = mup.target.closest(".gallery");
    let text = mup.target.closest(".post__text");
    if (!gallery && !text) return;
    document.removeEventListener('mousemove', drag);
    if (gallery) {
        if (isDrag) {
            setTranslate(gallery, `translateX(0%)`, "left");
            setTranslate(gallery, `translateY(0%)`, "bottom");
            gallery.style.visibility = `visible`;
            gallery.style.opacity = `1`;
            translateX = 0;
            translateY = 0;
            setTimeout(function () {
                document.addEventListener("click", zoom);
            }, 300);
        }
    }
    else if (text) {
        if (isDrag) {
            setTranslate(text, `translateX(calc(-100% - ${getComputedStyle(text.parentElement).gap}))`, "right")
            text.style.visibility = `visible`;
            text.style.opacity = `1`;
            translateX = text.getBoundingClientRect().width * (-1);
        }
    }
    isDrag = false;
});