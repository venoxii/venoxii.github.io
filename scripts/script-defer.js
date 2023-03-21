var bannerCoverUp = document.getElementById("bannerCoverUp");
var main = document.getElementById("main");
var header = document.getElementById("header");
var navIsVisible = false;

if(bannerCoverUp){
    // var showBanner = sessionStorage.getItem('bannerStat');
    // if (showBanner != 'shown') {
    //     sessionStorage.setItem('bannerStat', 'shown');
    // }else{
    //     bannerCoverUp.style.display = 'none';
    // }
    
    var mainPosition = main.offsetTop;
    header.style.position = "absolute";
    header.style.top = mainPosition + "px";
    if(window.innerHeight < main.offsetTop && window.scrollY === 0){
        window.scrollTo({top: mainPosition - window.innerHeight, behavior: 'smooth'});
    }

    window.addEventListener("scroll", pageScroll);

    var bannerCoverUpCta = document.getElementById("coverup-cta");
    bannerCoverUpCta.addEventListener("click", function() {
        window.scrollTo({top: mainPosition, behavior: "smooth"});
        setTimeout(() => {
            bannerCoverUp.style.display = 'none';
            header.style.position = "fixed";
            header.style.top = 0;
            window.scrollTo({top: 0});
            window.removeEventListener("scroll", pageScroll);
            header.style.position = "fixed";
            header.style.top = 0;
        }, 650);
    });

    function pageScroll() {
        let scroll = window.scrollY;
        if(scroll >= mainPosition || !window.innerHeight > mainPosition){
            header.style.position = "fixed";
            header.style.top = 0;
        }else{
            header.style.position = "absolute";
            header.style.top = (mainPosition) + "px";
        }}
}

var acc = document.getElementsByClassName("accordion");
for (button of acc) {
    setAccordionHeight(button);

    button.addEventListener("click", function() {
        var item = this.closest(".accordion-item");
        item.classList.toggle("active");

        setAccordionHeight(this);
    });
}

function setAccordionHeight(target) {
    var item = target.closest(".accordion-item");
    var panelHeight = target.nextElementSibling.clientHeight;
    var buttonHeight = target.clientHeight;

    if(item.classList.contains("active")){
        console.log()
        item.style.height = buttonHeight + panelHeight + "px";
    }else{
        item.style.height = buttonHeight + "px";
    }
}

let elementsArray = document.querySelectorAll(".js-scroll");
function show(){
    for (elem of elementsArray) {
        var distInView = elem.getBoundingClientRect().top - this.window.innerHeight + 100;
        if (distInView < 0) {
            elem.classList.remove("js-scroll");
        }
    }
}
window.addEventListener('scroll', show);
show();

var loader = document.getElementById("loader");
if(loader){
    window.addEventListener('load', function () {
        loader.classList.add("hide");
        setTimeout(() => {
            loader.style.display = "none";
            loader.classList.add("action-loader");
        }, 500);
    });
}

var form = document.getElementById("messageForm");
var formsuccess = document.getElementById("form-success");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    e.stopPropagation();

    loader.style.display = "flex";
    loader.classList.remove("hide");

    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);
    var isEmpty = false;

    for(data of formData){
        if(data[1] == ""){
            isEmpty = true;

            var inputEl = form.querySelector("[name='"+data[0]+"']");
            inputEl.classList = "error";
            inputEl.addEventListener("keyup", (e)=>{
                e.target.classList.remove("error");
            });
        }

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }

    if(!isEmpty){
        var jsonData = JSON.stringify(Object.fromEntries(formData));

        xhr.open('POST','https://51j9do0li9.execute-api.ap-southeast-1.amazonaws.com/default/CTuna');
        
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.send(jsonData);

        xhr.addEventListener("load", (event) => {
            loader.classList.add("hide");
            setTimeout(() => {
                setTimeout(() => {
                    loader.style.display = "none";
                }, 1000);

                formsuccess.style.display = "block";
                setTimeout(() => {
                    formsuccess.classList.add("slideOut");
                    setTimeout(() => {
                        formsuccess.style.display = "none";
                        formsuccess.classList = "";
                    }, 1000);
                }, 3000);
            }, 500);
        });
    
        xhr.addEventListener("error", (event) => {
            alert('Oops! Something went wrong.');
            loader.style.display = "none";
            location.reload();
        });

        form.reset();
    }
});

// Aling tindera

var dropOfflink = document.getElementsByClassName("location-item");
if(dropOfflink){
    for(item of dropOfflink){
        item.addEventListener("click", (e)=>{
            e.stopPropagation();
            e.preventDefault();

            elID = e.target.closest(".location-item").id;

            console.log(getSrc(elID));
            document.getElementById("map").src = getSrc(elID);
        })
    }
}

function getSrc(id) {
    switch (id) {
        case "aileen_by_the_sea":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3174306823194!2d120.92533431507756!3d13.75972119034235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd077642b2bf6b%3A0x16a2d714f3ed2b1a!2sAileen%20by%20the%20Sea%20Beach%20Resort!5e0!3m2!1sen!2sph!4v1678391236469!5m2!1sen!2sph";
            break;
        case "anilao_awari":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.4023626699613!2d120.9065709150775!3d13.754592390345676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd079d701abcf9%3A0x75673ddd6924d5e1!2sAnilao%20Awari%20Bay!5e0!3m2!1sen!2sph!4v1678427869962!5m2!1sen!2sph";
            break;
        case "camp_netanya":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.824293165996!2d120.8814019261675!3d13.72908535953539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bda9e50a964c65%3A0xc684e11e948e6d4f!2sCamp%20Netanya%20Resort%20%26%20Spa!5e0!3m2!1sen!2sph!4v1678427942362!5m2!1sen!2sph";
            break;
        case "casa_escondida":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.845249185493!2d120.88209771507717!3d13.727817290362994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bda9eff584af69%3A0x81011df456c41163!2sCasa%20Escondida%20Anilao%20Resort%20%26%20Dive%20Center!5e0!3m2!1sen!2sph!4v1678428087100!5m2!1sen!2sph";
            break;
        case "aiyanar_beach":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.901855868172!2d120.88046561507713!3d13.724391390365183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bda9f3d8fe3099%3A0xaae56d0365e64f8d!2sAiyanar%20Beach%20%26%20Dive%20Resort!5e0!3m2!1sen!2sph!4v1678428149709!5m2!1sen!2sph";
            break;
        case "solitude_acacia":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.850038132831!2d120.88198831507718!3d13.727527490363178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bda92ae3d689d7%3A0xe03019bda468c0c0!2sSolitude%20Acacia%20Resort!5e0!3m2!1sen!2sph!4v1678428212299!5m2!1sen!2sph";
            break;
        case "parecaa":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0067676890226!2d120.92349851507717!3d13.718039790369305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd07c03fc5c42f%3A0xb4f38034330c9a2a!2sParecaa%20Beach%20Resort!5e0!3m2!1sen!2sph!4v1678428251873!5m2!1sen!2sph";
            break;
        case "crystal_blue":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.1386524895993!2d120.87478561507709!3d13.71005109037449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bdaa19d27bc655%3A0xfc5a7dc309f2fadf!2sCrystal%20Blue%20Dive%20Resort!5e0!3m2!1sen!2sph!4v1678428327756!5m2!1sen!2sph";
            break;
        case "arthurs_place":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.163966897048!2d120.873381515077!3d13.708517190375487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bdaa04b1555555%3A0xd1cf49c2cc81c66f!2sARTHUR&#39;S%20PLACE%20DIVE%20RESORT!5e0!3m2!1sen!2sph!4v1678428364221!5m2!1sen!2sph";
            break;
        case "dive_solana":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2186361399818!2d120.8762874150771!3d13.705203990377607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bdaa1272f5825f%3A0x5b90c4dd0fcd8ba!2sDive%20Solana%20Resort!5e0!3m2!1sen!2sph!4v1678428510132!5m2!1sen!2sph";
            break;
        case "sea_spring":
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.498102561906!2d120.89336031507683!3d13.688254790388626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bdaa763d24c6c3%3A0xf80a21cfda5c55ea!2sSea%20Spring%20Resort!5e0!3m2!1sen!2sph!4v1678428543041!5m2!1sen!2sph";
            break;
        default:
            break;
    }
}

function searchDropOff() {
    var input, filter, ul, li, a, i, txtValue;

    input = document.getElementById("searchDropOff");
    filter = input.value.toUpperCase();
    wrapper = document.getElementById("location-wrapper");
    item = wrapper.getElementsByTagName("a");

    for (i = 0; i < item.length; i++) {
        span = item[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}
