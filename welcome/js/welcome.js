// all global variable//
var selectSubjectEl = document.querySelector("#select-subject-el");
var ID = (sessionStorage.getItem("ID"));
var startQuizBtn = document.querySelector(".start-quiz-btn");
var allSubject = [];

//reading subject from local storage //

if(localStorage.getItem(ID+"_allSubject") != null){
    allSubject = JSON.parse(localStorage.getItem(ID+"_allSubject"));
    allSubject.forEach((subject,index)=> {
        selectSubjectEl.innerHTML += `
        <option>${subject.subjectName}</option>
        `;
    });
}

startQuizBtn.addEventListener("click", function(){
    if(selectSubjectEl.value != "choose subject"){
        var subject = selectSubjectEl.value;
        sessionStorage.setItem("subject",subject);
    window.location = "../quiz/quiz.html";
}
else{
    swal("Select Subject" , "Please select the subject!" , "warning");
}
})