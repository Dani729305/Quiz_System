/*start gsap coding */
function animate(){
    var tl = gsap.timeline();
tl.from(".profile-pic img",{
    scale:0,
    duration:1,
})


tl.from(".list-group-item",{
    x:-200,
    duration:0.7,
    opacity:0,
    stagger:0.15
},"same")

tl.from(".list-group-item .animate",{
    scale:0,
    delay:1
},"same")
gsap.from("#button",{
    opacity:0,
    duration:3,
    delay:0.5,
})

tl.from(".dani",{
    scale:0,
    opacity:0,
    duration:1
})
gsap.from(".content h1",{
    y:-50,
    opacity:0,
    duration:1,
    delay:1
})
tl.from(".head h3",{
    scale:0,
},"main")
tl.from(".box .number-box",{
    scale:0
},"main")
}
animate();
/*end gsap coding */

/* get data from session storage */
var ID ;
ID = sessionStorage.getItem("ID");
if(ID == null){
    document.body.innerHTML = "";
    document.body.style.background = "black";
    swal("UnAuthorized User" , "Dont waste your time!" , "warning");
}
var allUserData = JSON.parse(localStorage.getItem(ID+"_brand"));
var namecontent = document.getElementById("tittle");
namecontent.innerHTML = `Wellcome : ${allUserData.NAME}`;

/* start logout coding */
var LogOutBtn = document.querySelector("#button");
LogOutBtn.addEventListener("click", (e) =>{
    e.target.innerHTML = "Please Wait...";
    e.target.disabled = true;
    e.target.style.background = "blue";
    setTimeout(() => {
        window.location = "../login.html";
        sessionStorage.removeItem("ID");
    }, 3000);
})

/* start logout coding */

/* start store subject coding */

var visibelSubject = document.querySelector(".visible-subject");
var subjectEl = document.querySelector(".subject");
var subjectBtn = document.querySelector("#subject-btn");
var allSubject = [];
subjectBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    if(subjectEl.value != ""){
        newSubject();
        subjectEl.value = "";
    }
    else{
        swal("Empty Subject" , "Please enter subject!" , "warning");
    }
    updateSubject();
})

const newSubject = (subject,index) =>{
    var subjectName = subjectEl.value;
    if(subject){
        subjectName = subject.subjectName;
    }
    visibelSubject.innerHTML += `
     <div class="visible-subject subject-box d-flex justify-content-between align-items-center">
                                <h4 index='${index}'>${subjectName}</h4>
                                <div class="icons">
                                    <i class="fa fa-edit edit-btn"></i>
                                    <i class="fa fa-save d-none save-btn"></i>
                                    <i class="del-btn fa fa-trash"></i>
                                </div>
                               </div>
    
    `;

    //start delete coding//
    var i;
    var delAllBtn = visibelSubject.querySelectorAll(".del-btn");
    for(i=0; i<delAllBtn.length; i++){
        delAllBtn[i].onclick = function(){
            var parent = this.parentElement.parentElement;
            swal({
                title: "Are you sure?",
                text: "Once Deleted! You won't be able to revert this!",
                icon: "warning",
                buttons: true,
   dangerMode : true,
})
.then((willDeleted) => {
    if (willDeleted) {
        parent.remove();
        updateSubject();
        swal( "Deleted!","Your Subject has been deleted.", "success");
    }
    else{
        swal( "secure!","Your subject is secure.");
        
    }
});
}
}
//start update coding//
var allEditBtn = visibelSubject.querySelectorAll(".edit-btn");
for(i=0; i<allEditBtn.length; i++){
    allEditBtn[i].onclick = function(){
        var parent = this.parentElement.parentElement;
          var h4 = parent.getElementsByTagName("H4");
          var saveBtn = parent.querySelector(".save-btn");
          h4[0].contentEditable = true;
          h4[0].focus();
          this.classList.add("d-none");
          saveBtn.classList.remove("d-none");
          saveBtn.addEventListener("click", () =>{
            var editSub = h4[0].innerHTML;
            var id = h4[0].getAttribute("index");
            updateSubject(editSub,id);
            saveBtn.classList.add("d-none");
            allEditBtn[id].classList.remove("d-none");
            h4[0].contentEditable = false;
          })
    }
}
//end update coding//
}


if(localStorage.getItem(ID+"_allSubject") != null){
    allSubject = JSON.parse(localStorage.getItem(ID+"_allSubject"));
    allSubject.forEach((subject,index) => {
        newSubject(subject,index);
    });
}
function updateSubject(subject,id){
    if(subject != undefined && id != undefined){
        allSubject[id] = {
            subjectName : subject
        }
    }
 else{
       var i;
    allSubject = [];
    var subjectBox = visibelSubject.querySelectorAll(".subject-box");
    for(i=0; i<subjectBox.length; i++){
        var h4 = subjectBox[i].getElementsByTagName("H4");
        allSubject.push({
            subjectName : h4[0].innerHTML
        });
    }
 }
    localStorage.setItem(ID+"_allSubject",JSON.stringify(allSubject));
}
/* end store subject coding */

//start return subject in question form //
 
var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector(".question-form");
var allQuesInput = questionForm.querySelectorAll("INPUT");
var selectSubject = document.querySelector("#select-subject");
var subjectResultEl = document.querySelector("#subject-result-el");
var allQuestion = [];
var subject;
questionForm.addEventListener("submit", function(e){
    e.preventDefault();
    insertQuestionFunc();
})

function chooseSubjectFunc(){
       allSubject.forEach((subject, index)=>{
       chooseSubject.innerHTML += `
                        <option value='${subject.subjectName}'>${subject.subjectName}</option>
            `;

        selectSubject.innerHTML += `
                        <option value='${subject.subjectName}'>${subject.subjectName}</option>
            `;
            subjectResultEl.innerHTML += `
                        <option value='${subject.subjectName}'>${subject.subjectName}</option>
            `;

       })
}
chooseSubjectFunc();


chooseSubject.addEventListener('change',()=>{
    checkSubject();
    checkSubjectKey();
})

var firstOption = chooseSubject.querySelectorAll("OPTION")[1];
function checkSubject(){
    if(chooseSubject.value == "choose subject"){
        
    }
    else{
        subject = chooseSubject.value;
    }
}
checkSubject();

function checkSubjectKey(){
    if(localStorage.getItem(ID+"_"+subject+"_question") != null){
    allQuestion = JSON.parse(localStorage.getItem(ID+"_"+subject+"_question"))
}
else{
    allQuestion = [];
}
}
checkSubjectKey();

 
function insertQuestionFunc(sub,id,question,opOne,opTwo,opThree,opFour,corAns){
    if(sub != undefined && id != undefined){
       allQuestion[id]={
           question : question,
           optionOne :opOne,
              optionTwo : opTwo,
              optionThree : opThree,
              optionFour : opFour,
              correctAnswer : corAns
       }
       localStorage.setItem(ID+"_"+sub+"_question",JSON.stringify(allQuestion));
        swal( "Success!","Data updated successfully" ,"success");
    }
    else{
          if(chooseSubject.value != "choose subject"){
            allQuestion.push({
              question : allQuesInput[0].value,
              optionOne : allQuesInput[1].value,
              optionTwo : allQuesInput[2].value,
              optionThree : allQuesInput[3].value,
              optionFour : allQuesInput[4].value,
              correctAnswer : allQuesInput[5].value,
            });
            localStorage.setItem(ID+"_"+chooseSubject.value+"_question",JSON.stringify(allQuestion));
            swal( "Success!","Data inserted successfully" ,"success");
            questionForm.reset();
        }
        else{
              swal( "Choose Subject!","Please select a subject" ,"warning");
          }
    }
         
}

//start return(get) question from localStorage to show in "show-question" banner//
var newQuestions = [];
var visibelQuestion = document.querySelector(".visible-question");
selectSubject.addEventListener("change", () =>{
    if(localStorage.getItem(ID+"_"+selectSubject.value+"_question") != null){
        newQuestions = JSON.parse(localStorage.getItem(ID+"_"+selectSubject.value+"_question"));
       visibelQuestion.innerHTML = "";
        newQuestionsFunc();
    }
    else{
     visibelQuestion.innerHTML = "<b style='color:red'>No Data Availble !</b>"
    }
})

const newQuestionsFunc = ()=>{
newQuestions.forEach((question,index)=>{
    visibelQuestion.innerHTML += `
    <di class="mb-5" index=${index}>    
    <div class="d-flex align-items-center justify-content-between">
          <h3>${index+1}) ${question.question}</h3>
          <div class="icons">
              <i class="fa fa-edit edit-btn"></i>
              <i class="fa fa-save  d-none save-btn"></i>
              <i class="fa fa-trash del-btn"></i>
          </div>
      </div>
      <div class="change">
          <br>
          <span>1) ${question.optionOne}</span>
          <br><br>
          <span>2) ${question.optionTwo}</span>
          <br><br>
          <span>3) ${question.optionThree}</span>
          <br><br>
          <span>4) ${question.optionFour}</span>
          <br><br>
          <span class="correct">${question.correctAnswer}</span>
          <br><br>
      </div>
      </div>
    
    `;
});
// start delete coding from question field//
var allDellBtn = visibelQuestion.querySelectorAll(".del-btn");
var i,j;
for(i=0; i<allDellBtn.length; i++){
    allDellBtn[i].addEventListener("click",function(){
        var parent = this.parentElement.parentElement.parentElement;
        var index = parent.getAttribute("index");
         swal({
                title: "Are you sure?",
                text: "Once Deleted! You won't be able to revert this!",
                icon: "warning",
                buttons: true,
   dangerMode : true,
})
.then((willDeleted) => {
    if (willDeleted) {
        
        newQuestions.splice(index,1);
        localStorage.setItem(ID+"_"+selectSubject.value+"_question",JSON.stringify(newQuestions));
        parent.remove();
        parent.remove();
        updateSubject();
        swal( "Deleted!","Your Question has been deleted.", "success");
    }
    else{
        swal( "secure!","Your Question is secure.");
        
    }
});
    })
}

//start edit coding from update question field//
var editBtn = visibelQuestion.querySelectorAll(".edit-btn");
for(i=0; i<editBtn.length; i++){
    editBtn[i].addEventListener("click", (e) =>{
        var  parent = e.target.parentElement.parentElement.parentElement;
        var index = +parent.getAttribute("index");
        var savebtn = parent.querySelector(".save-btn");
        e.target.classList.add("d-none");
        savebtn.classList.remove("d-none");
        var h3= parent.querySelector("H3");
        var span = parent.querySelectorAll("SPAN");
        h3.contentEditable = true;
        h3.focus();
        for(j=0; j<span.length; j++){
            span[j].contentEditable = true;
            span[j].style.border = "1px solid red";
        }
        savebtn.addEventListener("click", function(){
            var subject = selectSubject.value;
            var question = h3.innerHTML.replace(`${index+1}) `,"");
            var opOne = span[0].innerHTML.replace("1) ","");
            var opTwo = span[1].innerHTML.replace("2) ","");
            var opThree = span[2].innerHTML.replace("3) ","");
            var opFour = span[3].innerHTML.replace("4) ","");
            var corAns = span[4].innerHTML;
             swal({
                title: "Are you sure?",
                text: "Once Updated! You won't be able to revert this!",
                icon: "warning",
                buttons: true,
   dangerMode : true,
})
.then((willUpdated) => {
    if (willUpdated) {
        insertQuestionFunc(subject,index,question,opOne,opTwo,opThree,opFour,corAns);
        editBtn[index].classList.remove("d-none");
        h3.contentEditable = false;
        savebtn.classList.add("d-none");
         for(j=0; j<span.length; j++){
            span[j].contentEditable = false;
            span[j].style.border = "none";
        }

    }
    else{
        swal( "secure!","Your subject is secure.");
        
    }
});           
        })
    })
}
}

//start registration coding//

var registrationForm = document.querySelector(".registration-form");
var allRegInput = registrationForm.querySelectorAll("INPUT");
var userType = registrationForm.querySelector("#choose-type");
var adress = registrationForm.querySelector("textarea");
var registrationDataEl = document.querySelector(".registrationData");
var registrationData = [];
 var uploadInput = document.querySelector(".upload-input");
  var profileBox = document.querySelector(".upload-box");
  var imageUrl;
 
registrationForm.addEventListener("submit", function(e){
    e.preventDefault();
    var checkData = checkEnrollment();
    if(checkData == "find"){
        swal( "Enrollment Duplicate","Please change the enrollment.", "warnign");
    }
    else{
        registrationFunc();
        getRegistrationDataFunc();

    }
})

//get data from localstorage
if(localStorage.getItem(ID+"_registrationData") != null){
    registrationData = JSON.parse(localStorage.getItem(ID+"_registrationData"));
}

function checkEnrollment(){
 var i = 0;
 var checkData ="";
 for(i=0;i<registrationData.length;i++){
    if(registrationData[i].enrollment == allRegInput[4].value){
        console.log(allRegInput[4]);
        checkData = "find";
        break;
    }
    else{
      checkData = "not found";
    }
 }
 return checkData;
}

 function registrationFunc(){
   if(userType.value != "choose type"){
    registrationData.push({
        name : allRegInput[0].value,
        fathername : allRegInput[1].value,
        dob : allRegInput[2].value,
        userType : userType.value,
        mobile : allRegInput[3].value,
        enrollment : allRegInput[4].value,
        password : allRegInput[5].value,
        adress : adress.value,
        profilePic : "../dashboard/assets/profile-2.jpg",
    });
    localStorage.setItem(ID+"_registrationData",JSON.stringify(registrationData));
    swal( "Data Inserted !","Data register successfully!", "success");
    registrationForm.reset();
   }
   else{
     swal( "Select Type!","First Select UserType!", "warning");
   }
 }

//end registration coding//

//get registration data show in uers and teachers data//

const getRegistrationDataFunc = () =>{
    registrationDataEl.innerHTML = "";
    registrationData.forEach((allData,index)=>{
        registrationDataEl.innerHTML += `
        
         <tr index="${index}">
             <th scope="row">${index+1}</th>
             <td>
                 <div class="profile">
                     <img src="${allData.profilePic}">
                 </div>
             </td>
             <td class="text-nowrap" style="width: 8rem;">${allData.name}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.fathername}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.dob}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.userType}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.mobile}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.enrollment}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.password}</td>
             <td class="text-nowrap" style="width: 8rem;">${allData.adress}</td>
             <td class="text-nowrap" style="width: 8rem;">
                 <i class="fa fa-trash del-btn mx-3 "></i>
                 <i class="fa fa-eye" id="edit" data-bs-toggle="modal" data-bs-target="#myModal"></i>
             </td>
             
         </tr>
        `; 
        
    });

    //start profile box//

    
     var Form = document.querySelector(".form");
     var allInput = Form.querySelectorAll("INPUT");
     var textarea = Form.querySelector("textarea");
     var EditButton = Form.querySelector(".edit");
     var UpdateButton = Form.querySelector(".update");

    //end profile box//

    //start view coding//

    var icon = document.querySelectorAll("#edit");
    var over = document.querySelector(".over");
    var close = document.querySelector("#close");
     var userName = document.querySelector(".user-data");
    var i,j;
    for(i=0; i<icon.length; i++){
        icon[i].addEventListener("click", function(){
            var parent = this.parentElement.parentElement;
            var index = parent.getAttribute("index");
            var td = parent.querySelectorAll("td");
            var imgUrl = td[0].querySelector("img").src;
            var name = td[1].innerHTML;
            userName.innerHTML = name;
            var fatherName = td[2].innerHTML;
            var dob = td[3].innerHTML;
            var userType = td[4].innerHTML;
            var mobile = td[5].innerHTML;
            var enrollment = td[6].innerHTML;
            var password = td[7].innerHTML;
            var adress = td[8].innerHTML;
            profileBox.style.backgroundImage = `url(${imgUrl})`;
            allInput[0].value = name;
            allInput[1].value = fatherName;
            allInput[2].value = dob;
            allInput[3].value = userType;
            allInput[4].value = mobile;
            allInput[5].value = enrollment;
            allInput[6].value = password;
            textarea.value = adress;
            for(i=0; i<allInput.length; i++){
                allInput[i].disabled= true;
            }
            textarea.disabled = true;
            uploadInput.disabled = true;
            Form.addEventListener("submit", function(e){
                e.preventDefault();
            })
            EditButton.addEventListener("click", function(){
                 for(i=0; i<allInput.length; i++){
                allInput[i].disabled= false;
            }
            textarea.disabled = false;
            uploadInput.disabled = false;
            UpdateButton.classList.remove("d-none");
            EditButton.classList.add("d-none");
            })
            over.classList.remove("d-none");
            UpdateButton.addEventListener("click", function(){
                var name = allInput[0].value;
                var fatherName = allInput[1].value;
                var dob = allInput[2].value;
                var userType = allInput[3].value;
                var mobile = allInput[4].value;
                var enrollment = allInput[5].value;
                var password = allInput[6].value;
                var adress = textarea.value;
                
               swal({
                title: "Are you sure?",
                text: "Once Updated! You won't be able to revert this!",
                icon: "warning",
                buttons: true,
   dangerMode : true,
})
.then((willUpdated) => {
    if (willUpdated) {
            registrationData[index] = {
                     name : name,
                     fathername : fatherName,
                     dob : dob,
                     userType : userType,
                     mobile : mobile,
                     enrollment : enrollment,
                     password : password,
                     adress :  adress,
                     profilePic : imageUrl == undefined ? imgUrl : imageUrl
                }
                localStorage.setItem(ID+"_registrationData",JSON.stringify(registrationData));
         getRegistrationDataFunc();
          this.classList.add("d-none");
        EditButton.classList.remove("d-none");
           for(i=0; i<allInput.length; i++){
                allInput[i].disabled= true;
            }
            textarea.disabled = true;
            uploadInput.disabled = true;
         
        swal( "Updated!","Your Data has been Updated.", "success");
    }
    else{
        swal( "secure!","Your data is secure.");
          this.classList.add("d-none");
        EditButton.classList.remove("d-none");
           for(i=0; i<allInput.length; i++){
                allInput[i].disabled= true;
            }
            textarea.disabled = true;
            uploadInput.disabled = true;
        
    }
});
            })
            var tl = gsap.timeline();
            tl.from(".over",{
                y:-700,
                duration:1,
                opacity:0,
                scale:0
            })
            tl.from(".over .dani",{
                scale:0,
                duration:1,
                opacity:0,
            })
        })
    }
    close.addEventListener("click", () =>{
        over.classList.add("d-none");
    })
    //end view coding//

    // start delete coding in registration form //
    var delBtn = registrationDataEl.querySelectorAll(".del-btn");
    for(i=0; i<delBtn.length; i++){
        delBtn[i].addEventListener("click", function(){
            var parent = this.parentElement.parentElement;
            var index = parent.getAttribute("index");
             swal({
                title: "Are you sure?",
                text: "Once Deleted! You won't be able to revert this!",
                icon: "warning",
                buttons: true,
   dangerMode : true,
})
.then((willDeleted) => {
    if (willDeleted) {
        registrationData.splice(index,1);
        localStorage.setItem(ID+"_registrationData",JSON.stringify(registrationData));
        parent.remove();
        getRegistrationDataFunc();
        swal( "Deleted!","User Data has been Deleted.", "success");
    }
    else{
        swal( "secure!","User Data has been saved.");
        
    }
});
        })
    }

}
getRegistrationDataFunc();

//read photo coding//

uploadInput.addEventListener("change", function(){
    var fReader = new FileReader();
    fReader.onload = function(e){
     imageUrl = e.target.result;
     profileBox.style.backgroundImage = `url(${imageUrl})`;
    }
    fReader.readAsDataURL(uploadInput.files[0]);
})

//end registration data show in uers and teachers data//

// start toggler button coding //
var togglerBtn = document.querySelectorAll(".toggler-icon");
var sideNave = document.querySelector(".side-nav");
togglerBtn[0].addEventListener("click", (e) =>{
    e.target.classList.add("d-none");
    sideNave.classList.add("active");
    togglerBtn[1].classList.remove("d-none");

     var tl = gsap.timeline();
    tl.from(".side-nav .profile-pic",{
        scale:0,
        opacity:0,
        duration:0.5
    })
    tl.from(".list-group .side-list",{
        x:-200,
        duration:0.5,
        opacity:0,
        stagger:0.15
        
    })
    tl.from(".side-nav button",{
        x:-200,
        duration:0.5,
    })  
})
togglerBtn[1].addEventListener("click", (e) =>{
    sideNave.classList.remove("active");
    e.target.classList.add("d-none");
    togglerBtn[0].classList.remove("d-none");
})
  
//start get result from database //
var allResult = [];
var allUserResultBox = document.querySelector(".subject-result-result");
subjectResultEl.addEventListener("change", function(){
    allUserResultBox.innerHTML = "";
    if(subjectResultEl.value != "choose subject"){
        if(localStorage.getItem(ID+"_"+subjectResultEl.value+"_result") != null){
           allResult = JSON.parse(localStorage.getItem(ID+"_"+subjectResultEl.value+"_result"));
           allResult.forEach((data,index)=>{
            allUserResultBox.innerHTML += `
                 <tr>
             <td class="text-nowrap" style="width: 8rem;">${index+1}</td>
             <td class="text-nowrap" style="width: 8rem;">${data.name}</td>
             <td class="text-nowrap" style="width: 8rem;">${data.enrollment}</td>
             <td class="text-nowrap" style="width: 8rem;">${data.subject}</td>
             <td class="text-nowrap" style="width: 8rem;">${data.rightAns}</td>
             <td class="text-nowrap" style="width: 8rem;">${data.wrongAns}</td>
             <td class="text-nowrap" style="width: 8rem;">${data.maxMarks}</td>
                                    </tr>
            `;
           })
        }
    }
    else{
         swal( "Select Subject","Please Select Subject First.", "warning");
    }
});

//start certificate coding//

let closeBtn = document.querySelector(".certificate-btn");
let certificateMain = document.querySelector(".certificate-main");
let certificateForm= document.querySelector(".get-result");
let certificateInput = certificateForm.querySelector("input");
let certificateAdress = certificateMain.querySelector(".adress");
let certificateEnrollment = certificateMain.querySelector(".Enrollment");
let certificateFather = certificateMain.querySelector(".father-name");
let certificateName = certificateMain.querySelector(".name");
let certificateData = certificateMain.querySelector(".result-data");
let pass = certificateMain.querySelector(".decide");
let grade = certificateMain.querySelector(".grade");
closeBtn.addEventListener("click", () =>{
    certificateMain.classList.remove("active");
    
})
certificateForm.addEventListener("submit", function(e){
    e.preventDefault();
    getUserResult();
    gsap.from(".certificate-main",{
        scale:0,
        duration:0.5,
        opacity:0
    })
})
function getUserResult(){
    if(certificateInput.value != ""){
        if(localStorage.getItem(ID+"_"+certificateInput.value+"_result") != null){
           var resultData = JSON.parse(localStorage.getItem(ID+"_"+certificateInput.value+"_result"));
         certificateMain.classList.add("active");  
         certificateAdress.innerHTML = allUserData.ADRESS;
         certificateName.innerHTML = resultData[0].name;
         certificateEnrollment.innerHTML = resultData[0].enrollment;
         certificateFather.innerHTML = resultData[0].fahtername;
         let maxMarks = 0;
         let mark =0;
         let total =0;
         resultData.forEach((data,index)=>{
            certificateData.innerHTML += `
            <tr>
                        <td>${index+1}</td>
                        <td>${data.subject}</td>
                        <td>${data.maxMarks}</td>
                        <td>${data.rightAns}</td>
                        <td>${data.rightAns}</td>
                    </tr>
            `;
            maxMarks += data.maxMarks;
            mark += data.rightAns;
            total += data.rightAns;
         });
          let finalResult = (total/maxMarks*100).toFixed(2);
            if(finalResult < 39.99){
              pass.innerHTML = "FAIL"
            }
            else{
             pass.innerHTML = "PASS";
            }
            
            if(finalResult <33.9){
             grade.innerHTML = "F";
            }
            else if(finalResult >40 && finalResult <60){
                grade.innerHTML = "C";
            }
            else if(finalResult > 60 && finalResult <80){
                grade.innerHTML = "B";
            }
            else if(finalResult > 80 && finalResult <90){
                grade.innerHTML = "A";
            }
            else if(finalResult > 90 && finalResult <100){
                grade.innerHTML = "A+";
            }
        }
        else{

            swal( "No Result Found!","There is no Result related enrollment.", "warning");
        }
    }
    else{
    swal( "Empty Field!","Please enter the enrollment first.", "warning");
    }
}
//end certificate coding//
