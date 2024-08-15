let rbtn = document.querySelector("#reviewBtn");
let body = document.querySelector("body");
let rmodal = document.querySelector(".reviewModal");
let closeBtn = document.querySelector("#closeModal");
closeBtn.addEventListener("click",function(){
    body.style.overflow = "auto";
    rmodal.style.display = "none";
})
rbtn.addEventListener("click",function(){
    body.style.overflow = "hidden";
    rmodal.style.display = "block";
});
rbtn = document.querySelector("#reviewSubmitBtn");
let comment = document.querySelector("#comment");
let fill = document.querySelector("#reviewIconFill");
let empty = document.querySelector("#reviewIconEmpty");
let div = document.querySelector(".comment");
let arrayForFill = ["click","mousemove"];
for(let i=0;i<2;i++){
    rbtn.addEventListener(arrayForFill[i],function(){
        if(!document.querySelector("#notDone")){
            if(!comment.value.length){
                comment.style.borderColor = "red";
                fill.style.display = "none";
                empty.style.color = "red";
                empty.style.display = "block";
                let p = document.createElement("p");
                p.innerText = "Please give us your review first";
                p.style.margin = "0";
                p.style.color = "red";
                p.setAttribute("id","notDone");
                div.appendChild(p);
            }
            else{
                comment.style.borderColor = "green";
                fill.style.color = "green";
                empty.style.display = "none";
                fill.style.display = "block";
            }
        } else{
            if(comment.value.length){
                comment.style.borderColor = "green";
                fill.style.color = "green";
                fill.style.display = "block";
                let p = document.querySelector("#notDone");
                p.remove();
            } else{
                let p = document.querySelector("#notDone");
                p.remove();
                comment.style.borderColor = "red";
                fill.style.display = "none";
                empty.style.color = "red";
                empty.style.display = "block";
                p = document.createElement("p");
                p.innerText = "Please give us your review first";
                p.style.margin = "0";
                p.style.color = "red";
                p.setAttribute("id","notDone");
                div.appendChild(p);
            };
        }
    });
};
rbtn = document.querySelector("#showReviewBtn");
let dbtn = document.querySelector("#showDetailsBtn");
let rcard = document.querySelector("#reviewCard");
let dcard = document.querySelector("#detailsCard");
rbtn.addEventListener("click",function(){
    rbtn.style.display = "none";
    dbtn.style.display = "block";
    dcard.style.display = "none";
    rcard.style.display = "block";
});
dbtn.addEventListener("click",function(){
    rbtn.style.display = "block";
    dbtn.style.display = "none";
    dcard.style.display = "block";
    rcard.style.display = "none";
});