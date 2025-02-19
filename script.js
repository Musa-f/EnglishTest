let mcq;
let questionContainer = document.querySelector("div.question h1");
let options = document.querySelectorAll("button.option");

let url = window.location.href;
let type = "";

if(url.includes("expressions")){
    type = "expressions";
}else{
    type = "mots";
}

async function initializeMCQ() {
    mcq = new MCQ(type);
    await mcq.fetchQuestions();
}

async function throwQuestion() {
    await initializeMCQ();
    mcq.selectRandomQuestions();
    mcq.selectRandomResult();

    questionContainer.innerHTML = mcq.getQuestion();
    let optionsArray = Object.values(mcq.getOptions());

    options.forEach((option, index) => {
        option.innerHTML = optionsArray[index];
        option.classList.remove("correct", "incorrect"); 
        option.addEventListener("click", handleOptionClick);
    });
}

function handleOptionClick(event) {
    let selectedOption = event.target;
    let answer = document.querySelector("div.answer");

    if (selectedOption.textContent === mcq.getAnswer()) {
        selectedOption.classList.add("correct");
    } else {
        selectedOption.classList.add("incorrect");
        answer.innerHTML = "Réponse : " + mcq.getAnswer();
        setTimeout(() => {
            selectedOption.classList.remove("incorrect");
            answer.innerHTML = "";
        }, 2000); 
    }

    setTimeout(throwQuestion, 2000);
}

throwQuestion();
