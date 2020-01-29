window.onload = function () {

    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 2d array of words in lowercase
    let categories = [
        ["nissan", "honda", "ford", "mazda", "lexus"], //Cars
        ["apple", "orange", "banana", "grape", "watermellon"], //Fruit
        ["hippo", "monkey", "tiger", "giraffe", "cheetah"], //Animals
        ["idaho", "texas", "tennessee", "georgia", "florida"]  //States
    ];
    let selectedCategory;
    let selectedWord;
    let guess;    
    let build;
    let buildCount = 0;
    let lives = 5;
    let guessCount;

    let livesContainer = document.getElementById('text-container');
    let categoryContainer = document.getElementById('category-container');
    let wordContainer = document.getElementById('word');


    // make buttons for game
    let ButtonSetup = function () {
        gameButtons1 = document.getElementById('btn1')
        gameButtons2 = document.getElementById('btn2');
        
        //first 13 buttons
        for(let i = 0; i < alphabet.length / 2; i++) {
            btn = document.createElement('button');
            btn.className = 'btn-letters';
            btn.innerHTML = alphabet[i];

            //add on click function 
            CheckGuess();

            gameButtons1.appendChild(btn);
            btn.setAttribute("type", "button");
        }
        // last 13 buttons
        for(let i = 13; i < alphabet.length; i++) {
            btn = document.createElement('button');
            btn.className = 'btn-letters';
            btn.innerHTML = alphabet[i];

            //add on click function
            CheckGuess()

            gameButtons2.appendChild(btn);
            btn.setAttribute("type", "button");
        }
    }

    //Set chosen category text
    let SetCategoryText = function () {
        if(selectedCategory === categories[0]){
            categoryContainer.innerHTML = "The chosen category is Cars";
        }else if(selectedCategory === categories[1]){
            categoryContainer.innerHTML = "The chosen category is Fruit";
        }else if(selectedCategory === categories[2]){
            categoryContainer.innerHTML = "The chosen category is Animals";
        }else if(selectedCategory === categories[3]){
            categoryContainer.innerHTML = "The chosen category is States";
        }
    }

    let CheckGuess = function () {
        btn.onclick = function () {
            guess = this.innerHTML;
            this.onclick = null;
            guessCount = 0;
            for(let i = 0; i < selectedWord.length; i++){
                if (selectedWord[i] === guess){

                    //replace _ with letters
                    document.getElementsByClassName('guess-spot')[i].innerHTML = guess;

                    //green correct button
                    this.setAttribute('class', 'btn-letter-correct');
                    SetText();
                
                }

                //compares the length of the word
                //to the guess count
                if(selectedWord[i] != guess){
                    guessCount++;
                    if(guessCount === selectedWord.length){
                        //red wrong button
                        this.setAttribute('class', 'btn-letter-incorrect');

                        //decrease lives and update text
                        lives--;
                        SetText();

                        //Build gallows
                        BuildGallows();
                                                               
                    }
                }
            }
        }
    }

    //build word spaces for game
    let WordSetUp = function () {
        for(let i = 0; i < selectedWord.length; i++) {
            let guessSpot = document.createElement('li');
            guessSpot.setAttribute('class','guess-spot');
            guessSpot.innerHTML = "_";
            wordContainer.appendChild(guessSpot);
        }
    }

    //set text for live, game over, and win condition
    let SetText = function () {
        livesContainer.innerHTML = "You have " + lives + " tries left";
        if(lives < 1) {
            livesContainer.innerHTML = "You Lose, Try again";
            DisableButtons();
        }
        //TODO logic for Win Condition

    }

    let DisableButtons = function () {
        btns = document.querySelectorAll('button');

        for(let i = 0; i < btns.length; i++){
            btns[i].onclick = null;
        }
    }

    let BuildGallows = function () {
        buildCount++;
        build = document.querySelectorAll('.game-' + buildCount);

        //loop through multi elements with the same classname 
        //fix for showing multi svg parts with the same class name
        for(let i = 0; i < build.length; i++){
            build[i].style.display = 'block';
        } 
    }

    let Reset = function () {
        livesContainer.innerHTML = lives;


    }

    let PlayGame = function () {
        selectedCategory = categories[Math.floor(Math.random() * categories.length)];
        
        // here we use toUpperCase() so we can check them properly with the uppercase buttons we made
        selectedWord = selectedCategory[Math.floor(Math.random() * selectedCategory.length)].toUpperCase();

        console.log(selectedWord);
        ButtonSetup();
        WordSetUp();
        SetCategoryText();
        SetText();

    }

    PlayGame();
}