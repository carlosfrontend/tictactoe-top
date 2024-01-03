const createGameBoard = () => {
  const board = ["", "", "", "", "", "", "", "", ""];
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

  return {
    startMessage,
    showsGameBoard,
    showsWinner,
    showsTurn,
    showsTie,
    showsMovements,
    showsOccupiedPosition,
  };
};

const Game = () => {
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  const getCurrentPlayer = () => currentPlayer;

  return { switchPlayerTurn, getCurrentPlayer, currentPlayer };
};

const toggleTheme = () => {
  const ambientBtn = document.querySelector("#ambient-btn");
  const header = document.querySelector("header");
  const title = document.querySelector(".title");
  const settings = document.querySelector(".settings-btn");
  const reset = document.querySelector(".reset-btn");
  const turn = document.querySelector(".turn-message");
  xIcon = [...document.querySelectorAll("i.fa-solid.fa-x")];
  oIcon = [...document.querySelectorAll("i.fa-regular.fa-circle")];
  const message = document.querySelector(".message");
  const small = document.querySelector("small");
  ambientBtn.addEventListener("click", () => {
    ambientBtn.className === "fa fa-lightbulb"
      ? (ambientBtn.classList = "fa fa-moon")
      : (ambientBtn.classList = "fa fa-lightbulb");
    document.body.classList.toggle("light");
    header.classList.toggle("header-light");
    title.classList.toggle("title-light");
    settings.classList.toggle("btn-light");
    reset.classList.toggle("btn-light");
    turn.classList.toggle("turn-light");
    xIcon.map((el) => el.classList.toggle("x-light"));
    oIcon.map((el) => el.classList.toggle("circle-light"));
    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(`#cell-${i}`);
      cell.classList.toggle("grid-light");
    }
    message.classList.toggle("message-light");
    small.classList.toggle("footer-light");
    small.children[0].classList.toggle("footer-light");
  });
};

(() => {
  toggleTheme();
  displayController().startMessage();
  displayController().showsGameBoard();
  displayController().showsTurn();
})();
