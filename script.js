const board = document.getElementById('board');
const playerHeartScore = document.getElementById('playerHeart');
const playerSmileyScore = document.getElementById('playerSmiley');
const drawScore = document.getElementById('draw');
const notification = document.getElementById('notification');
let currentPlayer = 'heart';
let gameOver = false;
let scoreHeart = 0;
let scoreSmiley = 0;
let scoreDraw = 0;

// create board cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

// Handle cell click event
function handleCellClick(event) {
  if (gameOver) return;

  const clickedCell = event.target;
  const index = clickedCell.dataset.index;

  if (isCellEmpty(index)) {
    // Mark the cell with the symbol of the current player
    clickedCell.classList.add(currentPlayer);

    // Check if there is a winner
    if (checkWinner()) {
      const winner = currentPlayer === 'heart' ? 'Heart' : 'Smiley';
      showNotification(`¡Player ${winner} has won!`);
      updateScore();
      resetGame();
      return;
    }

    // Switch to next player
    currentPlayer = currentPlayer === 'heart' ? 'smiley' : 'heart';

    // Check if there is a tie
    if (isBoardFull()) {
      showNotification('¡Tie!');
      updateDrawScore();
      resetGame();
      return;
    }
  }
}

// Function to display notification
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = 'block';

  // Hide notification after 2 seconds
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000);
}

// Check if cell is empty
function isCellEmpty(index) {
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  return !cell.classList.contains('heart') && !cell.classList.contains('smiley');
}

// check for winning combination
function checkWinner() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const cells = document.querySelectorAll('.cell');
    if (cells[a].classList.contains(currentPlayer) && cells[b].classList.contains(currentPlayer) && cells[c].classList.contains(currentPlayer)) {
      return true;
    }
  }

  return false;
}

// Check if board is full
function isBoardFull() {
  const cells = document.querySelectorAll('.cell');
  for (const cell of cells) {
    if (!cell.classList.contains('heart') && !cell.classList.contains('smiley')) {
      return false;
    }
  }
  return true;
}

// Function to update score
function updateScore() {
  if (currentPlayer === 'heart') {
    scoreHeart++;
    playerHeartScore.textContent = `Player 1 \u2764\uFE0F: ${scoreHeart}`;
  } else {
    scoreSmiley++;
    playerSmileyScore.textContent = `Player 2 \u{1F604}: ${scoreSmiley}`;
  }
}

// Function to update draw score
function updateDrawScore() {
  scoreDraw++;
  drawScore.textContent = `Tie: ${scoreDraw}`;
}

function resetGame() {
  // Clear cell contents
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('heart', 'smiley');
  });

  // Reset variables
  currentPlayer = 'heart';
  gameOver = false;
}