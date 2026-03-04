gsap.from(".main",{
    opacity : 0,
    scale : 0,
    duration : 1.4
});
//get id from local storage  //
var ALLID  = [];
var i;
for(i=0;i<localStorage.length;i++){
    var allKeys = localStorage.key(i);
    if(allKeys.match("_brand")){
        ALLID.push(
            allKeys.replace("_brand","")
        );
    }
}
// start creat option coding for space code//
var brandcodeEl = document.querySelector("#brand-code-el");
ALLID.forEach((code,index) =>{
    brandcodeEl.innerHTML += `
     <option value="${code}">${code}</option>
    `;
})
//all global variable//
var LoginForm = document.querySelector(".login-form");
var allInput = LoginForm.querySelectorAll("INPUT");
var loginBtn = LoginForm.querySelector("button");
var brandcode;
var allUserData=[];
var ID;
//get data from localstorage//

//start login coding //
brandcodeEl.addEventListener("change", function(){
    if(brandcodeEl.value != "choose space code"){
      sessionStorage.setItem("ID",brandcodeEl.value);
      ID = sessionStorage.getItem("ID");
      LoginUserFunc();
}
else{
    swal("Choose Space Code" , "Please choose space code first!" , "warning");
}
});
function LoginUserFunc(){
    if(localStorage.getItem(ID+"_registrationData") != null){
        allUserData = JSON.parse(localStorage.getItem(ID+"_registrationData"));
    }
    LoginForm.addEventListener("submit", function(e){
        e.preventDefault();
        for(i=0; i<allUserData.length; i++){
            if(allUserData[i].enrollment == allInput[0].value){
                if(allUserData[i].password == allInput[1].value){
                    sessionStorage.setItem("enrollment", allUserData[i].enrollment);
                    sessionStorage.setItem("name", allUserData[i].name);
                    sessionStorage.setItem("address", allUserData[i].adress);
                    sessionStorage.setItem("fahterName", allUserData[i].fathername);
                   sessionStorage.setItem("ID",ID);
                    loginBtn.innerHTML = "Please Wait...";
                    setTimeout(() => {
                        window.location = "../welcome/welcome.html";
                    },3000);
                    return;
                }
                
                else{
                    swal("Wrong Password!" , "Please Contact Your Teacher" , "warning");
                    return;
                }
                return;
            }
            else{ 
                swal("Wrong Enrollment!" , "Please Contact Your Teacher" , "warning");
                
            }
             
        }
    })
}


