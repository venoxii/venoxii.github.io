var body = document.querySelector("body");

function dynamicResize(){
    var screenSize = screen.width;
    var windowSize = window.innerWidth;
    if((windowSize <= 1023 && windowSize >= 641) || (screenSize <= 1023 && screenSize >= 641)){body.classList = "screen-medium";}
    if(windowSize <= 640 || screenSize <= 640){body.classList = "screen-small";}
    if(windowSize <= 880 || screenSize <= 880){body.classList.add("screen-max880");}
    if(windowSize <= 800 || screenSize <= 800){body.classList.add("screen-max800");}
    if(windowSize <= 1023 || screenSize <= 1023){body.classList.add("screen-medium-below");}
    if(windowSize > 1023 ){body.classList = "";}
}

dynamicResize();

window.addEventListener("resize", dynamicResize);