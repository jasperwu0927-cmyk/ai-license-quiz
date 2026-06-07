const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progress = document.getElementById("progress");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const scoreText = document.getElementById("score-text");
const passText = document.getElementById("pass-text");
const certificate = document.getElementById("certificate");
const reviewContainer = document.getElementById("review-container");

let selectedQuestions = [];
let currentQuestion = 0;
let userAnswers = [];

startBtn.addEventListener("click", startQuiz);

function startQuiz(){
  selectedQuestions = shuffleArray(questions).slice(0,50);
  userAnswers = new Array(selectedQuestions.length).fill(null);

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion();
}

function loadQuestion(){
  const q = selectedQuestions[currentQuestion];

  questionText.innerText = q.question;

  progress.innerText =
    `第 ${currentQuestion + 1} 題 / ${selectedQuestions.length} 題`;

  answersContainer.innerHTML = "";

  q.options.forEach((option,index)=>{
    const btn = document.createElement("button");

    btn.classList.add("answer-btn");

    if(userAnswers[currentQuestion] === index){
      btn.classList.add("selected");
    }

    btn.innerText = option;

    btn.onclick = ()=>{
      userAnswers[currentQuestion] = index;
      loadQuestion();
    };

    answersContainer.appendChild(btn);
  });
}

nextBtn.addEventListener("click",()=>{
  if(currentQuestion < selectedQuestions.length -1){
    currentQuestion++;
    loadQuestion();
  }
});

prevBtn.addEventListener("click",()=>{
  if(currentQuestion > 0){
    currentQuestion--;
    loadQuestion();
  }
});

submitBtn.addEventListener("click", showResult);

function showResult(){
  let score = 0;

  reviewContainer.innerHTML = "";

  selectedQuestions.forEach((q,index)=>{
    if(userAnswers[index] === q.answer){
      score += 2;
    }

    const review = document.createElement("div");

    review.classList.add("review-item");

    review.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>

      <p class="${userAnswers[index] === q.answer ? "correct":"wrong"}">
      你的答案：
      ${userAnswers[index] !== null
        ? q.options[userAnswers[index]]
        : "未作答"}
      </p>

      <p class="correct">
      正確答案： ${q.options[q.answer]}
      </p>
    `;

    reviewContainer.appendChild(review);
  });

  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.innerText = `你的分數：${score} 分`;

  if(score >= 80){
    passText.innerText = "✅ 通過";
    passText.style.color = "green";
    certificate.classList.remove("hidden");
  }else{
    passText.innerText = "❌ 未通過";
    passText.style.color = "red";
  }
}

function shuffleArray(array){
  return [...array].sort(()=>Math.random()-0.5);
}
