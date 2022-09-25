"use strict"

let isOpen = false;
const menuMain = document.querySelector(".menu__main");


function open(isOpen)
{
    let menuItems = menuMain.parentElement.children;
    let num_of_items = menuMain.parentElement.children.length;
    if(!isOpen)
    {
        let gap = getComputedStyle(menuMain.parentElement).gap;
        let mainHeight = getComputedStyle(menuMain).height;
        for (let i = 1; i < num_of_items; i++) {
            if (menuItems[i] !== menuMain) {
                let itemHeight = getComputedStyle(menuItems[i]).height;
                menuItems[i].style.transform = `translateY(calc(-50% - (${mainHeight} / 2 + ${gap} * ${i} + ${itemHeight} * ${i - 1})))`;
                menuItems[i].style.visibility = `hidden`;
                menuItems[i].style.opacity = `0`;
            }
        }
        return true;
    }
    else if (isOpen) {
        for (let i = 1; i < num_of_items; i++) {
            if (menuItems[i] !== menuMain) {
                menuItems[i].style.transform = ``;
                menuItems[i].style.visibility = `visible`;
                menuItems[i].style.opacity = `1`;
            }
        }
        return false;
    }
}

menuMain.addEventListener('click', (click) => {
    isOpen = open(isOpen);
});


isOpen = open(isOpen);