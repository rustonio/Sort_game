const addFieldButton = document.querySelector('.add_field_button');
const removeFieldButton = document.querySelector('.remove_field_button');
const startGameButton = document.querySelector('.start_game_button');
const allButtons = document.querySelectorAll('.game_button');
const scoreDisplay = document.querySelector('.score_counter');
const defeatsCounterDisplay = document.querySelector('.defeats_counter');
const winsCounterDisplay = document.querySelector('.wins_counter');
const gameList = document.querySelector('.game_list');
const randomNumberDisplay = document.querySelector('.number_generator');
const gameResultContainer = document.querySelector('.game_result');
const resultText = document.querySelector('.result_text');

let fields_count;
let isGameStarted = false;
let score = 0, winsCounter = 0, defeatsCounter = 0;

addFieldButton.addEventListener('click',addField);
removeFieldButton.addEventListener('click',removeField);
startGameButton.addEventListener('click', startGame);
document.querySelector('h1').addEventListener('click', toggleDescription);
document.querySelector('.overlay').addEventListener('click', toggleDescription);
document.querySelectorAll('.list_element').forEach((list_element) => {
    list_element.addEventListener('click',addNumberToList);
});

//add another field to the list
function addField() {
    if (document.getElementsByClassName('list_element').length>=20) return;

    const li = document.createElement('li');
    const listElement = document.createElement('div');

    listElement.classList.add('list_element');
    listElement.addEventListener('click', addNumberToList);

    li.appendChild(listElement);

    gameList.appendChild(li);
}

//remove last field from list
function removeField() {
    if(document.getElementsByClassName('list_element').length<=3) return;

    const lastListElement = gameList.lastElementChild;

    gameList.removeChild(lastListElement);
}

//clear your last result and numbers from fields when another game starts
function clearResult() {
    resultText.innerHTML = '';

    gameResultContainer.classList.remove('win','lose');

    document.querySelectorAll('.list_element').forEach((list_element) => {
        list_element.classList.remove('contain_number') ;

        list_element.innerHTML = '';
    });
}

//disable all buttons and generate first number
function startGame() {
    const _fields_count = document.getElementsByClassName('list_element').length;
    if (_fields_count<3 || _fields_count>20) return;

    clearResult();

    allButtons.forEach((button) => {
        button.disabled = true;
    });

    fields_count = document.querySelectorAll('.list_element').length;

    isGameStarted = true;

    displayNewNumber();
}

//enable all buttons and clear number generator
function endGame() {
    allButtons.forEach((button) => {
        button.disabled = false;
    });

    isGameStarted = false;

    randomNumberDisplay.innerHTML = '';
}

//return random value between 1 and 100 (inclusive)
function generateNewNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

//add element with random number in the lower window
function displayNewNumber() {
    const random_number_container = document.createElement('p');
    
    random_number_container.classList.add('random_number');
    random_number_container.innerHTML = generateNewNumber();
    
    randomNumberDisplay.appendChild(random_number_container);
}

//goes through all the numbers and compares each number with the next
/* 1. 2 ; 2.56 ; 3.99 -> true
   1. 45 ; 2. 90 ; 3. 87 -> false
   1. 24 ; 2. 10 ; 3. 62 -> false */
function checkWin() {
    const allNumbers = document.querySelectorAll('.random_number');

    for (let i=0; i<allNumbers.length-1;i++) {

        let prevNum = parseInt(allNumbers[i].innerHTML);
        let nextNum = parseInt(allNumbers[i+1].innerHTML);

        if (!(nextNum > prevNum)) {
            return false;
        }
    }

    return  true;
}

//moves number container to the list element which was clicked
function addNumberToList(e) {
    if (e.currentTarget.classList.contains('contain_number') || !isGameStarted) return;

    const random_number_container = document.querySelector('.number_generator').firstElementChild;
    
    e.currentTarget.appendChild(random_number_container);
    e.currentTarget.classList.add('contain_number');

    // if all list elements contains number
    if (document.querySelectorAll('.list_element').length ===
    document.querySelectorAll('.contain_number').length) showResult();

    // continue game after moving previous element
    if (isGameStarted) displayNewNumber();
}

// change your score,wins and defeats counter and show your result text(win or lose);
function showResult() {
    const isWin = checkWin();

    if (isWin) {
        gameResultContainer.classList.add('win');
        resultText.innerHTML = 'YOU WIN';

        score += fields_count ** 2;
        winsCounter++;
    } else {
        gameResultContainer.classList.add('lose');
        resultText.innerHTML = 'YOU LOSE';

        score -= fields_count;
        defeatsCounter++;
    }
    scoreDisplay.innerHTML = `Score: ${score}`;
    winsCounterDisplay.innerHTML = `Wins: ${winsCounter}`;
    defeatsCounterDisplay.innerHTML = `Defeats: ${defeatsCounter}`;
    endGame();
}

//show/hide overlay with game description
function toggleDescription() {
    document.querySelector('.overlay').classList.toggle('hidden');
    document.querySelector('.description').classList.toggle('hidden');
}