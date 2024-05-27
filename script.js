let mcq;

async function initializeMCQ() {
    mcq = new MCQ("words");
    await mcq.fetchQuestions();
}

async function throwQuestion() {
    await initializeMCQ();
    mcq.selectRandomQuestions();
    mcq.selectRandomResult();

    let quizContainer = document.querySelector("div.quiz-container");
    let options = quizContainer.querySelectorAll("button[data-option]");

    let optionsArray = Object.values(mcq.getOptions());

    options.forEach((option, index) => {
        option.innerHTML = optionsArray[index];
    });

    console.log(options);
}

throwQuestion();
