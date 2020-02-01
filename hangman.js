window.onload = function () {

    let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 2d array of words in lowercase by accadent will fix with toUpperCase later

    let categories = [
        ["nissan", "honda", "ford", "mazda", "lexus"],         //Cars
        ["apple", "orange", "banana", "grape", "watermellon"], //Fruit
        ["hippo", "monkey", "tiger", "giraffe", "cheetah"],    //Animals
        ["idaho", "texas", "tennessee", "georgia", "florida"]  //States
    ];
    
    let selectedCategory; //random selected array of words from categories
    let selectedWord;     //random selected word from the selected array
    let guess;            //current guess from buttons inner html
    let guessCount;       //guess count to compare to length off word
    let guessSpot;        //created li elements that contain "_" unguessed spots 
    let guessSpotCount    //counter for remaining "_" spots in the guessed word
    let guessSpots        //list of li buttons
    let build;            //query array of classes given to an svg image
    let buildCount = 0;   //count for building svg image
    let lives = 5;        //number off guess before loss

    let livesContainer = document.getElementById('text-container');        //container for win, lose, guess left text
    let categoryContainer = document.getElementById('category-container'); //hint container for category text
    let wordContainer = document.getElementById('word');                   //word container for displayed "_" and correct guesses


    // make buttons for game look into refactoring in to one double for loop
    let ButtonSetup = function () {

        //parent objects for the buttons
        gameButtons1 = document.getElementById('btn1')
        gameButtons2 = document.getElementById('btn2');
        
        //first 13 buttons
        for(let i = 0; i < alphabet.length; i++) {
            btn = document.createElement('button');
            btn.className = 'btn-letters';
            btn.innerHTML = alphabet[i];

            //add on click function 
            CheckGuess();

            //adding the newly created button to there parent elements
            if (i < alphabet.length / 2) {
                gameButtons1.appendChild(btn);
            } else {
                gameButtons2.appendChild(btn);
            }

            //set type to button so the page doesnt reload on click
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
        //here we set the onclick function of each button in the for loop
        btn.onclick = function () {
            guess = this.innerHTML;
            this.onclick = null;
            guessCount = 0;
            for(let i = 0; i < selectedWord.length; i++){
                if (selectedWord[i] === guess){

                    //replace "_" with letters
                    document.getElementsByClassName('guess-spot')[i].innerHTML = guess;

                    //green correct button style
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
            guessSpot = document.createElement('li');
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

        //logic for Win Condition
        guessSpots = document.querySelectorAll("li");
        guessSpotCount = 0;
        for(let i = 0; i < guessSpots.length; i++){
            if (guessSpots[i].innerHTML === "_"){
                guessSpotCount++;
            } 
        }

        //guessSpotCount > 0 aslong as a "_" still exists in the list
        if(guessSpotCount === 0){
            livesContainer.innerHTML = "You Win!";
            DisableButtons();
        } 
    }

    //disables button in the list so you can not continue to guess after win or loss
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