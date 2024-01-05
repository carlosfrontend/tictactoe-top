const createGameBoard = () => {
  const board = ["O", "O", "X", "O", "X", "O", "X", "O", "X"];
  return board;
};

const Gameboard = createGameBoard();

Gameboard.setCell = (pos) => {
  Game().getCurrentPlayer().token === "X" ? (token = "X") : (token = "O");
  Game().currentPlayer = Game().getCurrentPlayer();
  let tokenIsSet = false;
  if (Gameboard[pos] === "") {
    Gameboard[pos] = token;
    tokenIsSet = true;
    displayController().showsMovements(pos);
    Gameboard.checkForWin(Game().getCurrentPlayer().token);
    if (
      Gameboard.checkForDraw() === false &&
      Gameboard.checkForWin(Game().getCurrentPlayer().token) === false
    ) {
      displayController().showsTie();
      Gameboard.reset();
      displayController().showsGameBoard();
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
    displayController().showsOccupiedPosition(pos);
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
    Gameboard.reset();
    displayController().showsGameBoard();
    return true;
  } else {
    return false;
  }
};

Gameboard.checkForDraw = () => {
  // If there are no moves available it returns false otherwise it returns true
  for (let i = 0; i < Gameboard.length; i++) {
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
const playerOne = createPlayer("Player One", "X");
const playerTwo = createPlayer(
  "Mr. Robot",
  playerOne.token === "X" ? "O" : "X"
);
const players = [playerOne, playerTwo];

let currentPlayer = players[0];

const displayController = () => {
  const startMessage = () => {
    console.log("The play Tic Tac Toe Start!!");
  };
  const showsGameBoard = () => {
    console.log(`| ${Gameboard[0]} | ${Gameboard[1]} | ${Gameboard[2]} |`);
    console.log(`| ${Gameboard[3]} | ${Gameboard[4]} | ${Gameboard[5]} |`);
    console.log(`| ${Gameboard[6]} | ${Gameboard[7]} | ${Gameboard[8]} |`);
    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(`#cell-${[i]}`);
      Gameboard[i] === "X"
        ? (Gameboard[i] = `<i class="fa-solid fa-x"></i>`)
        : (Gameboard[i] = `<i class="fa-regular fa-circle"></i>`);
      cell.innerHTML += Gameboard[i];
    }
  };

  const showsWinner = () => {
    console.log(
      `Tic Tac Toe! player "${Game().getCurrentPlayer().name}" wins!`
    );
    displayController().startMessage();
  };

  const showsTie = () => {
    console.log("The Game Was Tied!!");
    displayController().startMessage();
  };

  const showsTurn = () => {
    console.log(
      `Now is the turn of: "${Game().getCurrentPlayer().name}" with token "${
        Game().getCurrentPlayer().token
      }"`
    );
  };
  const showsMovements = (pos) => {
    displayController().showsGameBoard();
    console.log(
      `The player "${Game().getCurrentPlayer().name}" draw "${
        Game().getCurrentPlayer().token
      }" in the position ${pos}`
    );
  };

  const showsOccupiedPosition = (pos) => {
    console.log(`The position "${pos}" was occupied. Try again!`);
  };

  const toggleTheme = () => {
    const ambientBtn = document.querySelector("#ambient-btn");
    const header = document.querySelector("header");
    const settings = document.querySelector(".settings-btn");
    const reset = document.querySelector(".reset-btn");
    const turn = document.querySelector(".turn-message");
    const message = document.querySelector(".message");
    const cells = [...document.querySelectorAll(".cell")];
    const xIcons = document.getElementsByClassName("fa-x");
    const OIcons = document.getElementsByClassName("fa-circle");
    const footer = document.querySelector(".footer-link");
    ambientBtn.addEventListener("click", () => {
      ambientBtn.className === "fa fa-sun"
        ? (ambientBtn.classList = "fa fa-moon")
        : (ambientBtn.classList = "fa fa-sun");
      document.body.classList.toggle("dark");
      header.classList.toggle("header-dark");
      settings.classList.toggle("btn-dark");
      reset.classList.toggle("btn-dark");
      turn.classList.toggle("turn-dark");
      message.classList.toggle("message-dark");
      cells.map((el, index) => el.classList.toggle("cell-dark"));
      for (let i = 0; i < xIcons.length; i++) {
        xIcons[i].classList.toggle("X-dark");
      }
      for (let i = 0; i < OIcons.length; i++) {
        OIcons[i].classList.toggle("O-dark");
      }
      footer.classList.toggle("footer-dark");
    });
  };
  
  const toggleDialog = () => {
    const closeBtn = document.querySelector("#closeBtn");
    const settingsDialog = document.querySelector("#settingsDialog");
    const settingsBtn = document.querySelector(".settings-btn");
    settingsBtn.addEventListener("click", () => {
      settingsDialog.showModal();
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
        document.querySelector("#player-name-two").setAttribute("required",'');
        document.querySelector("#machine-group").style.visibility = "visible";
      }
    });
  };

  return {
    startMessage,
    showsGameBoard,
    showsWinner,
    showsTurn,
    showsTie,
    showsMovements,
    showsOccupiedPosition,
    toggleTheme,
    toggleDialog,
    togglePlayerTwoOptions
  };
};

const Game = () => {
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  const getCurrentPlayer = () => currentPlayer;

  return { switchPlayerTurn, getCurrentPlayer, currentPlayer };
};


(() => {
  displayController().toggleTheme();
  displayController().toggleDialog();
  displayController().togglePlayerTwoOptions();
  // displayController().startMessage();
  displayController().showsGameBoard();
  displayController().showsTurn();
})();
