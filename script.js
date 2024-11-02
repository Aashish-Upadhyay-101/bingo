document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const resetButton = document.getElementById("resetButton");

  let boardState = Array(99).fill(false);

  function createBoard() {
    board.innerHTML = "";
    for (let i = 1; i <= boardState.length; i++) {
      const numberButton = document.createElement("button");
      numberButton.className = "number";
      numberButton.textContent = i;
      numberButton.addEventListener("click", () => toggleNumber(i - 1));
      board.appendChild(numberButton);
    }
    updateBoardDisplay();
  }

  function toggleNumber(index) {
    console.log(index);
    boardState[index] = !boardState[index];
    updateBoardDisplay();
    saveBoardState();
  }

  function updateBoardDisplay() {
    const numbers = board.getElementsByClassName("number");
    for (let i = 1; i <= numbers.length; i++) {
      numbers[i - 1].classList.toggle("marked", boardState[i - 1]);
      numbers[i - 1].textContent = i;
    }
  }

  function resetBoard() {
    boardState = Array(99).fill(false);
    updateBoardDisplay();
    saveBoardState();
  }

  function saveBoardState() {
    localStorage.setItem("tambolaBoardState", JSON.stringify(boardState));
  }

  function loadBoardState() {
    const savedState = localStorage.getItem("tambolaBoardState");
    if (savedState) {
      boardState = JSON.parse(savedState);
    }
  }

  resetButton.addEventListener("click", resetBoard);

  loadBoardState();
  createBoard();
});
