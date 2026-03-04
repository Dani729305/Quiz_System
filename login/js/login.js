/*  start gsap coding */
 
function animate(){
var tl = gsap.timeline();
tl.from(".navbar-brand img",{
    y:-30,
    opacity:0,
    duration:0.5,
    delay:0.5,
     scale:0.5
})
tl.from(".navbar-nav a, .navbar-nav button ",{
    y:-30,
    opacity:0,
    duration:0.5,
    stagger:0.15
})
tl.from(".login-box",{
    x:-100,
    opacity:0,
})
gsap.from(".ping img",{
    opacity:0,
    scale:0.3,
    duration:3,
    delay:0.5,
})
}
animate();



/*  end gsap coding */

/* start javascript  coding */

 var signupBtn = document.querySelector("#signup-btn");
 var signinBtn = document.querySelector("#signin-btn");
 var loginBox = document.querySelector(".login-box");
 var signupBox = document.querySelector(".signup-box");
 signupBtn.addEventListener("click", () =>{
    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    signinBtn.classList.remove("d-none");
    signupBtn.classList.add("d-none");
    animate();
    gsap.from(".signup-box",{
    x:-100,
    duration:1,
    delay:1,
    opacity:0
})
 })
  signinBtn.addEventListener("click", () =>{
    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    signinBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
    animate();
 })

/* Start signup coding  coding */

var registerForm = document.querySelector(".signup-form");
var allInput = registerForm.querySelectorAll("INPUT");
var textArea = registerForm.querySelector("#adress");

registerForm.onsubmit = function(e){
   e.preventDefault();
   registrationData();
}

const registrationData = () =>{
   if(localStorage.getItem(allInput[0].value+"_brand") == null){
     const userData ={
        ID : allInput[0].value,
        NAME : allInput[1].value,
        CONTACT : allInput[2].value,
        ADRESS : textArea.value,
        USERNAME : allInput[3].value,
        PASSWORD : allInput[4].value
    }
    let userString = JSON.stringify(userData);
    localStorage.setItem(allInput[0].value+"_brand",userString);
    registerForm.reset();
    swal("Rigistration Done" , "Please Sign in !" , "success");
}
else{
       swal("Change the ID" , "This ID have already taken !" , "error");
   }
}

/* end signup coding  coding */

/* start sign in  coding  coding */

var signInBtn = document.querySelector("#signin");
var ID = document.querySelector("#id");
var username = document.querySelector("#username");
var password = document.querySelector("#password");

signInBtn.addEventListener("click", function(e){
    if(ID.value && username.value && password.value != ''){
      e.preventDefault();
      if(localStorage.getItem(ID.value+"_brand") != null){
        var allData = JSON.parse(localStorage.getItem(ID.value+"_brand"));
        if(allData.USERNAME == username.value){
            if(allData.PASSWORD == password.value){
                signInBtn.innerHTML = "Please Wait...";
                signInBtn.disabled = true;
                setTimeout(function(){
                    window.location = "./dashboard/dashboard.html";
                    sessionStorage.setItem("ID",ID.value);
                },3000)
            }
            else{

                swal("Wrong password" , "check the password !" , "warning");
            }
        }
        else{

            swal("Wrong username" , "check the username !" , "warning");
        }
      }
      else{

          swal("Wrong ID" , "Sing Up first !" , "warning");
      }
    }
    else{
         swal("Empty field" , "Fill all the field !" , "warning");
    }
})

/* end sign in  coding  coding */



/* end javascript  coding */

