const gameBoard = document.getElementById("gameBoard");
const messageElement = document.getElementById("message"); 
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function createBoard() {
  gameBoard.innerHTML = "";  
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.addEventListener("click", handleCellClick);
    cellElement.textContent = cell;

    if (cell === "X") {
      cellElement.classList.add("x");
    } else if (cell === "O") {
      cellElement.classList.add("o");
    }

    gameBoard.appendChild(cellElement);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] === '' && !gameOver) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (currentPlayer === 'X') {
      event.target.classList.add("x");
    } else {
      event.target.classList.add("o");
    }

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (!gameOver) {
      messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      messageElement.textContent = `Player ${board[a]} Wins!`;

      document.querySelector(`[data-index='${a}']`).classList.add("winning");
      document.querySelector(`[data-index='${b}']`).classList.add("winning");
      document.querySelector(`[data-index='${c}']`).classList.add("winning");

      gameOver = true;
      return;
    }
  }

  if (!board.includes('')) {
    messageElement.textContent = "It's a tie!";
    gameOver = true;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  messageElement.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

resetGame();
