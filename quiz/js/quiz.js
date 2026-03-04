
var subject = sessionStorage.getItem("subject");
var id = sessionStorage.getItem("ID");
var studentname = sessionStorage.getItem("name");
var fahtername = sessionStorage.getItem("fahterName");
var enrollment = sessionStorage.getItem("enrollment");
var adress = sessionStorage.getItem("address");
var allQuestion = [];
// start reading question from local storage//
if(localStorage.getItem(id+"_"+subject+"_question") != null){
       allQuestion = JSON.parse(localStorage.getItem(id+"_"+subject+"_question"));
       console.log(allQuestion);
}
let index = 0;
var right=0;
var wrong = 0;
var total = allQuestion.length;
var allUserResult=[];
var particularUserResult = [];
let questionEl = document.querySelector(".question-el");
let allOptionEL = document.querySelectorAll(".option");
let nextBtn = document.querySelector(".next-btn")
let mainBox = document.querySelector(".main");

// Timer Variables
var totalTime = 40; // Time per question
var timeLeft = totalTime;
var timerInterval;
var progressBar = document.querySelector(".progress-bar");
var timerText = document.querySelector(".timer-text");

// Start Timer Function
const startTimer = () => {
    timeLeft = totalTime;
    progressBar.style.width = "100%";
    timerText.innerText = timeLeft + "s";

    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.innerText = timeLeft + "s";
        progressBar.style.width = (timeLeft / totalTime) * 100 + "%";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(); // Auto move to the next question when time runs out
        }
    }, 1000);
};

const getQuestionFunc= ()=>{
    if(index == total){
        return endQuiz();
    }
    resetFunc();

    clearInterval(timerInterval); // Clear previous timer
    startTimer(); // Restart timer for new question


    let data = allQuestion[index];
    questionEl.innerHTML = `Q-${index+1}: ${data.question}`;
    allOptionEL[0].nextElementSibling.innerText = data.optionOne;
    allOptionEL[1].nextElementSibling.innerText = data.optionTwo;
    allOptionEL[2].nextElementSibling.innerText = data.optionThree;
    allOptionEL[3].nextElementSibling.innerText = data.optionFour;
}
getQuestionFunc();
nextBtn.addEventListener("click",()=>{
     let data = allQuestion[index];
    var ans = getAnswer();
    if(ans == data.correctAnswer
){
        right++;
    }
    else{
        wrong++;
    }
    index++;
    getQuestionFunc();
    return;
})

function getAnswer(){
    var answer;
    allOptionEL.forEach((input)=>{
        if(input.checked){
            answer = input.value;
        }
    });
    return answer;
}
function resetFunc(){
    allOptionEL.forEach((input)=>{
     input.checked = false;
    })
}

function endQuiz(){
   mainBox.innerHTML =`
   <h2>Click on submit button to complete the Quiz</h2>
   <div align="center">
   <button class="btn btn-primary quiz-submit-btn">Submit</button>
   </div>
   `;
if (localStorage.getItem(id+"_"+subject+"_result") != null){
       allUserResult = JSON.parse(localStorage.getItem(id+"_"+subject+"_result"));
}
if (localStorage.getItem(id+"_"+enrollment+"_result") != null){
       particularUserResult = JSON.parse(localStorage.getItem(id+"_"+enrollment+"_result"));
}
var submitBtn = document.querySelector(".quiz-submit-btn");
submitBtn.addEventListener("click", function(){
    allUserResultFunc();
    particularUserResultFunc();
    this.innerHTML = "Please Wait";
    this.disabled = true;
})
}

function allUserResultFunc(){
allUserResult.push({
   name : studentname,
   enrollment : enrollment,
   rightAns : right,
   wrongAns : wrong,
   subject : subject,
   maxMarks : total
});
localStorage.setItem(id+"_"+subject+"_result",JSON.stringify(allUserResult));
setTimeout(() => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("fahterName");
    sessionStorage.removeItem("ID");
    sessionStorage.removeItem("subject");
    window.location = "../student-login/login.html";
},2000);
}

const particularUserResultFunc = () =>{
    particularUserResult.push({
        name : studentname,
        fahtername: fahtername,
        enrollment : enrollment,
        subject : subject,
        rightAns : right,
        wrongAns : wrong,
        maxMarks : total
    });
    localStorage.setItem(id+"_"+enrollment+"_result", JSON.stringify(particularUserResult));
setTimeout(() => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("enrollment");
    sessionStorage.removeItem("fahterName");
    sessionStorage.removeItem("ID");
    sessionStorage.removeItem("subject");
    window.location = "../student-login/login.html";
},2000);
}