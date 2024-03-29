const createGameBoard = () => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return board;
};

let Gameboard = createGameBoard();

const cells = [...document.querySelectorAll(".cell")];
const resetBtn = document.querySelector(".reset-btn");
const ambientBtn = document.querySelector("#ambient-btn");
const header = document.querySelector("header");
const settings = document.querySelector(".settings-btn");
const turn = document.querySelector(".turn-message");
const message = document.querySelector(".message");
const turnMessage = document.querySelector(".turn-message");
const xIcons = document.getElementsByClassName("fa-x");
const OIcons = document.getElementsByClassName("fa-circle");
const footer = document.querySelector(".footer-link");
const form = document.querySelector("#form");
let gameMode = document.querySelector("#game-mode");
let playerOneNameInput = document.querySelector("#player-name-one");
let playerOneTokenInput = document.querySelector("#token-one");
let playerTwoNameInput = document.querySelector("#player-name-two");

function handleCellClick(e) {
  e.stopImmediatePropagation();
  let pos = e.target.id.charAt(5); // Only get the number of the id of the cell
  Gameboard.setCell(pos);
}

Gameboard.setCell = (pos) => {
  Game().getCurrentPlayer().token === "X" ? (token = "X") : (token = "O");
  Game().currentPlayer = Game().getCurrentPlayer();
  let tokenIsSet = false;
  if (Gameboard[pos] === "") {
    Gameboard[pos] = token;
    tokenIsSet = true;
    displayController().showsGameBoard();
    Gameboard.checkForWin(Game().getCurrentPlayer().token);

    if (
      Gameboard.checkForDraw() === false &&
      Gameboard.checkForWin(Game().getCurrentPlayer().token) === false
    ) {
      displayController().showsTie();
    }
    if (
      tokenIsSet &&
      Gameboard.checkForWin(Game().getCurrentPlayer().token) === false &&
      Gameboard.checkForDraw() === true
    ) {
      //If there is no tie or winner, change turn
      Game().switchPlayerTurn();
      displayController().showsTurn();
    }
    return tokenIsSet;
  } else {
    return;
  }
};

Gameboard.reset = () => {
  for (let i = 0; i < Gameboard.length; i++) {
    Gameboard[i] = "";
  }
  return true;
};

Gameboard.checkForWin = (token) => {
  if (
    (Gameboard[0] === token &&
      Gameboard[1] === token &&
      Gameboard[2] === token) ||
    (Gameboard[3] === token &&
      Gameboard[4] === token &&
      Gameboard[5] === token) ||
    (Gameboard[6] === token &&
      Gameboard[7] === token &&
      Gameboard[8] === token) ||
    (Gameboard[0] === token &&
      Gameboard[3] === token &&
      Gameboard[6] === token) ||
    (Gameboard[1] === token &&
      Gameboard[4] === token &&
      Gameboard[7] === token) ||
    (Gameboard[2] === token &&
      Gameboard[5] === token &&
      Gameboard[8] === token) ||
    (Gameboard[0] === token &&
      Gameboard[4] === token &&
      Gameboard[8] === token) ||
    (Gameboard[0] === token &&
      Gameboard[1] === token &&
      Gameboard[2] === token) ||
    (Gameboard[2] === token && Gameboard[4] === token && Gameboard[6] === token)
  ) {
    displayController().showsWinner();
    return true;
  } else {
    return false;
  }
};

Gameboard.checkForDraw = () => {
  // If there are no moves available it returns false otherwise it returns true
  for (let i = 0; i < Gameboard.length - 1; i++) {
    if (Gameboard.indexOf("") !== -1) {
      return true; // Movements are available
    } else {
      return false; //No moves available
    }
  }
};

const createPlayer = (name, token) => {
  return { name, token };
};

const displayController = () => {
  const showResetMessage = () => {
    document.querySelector(".turn-message").textContent =
      "Click on Reset or Settings for to play again!";
  };
  const startMessage = () => {
    document.querySelector(".turn-message").textContent =
      "Click on Settings for to play!";
  };
  const showsGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(`#cell-${[i]}`);

      if (Gameboard[i] === "X") {
        Gameboard[i] = `X`;
      }
      if (Gameboard[i] === "O") {
        Gameboard[i] = `O`;
      }
      cell.innerHTML = Gameboard[i];

      if (Gameboard[i] === "X") {
        cell.innerHTML = '<i class="fa-solid fa-x"></i>';
      }

      if (Gameboard[i] === "O") {
        cell.innerHTML = '<i class="fa-regular fa-circle"></i>';
      }
    }
  };

  const showsWinner = () => {
    message.textContent = `${Game().getCurrentPlayer().name} wins!`;
    displayController().showResetMessage();
    cells.forEach((cell) => cell.removeEventListener("click", handleCellClick)); // Stop listener on cells if there are winner
  };

  const showsTie = () => {
    const message = document.querySelector(".message");
    message.textContent = `The Game Was Tied`;
    displayController().startMessage();
  };

  const showsTurn = () => {
    let randomPos = Math.round(Math.random() * 8);
    if (
      Game().getCurrentPlayer().name === "Mr. Robot" &&
      Gameboard[randomPos] !== playerOne.token &&
      Gameboard[randomPos] === "" &&
      Gameboard[randomPos] !== playerTwo.token
    ) {
      Gameboard[randomPos] = playerTwo.token;
      Game().switchPlayerTurn();
      displayController().showsGameBoard();
      Gameboard.checkForWin(playerTwo.token);
      if (
        Gameboard.checkForDraw() === false &&
        Gameboard.checkForWin(playerTwo.token) === false
      ) {
        displayController().showsTie();
      }

      if (Gameboard.checkForWin(playerTwo.token) === true && Gameboard.checkForDraw() === true) {
        message.textContent = `${playerTwo.name} Wins!`;
        return;
      }
    } else {
      turnMessage.textContent = `${
        Game().getCurrentPlayer().name
      }'s turn with token "${Game().getCurrentPlayer().token}" `;
    }
    if (Gameboard[randomPos] !== "") {
      showsTurn(); // Recursive call
    }
    return randomPos;
  };

  const toggleTheme = () => {
    ambientBtn.addEventListener("click", () => {
      ambientBtn.className === "fa fa-sun"
        ? (ambientBtn.classList = "fa fa-moon")
        : (ambientBtn.classList = "fa fa-sun");
      document.body.classList.toggle("dark");
      header.classList.toggle("header-dark");
      settings.classList.toggle("btn-dark");
      resetBtn.classList.toggle("btn-dark");
      turn.classList.toggle("turn-dark");
      message.classList.toggle("message-dark");
      footer.classList.toggle("footer-dark");
    });
  };

  const toggleDialog = () => {
    const closeBtn = document.querySelector("#closeBtn");
    const settingsDialog = document.querySelector("#settingsDialog");
    const settingsBtn = document.querySelector(".settings-btn");
    settingsBtn.addEventListener("click", () => {
      settingsDialog.showModal();
      turnMessage.textContent = "";
      gameMode.value = "";
      playerOneNameInput.value = "";
      playerOneTokenInput.value = "";
      playerTwoNameInput.value = "";
      Game().currentPlayer = {};
      Gameboard.reset();
      displayController().cleanMessage();
      displayController().showsGameBoard();
    });
    closeBtn.addEventListener("click", () => {
      settingsDialog.close();
    });
  };
  const togglePlayerTwoOptions = () => {
    const gameMode = document.querySelector("#game-mode");
    gameMode.addEventListener("change", () => {
      if (gameMode.value === "player-machine") {
        document.querySelector("#machine-group").style.visibility = "hidden";
        document.querySelector("#player-name-two").removeAttribute("required");
      } else {
        document.querySelector("#player-name-two").setAttribute("required", "");
        document.querySelector("#machine-group").style.visibility = "visible";
      }
    });
  };
  const cleanMessage = () => {
    message.textContent = "";
  };

  const resetDisplay = () => {
    resetBtn.addEventListener("click", () => {
      Gameboard.reset();
      displayController().showsGameBoard();
      displayController().showsTurn();
      displayController().cleanMessage();
    });
  };

  return {
    startMessage,
    showsGameBoard,
    showsWinner,
    showsTurn,
    showsTie,
    toggleTheme,
    toggleDialog,
    togglePlayerTwoOptions,
    showResetMessage,
    cleanMessage,
    resetDisplay,
  };
};

let playerOne = {};
let playerTwo = {};
let currentPlayer = {};
let players = [];

const Game = () => {
  form.addEventListener("submit", (e) => {
    e.stopImmediatePropagation();
    if (gameMode.value === "player-player") {
      playerOne = createPlayer(
        playerOneNameInput.value,
        playerOneTokenInput.value
      );
      playerTwo = createPlayer(
        playerTwoNameInput.value,
        playerOne.token === "X" ? "O" : "X"
      );

      players = [playerOne, playerTwo];
      currentPlayer = players[0];
      displayController().showsTurn();
      return currentPlayer;
    }
    if (gameMode.value === "player-machine") {
      playerOne = createPlayer(
        playerOneNameInput.value,
        playerOneTokenInput.value
      );
      playerTwo = createPlayer(
        "Mr. Robot",
        playerOne.token === "X" ? "O" : "X"
      );

      players = [playerOne, playerTwo];
      currentPlayer = players[0];
      displayController().showsTurn();
      return currentPlayer;
    }
  });
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  const getCurrentPlayer = () => Game().currentPlayer;

  if (gameMode.value !== "") {
    resetBtn.removeAttribute("disabled"); // Enabled reset button
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick)); // Add click listener to the cells
  } else {
    resetBtn.setAttribute("disabled", ""); // Disabled reset button
  }

  return { switchPlayerTurn, getCurrentPlayer, currentPlayer };
};

(() => {
  displayController().toggleTheme();
  displayController().toggleDialog();
  displayController().togglePlayerTwoOptions();
  displayController().startMessage();
  Game();
  displayController().resetDisplay();
})();
