let array = ["title","description","price","location","country"];
let btn2 = document.querySelector("#formBtn");
btn2.addEventListener("click",function(){
    let i = 0;
    for(let i=0 ; i<5 ; i++){
        if(document.querySelector(`#errorMessage${array[i]}`)){
            document.querySelector(`#errorMessage${array[i]}`).remove();
        }
        let iconEmpty = document.querySelector(`#${array[i]}IconEmpty`);
        let name = document.querySelector(`#${array[i]}`);
        let div = document.querySelector(`#${array[i]}Div`);
        let iconFill = document.querySelector(`#${array[i]}IconFill`);
        if(name.value.length===0){
            iconFill.style.opacity = "0";
            iconEmpty.style.opacity = "1";
            name.style.border = "0.1rem solid red";
            let text = document.createElement("p");
            text.innerText = `${array[i].toLowerCase()} should not be empty`;
            text.style.marginTop = "1rem";
            text.style.marginLeft = "20rem";
            text.style.width = "max-content";
            text.style.height = "3rem";
            text.style.backgroundColor = "#f4b5b5";
            text.style.borderRadius = "0.5rem";
            text.style.padding = "0.05rem 5rem";
            text.style.color = "#d62f2f";
            text.style.opacity = "0.8";
            text.style.fontSize = "1rem";
            text.style.border = "0.01rem solid red";
            text.style.fontFamily = 'Lucida Sans';
            text.style.fontWeight = "100";
            text.style.marginBottom = "0.01rem";
            text.setAttribute("id",`errorMessage${array[i]}`);
            div.append(text);
        } else{
            iconEmpty.style.opacity = "0";
            iconFill.style.opacity = "1";
            name.style.border = "0.08rem solid black";
        };
    };
});
for(let i = 0;i<5;i++){
    let iconFill = document.querySelector(`#${array[i]}IconFill`);
    let iconEmpty = document.querySelector(`#${array[i]}IconEmpty`);
    let text = document.querySelector(`#errorMessage${array[i]}`);
    let val = document.querySelector(`#${array[i]}`);
    val.addEventListener("keypress",function(event){
        if(val.value.length==0){
            if(iconEmpty.style.opacity=="1"){
                iconFill.style.opacity = "1";
                val.style.border = "0.12rem solid rgb(73, 249, 73)";
                iconEmpty.style.opacity = "0";
                text.style.opacity = "0";
            }
        };
    });
    val.addEventListener("mousemove",function(){
        if(val.value.length!=0){
            iconFill.style.opacity = "1";
            val.style.border = "0.12rem solid rgb(73, 249, 73)";
            iconEmpty.style.opacity = "0";
        } else if(val.value.length==0 && val.nextElementSibling.style.opacity=="1"){
            iconFill.style.opacity = "0";
            val.style.border = "0.1rem solid red";
            iconEmpty.style.opacity = "1";
        } else{
            console.log(".");
        };
    });
};