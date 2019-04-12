
/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function () {

    function chooseQuestionType() {
        const type = prompt("Please choose questions type: plus, minus, divide, multiply");
        if (type === "plus" || type === "minus" || type === "divide" || type === "multiply") {
            return type;
        } else {
            console.log("Please choose correct!");

            return chooseQuestionType();
        }
    }

    const questionType = chooseQuestionType();

    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.generateQuestion = function (sign) {

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }

        function getBigger(a, b) {
            if (a >= b) {
                return a;
            } else { return b; }
        }

        function getLesser(a, b) {
            if (a >= b) {
                return b;
            } else { return a; }
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
            const ans2 = a + b + 1 + Math.floor(Math.random() * 10);
            // - 1..10
            const ans3 = a + b - 1 - Math.floor(Math.random() * 10);

            this.answers = [ans1, ans2, ans3];
            shuffle(this.answers);

            //correct
            this.correct = this.answers.indexOf(ans1);

        } else if (sign === "minus") {
            // question
            const a = Math.floor(Math.random() * 100);
            const b = Math.floor(Math.random() * 100);

            this.question = getBigger(a, b) + " - " + getLesser(a, b);

            // answers
            const ans = getBigger(a, b) - getLesser(a, b);
            // correct one
            const ans1 = ans;
            // + 1..10
            const ans2 = ans + 1 + Math.floor(Math.random() * 10);
            // - 1..10
            const ans3 = ans - 1 - Math.floor(Math.random() * 10);


            this.answers = [ans1, ans2, ans3];
            shuffle(this.answers);

            //correct
            this.correct = this.answers.indexOf(ans1);
        }
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (let i = 0; i < this.answers.length; i++) {
            console.log((i + 1) + ": " + this.answers[i]);
        }
    }

    function score() {
        let sc = 0;
        return function (correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    const keepScore = score();

    Question.prototype.checkAnswer = function (ans, callback) {
        let sc;
        if (ans === this.correct) {
            console.log("Correct answer!");
            sc = callback(true);
        } else {
            console.log("Wrong answer!");
            sc = callback(false);
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function (score) {
        console.log("Your current score is: " + score);
        console.log("------------------------------");
    }

    function nextQuestion() {

        const question = new Question("", "", "");

        question.generateQuestion(questionType);
        console.log(question);

        question.displayQuestion();

        const answer = prompt("Choose your answer.");

        if (answer !== "exit") {
            question.checkAnswer(parseInt(answer) - 1, keepScore);
            nextQuestion();
        }
    }

    nextQuestion();
})();