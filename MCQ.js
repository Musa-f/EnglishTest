class MCQ {
    constructor(dataType) {
        this.dataType = dataType;
        this.question = "";
        this.answer = "";
        this.options = [];
        this.allQuestions = [];
        this.numberOfOptions = 4;
        this.totalCounter = 0;
        this.actualCounter = this.totalCounter;
    }

    getAllQuestions() {
        return this.allQuestions;
    }

    getOptions() {
        return this.options;
    }

    getQuestion(){
        return this.question;
    }

    getAnswer(){
        return this.answer;
    }

    async fetchQuestions() {
        try {
            const response = await fetch("./data.json");
            const data = await response.json();
            this.allQuestions = data[this.dataType];
            this.totalCounter = Object.keys(this.allQuestions).length;
            //console.log(this.totalCounter);
        } catch (err) {
            console.error("Failed to fetch questions:", err);
        }
    }

    selectRandomQuestions() {
        const allKeys = Object.keys(this.allQuestions);
        const selectedQuestions = {};
        const usedIndexes = new Set();

        while (Object.keys(selectedQuestions).length < this.numberOfOptions) {
            const randomIndex = Math.floor(Math.random() * allKeys.length);

            if (!usedIndexes.has(randomIndex)) {
                usedIndexes.add(randomIndex);
                const key = allKeys[randomIndex];
                selectedQuestions[key] = this.allQuestions[key];
            }
        }

        this.options = selectedQuestions;
    }

    selectRandomResult() {
        const optionKeys = Object.keys(this.options);
        const randomIndex = Math.floor(Math.random() * optionKeys.length);
        const randomKey = optionKeys[randomIndex];
        this.question = randomKey;
        this.answer = this.options[randomKey];
    }

    
}


/*
TODO:
- Faire une copie la liste initiale
- Faire une fonction qui gère cette liste
- A chaque fois que la question est lancée, cette même question est retirée de la copie de la liste
- le compteur est également incrémenté

*/