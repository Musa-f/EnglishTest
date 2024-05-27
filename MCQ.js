class MCQ {
    constructor(dataType) {
        this.dataType = dataType;
        this.question = "";
        this.answer = "";
        this.options = [];
        this.allQuestions = [];
        this.numberOfOptions = 4;
    }

    async fetchQuestions() {
        try {
            const response = await fetch("./data.json");
            const data = await response.json();
            this.allQuestions = data[this.dataType];
        } catch (err) {
            console.error("Failed to fetch questions:", err);
        }
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


    selectRandomQuestions() {
        const allKeys = Object.keys(this.allQuestions);
        const selectedQuestions = {};
        const usedIndexes = new Set();

        if (allKeys.length < this.numberOfOptions) {
            console.error("Not enough questions to select from.");
            return;
        }

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


