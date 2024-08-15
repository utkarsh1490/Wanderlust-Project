let signupIconsArray = ["username","email","password"];
let signupBtn = document.querySelector("#signupFormBtn");
let iconFill,iconEmpty,inputElement;
signupBtn.addEventListener("click",function(){
    for(element of signupIconsArray){
        inputElement = document.querySelector(`#${element}`);
        if(inputElement.value.length){
            iconFill = document.querySelector(`#${element}SignupIconFill`);
            iconFill.style.display = "block";
            iconEmpty = document.querySelector(`#${element}SignupIconEmpty`);
            iconEmpty.style.display = "none";
            inputElement.style.borderColor = "lightgreen";
            inputElement.style.borderWidth = "0.3rem";
            if(document.querySelector(`#errorPara${element}`)){
                document.querySelector(`#errorPara${element}`).remove();
            };

        } else{
            iconFill = document.querySelector(`#${element}SignupIconFill`);
            iconFill.style.display = "none";
            iconEmpty = document.querySelector(`#${element}SignupIconEmpty`);
            iconEmpty.style.display = "block";
            inputElement.style.borderColor = "red";
            inputElement.style.borderWidth = "0.15rem";
            inputElement.style.outline = "none";
            if(document.querySelector(`#errorPara${element}`)){
                document.querySelector(`#errorPara${element}`).remove();
            };
            let p = document.createElement("p");
            p.innerText = `Please enter your ${element}`;
            p.classList.add("errorPara");
            p.setAttribute("id",`errorPara${element}`);
            let div = document.querySelector(`#${element}Div`);
            div.appendChild(p);
        }
    }
});