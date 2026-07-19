const menuToggle =
document.getElementById("menu-toggle");

const navbar =
document.getElementById("navbar");

if(menuToggle && navbar){

menuToggle.addEventListener("click",()=>{

navbar.classList.toggle("active");

});

}