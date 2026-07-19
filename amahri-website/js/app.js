// =============================
// AMAHRI COLLECTIONS PARFUMS
// app.js
// =============================

// تغيير الهيدر أثناء النزول

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){

header.style.background="#000";
header.style.padding="15px 8%";
header.style.boxShadow="0 5px 25px rgba(212,175,55,.15)";

}

else{

header.style.background="rgba(0,0,0,.85)";
header.style.padding="20px 8%";
header.style.boxShadow="none";

}

});



// ظهور العناصر أثناء النزول
// (كيتقاد دابا عبر js/animation.js بشكل عام فكل الصفحات)

document.querySelectorAll(".category,.features div").forEach(el=>{

el.classList.add("hidden");

});



// حركة خفيفة على الأزرار

document.querySelectorAll(".btn,.category a").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});



// تأثير بسيط على الصور

document.querySelectorAll(".category img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.08)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});