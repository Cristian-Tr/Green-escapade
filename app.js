document.addEventListener('DOMContentLoaded', function () {


    const image = document.querySelector(".productImage img");
    const optionsMode = document.querySelector(".options");
    const inputMode = document.querySelector(".input-mode");
    const options = document.querySelectorAll(".options .option");

    const mainModal = document.querySelector(".hint-modal");
    const closeModalBtn = mainModal.querySelector(".modal-body span");
    const modalHint = mainModal.querySelector(".modal-body .theHint");
    const hintText = modalHint.querySelector("p");
    const gameOver = mainModal.querySelector(".modal-body .gameover");

    const scoreDisplay = gameOver.querySelector("p");
    const progress = document.querySelector(".quest-num");

    const modeBtn = document.querySelector(".buttons .mode");
    const skipBtn = document.querySelector(".buttons .skip");

    const input = document.querySelector(".input-mode input");
    const submitBtn = document.querySelector(".input-mode button");
    const resetBtn = document.querySelector(".resetBtn");


    var index = 0;
    var score = 0;
    var mode = 0;

    var question = [{
        photo: "beciul domnesc rosu dulce.png",
        choices: ["Beciul Domnesc rosu dulce - cabernet sauvignon 12% recomandari: desert", "Grand Reserve rosu demisec - feteasca alba 14% recomandari: peste, desert", "Beciul Domnesc rosu sec - feteasca regala, pinot noir 14.5% carne, peste, desert", "Beciul Domnesc rosu demidulce - tamaioasa romaneasca 11.5% recomandari: carne"],
        hint: "B _ _ _ _ l D _ _ _ _ s _ - c _ _ _ _ _ _ t s _ _ v _ g _ _ _",
        answer: 0

    },
    {
        photo: "ciocarlia alb demisec.png",
        choices: ["Ciocarlia alb dulce - feteasca neagra 13.5% recomandari: gratar, desert", "Ciocarlia alb denidulce - feteasca neagra 14% recomandari: aperitiv. gratar", "Ciocarlia alb demisec - feteasca neagra 12% recomandari: aperitiv. gratar, peste, desert", "Ciocarlia alb sec - tamaioasa romaneasca 11% recomandari: aperitiv. desert"],
        hint: "_ i _ _ _ _ _ _ a - f _ _ _ _ _ _ a  _ e _ _ _ a",
        answer: 2

    },
    {
        photo: "comoara pivnitei rosu sec.png",
        choices: ["Comoara pivnitei rosu demisec - tamaioasa romaneasca 14.5% recomandari: carne", "Vinoteca rosu sec - feteasca neagra 17% recomandari: peste, fructe de mare", "Comoara pivnitei rosu dulce - feteasca alba 10.5% recomandari: aperitiv, desert", "Comoara pivnitei rosu sec - feteasca neagra 14.5% recomandari: carne, branza"],
        hint: "_ _ m _ _ _ a _ i _ _ _ _ _  e _ - m _ _ _ _ t",
        answer: 3

    },
    {
        photo: "egregio alb sec.png",
        choices: ["Beciul Domnesc alb demisec - merlot 12.5% recomandari: aperitiv, carne, peste", "Egregio alb sec - chardonnay 14.5% recomandari peste, fructe de mare, salate", "Egregio alb dulce - feteasca neagra 12% recomandari paste, peste, desert", "Grand Reserve alb demisec -  feteasca alba recomandari: salate, desert"],
        hint: "_ g _ _ _ i _ - _ h _ _ _ _ n _ _ _",
        answer: 1

    },
    {
        photo: "grand reserve alb sec.png",
        choices: ["Beciul Domnesc alb dulce - pinot noir 14% recomandari: aperitiv, desert", "Sceptrus alb dulce - feteasca neagra 13% recomandari: aperitiv, peste, paste, desert", "Grand Reserve rose demidulce - pinot noir 12.5% recomandari: aperitiv", "Grand Reserve alb sec - chardonnay 14.5% recomandari: carne, peste, salate"],
        hint: "_ _ a _ _  _ e _ _ r _ e - _ _ a _ _ _ _ _ _ y",
        answer: 3
    },
    {
        photo: "mirabilis machina alb sec.png",
        choices: ["Egregio alb sec - feteasca neagra 10.5% recomandari: aperitiv, carne, peste", "Mirabilis Machina alb sec - blanc de noir 13.5% recomandari: salate, crustacee", "Mirabilis Machina alb dulce - pinot noir 13% recomandari: aperitiv, desert", "Mirabilis Machina alb demidulce - feteasca alba 10% recomandari: crustacee, desert"],
        hint: "_ _ _ _ b _ _ _ _  _ _ c _ _ _ a - _ i _ _ _  _ _ i _",
        answer: 1
    },
    {
        photo: "proles pontica rosu demidulce.png",
        choices: ["Beciul Domnesc rosu sec - pinot noir 13% recomandari: carne, peste", "Proles Pontica rosu dulce - feteasca alba 15% recomandari: aperitiv, peste, desert", "Proles Pontica rosu demidulce - merlot, pinot noir 12% recomandari: friptura", "Sigillum Moldavie rosu sec - feteasca neagra 12.5% recomandari: gratar, peste"],
        hint: "_ r _ _ _ _  _ o _ _ _ _ _  - m _ _ _ _ t  p _ _ _ _  _ _ _ r",
        answer: 2

    },
    {
        photo: "rose verite rose sec.png",
        choices: ["Ciocarlia rose dulce - feteasca regala 12% recomandari: aperitiv, desert", "Rose verite rosu dulce - feteasca neagra 14% recomandari: aperitiv, desert", "Sigillum Moldavie rose dulce - feteasca alba 14.5% recomandari: branza, desert", "Rose verite rose sec - cabernet sauvignon 14.5% recomandari: branza, peste, risoto"],
        hint: "_ _ _ e  _ _ _ _ t _ - _ _ _ _ d _ _ n _ _",
        answer: 3
    },
    {
        photo: "sceptrus fume alb sec.png",
        choices: ["Sigillum Moldavie alb dulce - tamaioasa romaneasca 10.5% recomandari: aperitiv", "Sceptrus fume alb sec - chardonnay, sauvignon blanc 14.5% recomandari: carne", "Mirabilis Machina alb demisec - feteasca regala 13% recomandari: branza, salata", "Grand Reserve alb dulce - tamaioasa romaneasca 12% recomandari: aperitiv, risoto"],
        hint: "_ c _ _ _ _ _ s   _ u _ _  -  c _ _ _ _ _ _ _ ",
        answer: 1
    },
    {
        photo: "sigillum moldavie rosu demisec.png",
        choices: ["Proles Pontica rosu demidulce - merlot 12% recomandari: friptura, branza, aperitiv", "Grand Reserve rosu sec - pinot noir 14% recomandari: aperitiv, gratar, peste", "Sigillum Moldavie rosu demisec - feteasca neagra 13% recomandari: carne", "Sceptrus rosu dulce - pinot noir 12% recomandari: aperitiv, crustacee, desrt "],
        hint: "_ _ g _ _ _ u _  _ _ l _ _ _ _ e  -  _ e _ e _ _ _ _   _ e _ _ _ a",
        answer: 2

    }
    ];




    window.addEventListener("keypress", konami);
    options.forEach((element) => {
        element.addEventListener("click", check);
    });

    submitBtn.addEventListener("click", check);
    resetBtn.addEventListener("click", replay);

    modeBtn.addEventListener("click", switchMode);

    closeModalBtn.addEventListener("click", () => mainModal.style.display = "none");

    skipBtn.addEventListener("click", () => {
        if (index < question.length - 1) {
            index++;
            init();
        } else {
            displayScores();
        }
    });

    var randQuestion = shuffle(question.slice());

    function check() {
        let userInput;
        if (mode == 0) {
            userInput = this.textContent;
        } else {
            userInput = input.value.trim();
            input.value = "";
        }
        userInput === randQuestion[index].choices[randQuestion[index].answer] ? score++ : "";
        console.log(userInput);
        console.log(randQuestion[index].choices[randQuestion[index].answer]);
        if (index < question.length - 1) {
            index++;
            init();
        } else {
            displayScores();
        }

    }

    function switchMode() {
        if (mode == 0) {
            optionsMode.style.display = "none";
            inputMode.style.display = "block";
            modeBtn.innerText = "Options Mode";
            mode++;
        } else {
            inputMode.style.display = "none";
            optionsMode.style.display = "block";
            modeBtn.innerText = "Direct Mode";
            mode = 0;
        }
    }

    function replay() {
        score = 0;
        index = 0;
        mode = 0;
        modalHint.style.display = "block";
        gameOver.style.display = "none";
        mainModal.style.display = "none";
        init();
    }

    function displayScores() {
        scoreDisplay.innerText = `${score} /  ${question.length}`
        modalHint.style.display = "none";
        gameOver.style.display = "block";
        mainModal.style.display = "block";
    }

    function init() {
        progress.innerText = `${index + 1} / ${question.length}`;
        console.table(randQuestion);
        console.log(index);
        let randOptions = shuffle(randQuestion[index].choices.slice());
        image.src = randQuestion[index].photo;
        for (let i = 0; i < options.length; i++) {
            options[i].innerText = randOptions[i];
        }

        hintText.innerText = randQuestion[index].hint;
    }

    function shuffle(arr) {
        for (let i = 0; i < arr.length; i++) {
            let rand = Math.ceil(Math.random() * arr.length - 1);
            let temp = arr[i];
            arr[i] = arr[rand];
            arr[rand] = temp;
        }
        return arr;
    }

    let testWord = "test";
    let wordArr = [];

    function konami(e) {
        wordArr.push(e.key);
        if (wordArr.length > testWord.length) {
            wordArr.shift();
        }
        console.log(wordArr);
        if (wordArr.join("").toLowerCase() === testWord) {
            console.log("Succes");
            hintText.innerText = randQuestion[index].choices[randQuestion[index].answer];
        }
    }

    init();













});