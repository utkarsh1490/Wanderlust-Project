let checkbox = document.querySelector("#toggleBtnCheckbox");
let toggleBtn = document.querySelector("#toggleBtn");
let toggleBtnDiv = document.querySelector(".toggleBtn");
let priceDiv = document.querySelector("#priceDiv");
let originalPrice = price;
toggleBtn.style.marginLeft = "-0.1rem";
let toggleArray = [checkbox,toggleBtn];
for(element of toggleArray){
    element.addEventListener("click",function(){
        if(toggleBtn.style.marginLeft == "-0.1rem"){
            toggleBtn.style.marginLeft = "70%";
            toggleBtnDiv.style.backgroundColor = "#5dbcfb";
            price = originalPrice + originalPrice*0.18
            priceDiv.innerText = price;
        } else{
            toggleBtnDiv.style.backgroundColor = "white";
            toggleBtn.style.marginLeft = "-0.1rem";
            priceDiv.innerText = originalPrice;
        };
    });
}