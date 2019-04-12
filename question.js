function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

Question.prototype.generateQuestion = function (sign) {

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    if (sign === "plus") {
        // question
        const a = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 100);

        this.question = a + " + " + b;

        // answers
        // correct one
        const ans1 = a + b;
        // + 1..10
        const ans2 = a + b + Math.floor(Math.random() * 10);
        // - 1..10
        const ans3 = a + b - Math.floor(Math.random() * 10);

        this.answers = [ans1, ans2, ans3];
        shuffle(this.answers);

        //correct
        this.correct = ans1;
    }
}

Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (let i = 0; i < this.answers.length; i++) {
        console.log((i + 1) + ": " + this.answers[i]);
    }
}

const question = new Question("", "", "");

question.generateQuestion("plus");
question.displayQuestion();
