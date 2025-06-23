let QuestionIndex = 0;
let RightScore = 0;

const question = document.getElementById("Questions");
const options = document.getElementById("Options");

const questions = [
    {
        question: "Test 1",
        options: ["A<-","B","C","D"],
        answer: "A<-"
    },
    {
        question: "Test 2",
        options: ["A","B<-","C","D"],
        answer: "B<-"
    },
    {
        question: "Test 3",
        options: ["A","B","C<-","D"],
        answer: "C<-"
    }
];
function loadQuestion(){
    const q = questions[QuestionIndex];
    question.textContent = q.question;
    options.innerHTML = "";
    q.options.forEach(optionText => {
        const btn = document.createElement("button");
        btn.textContent = optionText;
        btn.classList.add("option");
        btn.onclick = () => check(optionText);
        options.appendChild(btn);
    })
}
function check(selected){  
    const correct = questions[QuestionIndex].answer;
    if (selected == correct){
        RightScore++;
    }
    QuestionIndex++;
    if(QuestionIndex < questions.length) {
        loadQuestion();
    } 
    else{
    question.textContent ="You got "+ RightScore +" question right out of "+questions.length
}
}
loadQuestion();