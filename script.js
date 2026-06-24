window.addEventListener("scroll", () => {

const nav = document.querySelector("nav");

if(window.scrollY > 50){
nav.style.background = "#000";
}else{
nav.style.background = "transparent";
}

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener('click', function(e){

e.preventDefault();

document.querySelector(
this.getAttribute('href')
).scrollIntoView({
behavior:'smooth'
});

});

});
