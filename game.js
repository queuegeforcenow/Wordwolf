// game.js

let roles = [];
let words = ['さくらんぼ', 'りんご', 'いちご', 'ぶどう']; // 言葉のリスト
let players = [];
let currentWord = '';
let currentRole = '';
let gameStarted = false;
let round = 0;
let currentPlayerIndex = 0;
let totalPlayers = 5; // 初期プレイヤー数

const wordDisplay = document.getElementById('word-display');
const roleDisplay = document.getElementById('role-display');
const messageDisplay = document.getElementById('message');
const startButton = document.getElementById('start-button');
const guessButton = document.getElementById('guess-button');
const nextRoundButton = document.getElementById('next-round-button');
const resetButton = document.getElementById('reset-button');
const roundDisplay = document.getElementById('round');
const setPlayerCountButton = document.getElementById('set-player-count');
const playerCountInput = document.getElementById('player-count');
const gameInfoSection = document.getElementById('game-info');
const roleInfoSection = document.getElementById('role-info');
const gameControls = document.getElementById('game-controls');

// プレイヤー人数を設定
setPlayerCountButton.addEventListener('click', function() {
    totalPlayers = parseInt(playerCountInput.value);
    if (totalPlayers >= 4 && totalPlayers <= 10) {
        roles = generateRoles(totalPlayers);
        setPlayerCountButton.style.display = 'none';
        gameInfoSection.style.display = 'block';
        startButton.style.display = 'inline-block';
    } else {
        alert('4人以上10人以下で人数を設定してください');
    }
});

// ゲームの開始
startButton.addEventListener('click', startGame);
nextRoundButton.addEventListener('click', nextRound);
resetButton.addEventListener('click', resetGame);
guessButton.addEventListener('click', guess);

function generateRoles(playerCount) {
    // 役職を決定（ウルフは2人以上、残りは村人）
    let wolvesCount = Math.max(2, Math.floor(playerCount / 3)); // 最低でも2人ウルフ
    let villagersCount = playerCount - wolvesCount;
    let rolesArray = Array(wolvesCount).fill('狼').concat(Array(villagersCount).fill('村人'));
    return shuffle(rolesArray);
}

function startGame() {
    gameStarted = true;
    round = 1;
    players = roles.slice(0, totalPlayers); // 役職をシャッフル
    currentPlayerIndex = 0;
    updateUI();
}

function nextRound() {
    currentPlayerIndex++;
    if (currentPlayerIndex < totalPlayers) {
        round++;
        currentWord = words[Math.floor(Math.random() * words.length)];
        currentRole = players[currentPlayerIndex];
        updateUI();
    } else {
        endGame();
    }
}

function guess() {
    if (currentRole === '狼') {
        messageDisplay.textContent = 'あなたは狼です！他のプレイヤーを騙してください。';
    } else {
        messageDisplay.textContent = 'あなたは村人です。狼を見つけましょう！';
    }

    // 次のラウンドへ
    nextRoundButton.style.display = 'inline-block';
    guessButton.style.display = 'none';
}

function updateUI() {
    roundDisplay.querySelector('span').textContent = round;
    wordDisplay.textContent = currentWord;
    roleDisplay.textContent = currentRole;
    messageDisplay.textContent = `プレイヤー${currentPlayerIndex + 1}のターンです。`;

    if (round > 1) {
        guessButton.style.display = 'inline-block';
    }

    if (round === totalPlayers) {
        startButton.style.display = 'none';
        nextRoundButton.style.display = 'none';
    }
}

function endGame() {
    let wolvesCount = players.filter(role => role === '狼').length;
    let villagersCount = players.filter(role => role === '村人').length;

    if (villagersCount === wolvesCount + 1) {
        messageDisplay.textContent = 'ウルフの勝利！';
    } else {
        messageDisplay.textContent = '村人の勝利！';
    }

    nextRoundButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
}

function resetGame() {
    players = [];
    currentWord = '';
    currentRole = '';
    round = 0;
    currentPlayerIndex = 0;
    gameStarted = false;
    updateUI();
    setPlayerCountButton.style.display = 'inline-block';
    gameInfoSection.style.display = 'none';
    startButton.style.display = 'none';
    resetButton.style.display = 'none';
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex, tempValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}
