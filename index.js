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
    displayController().showsGameBoard();
    console.log(
      `The player "${Game().getCurrentPlayer().name}" draw "${
        Game().getCurrentPlayer().token
      }" in the position ${pos}`
    );
    // Gameboard.checkForDraw() only for test
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
    console.log(`The position "${pos}" was occupied. Try again!`);
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
      // console.log(true); Only for test
      return true; // Movements are available
    } else {
      // console.log(false); Only for test
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

  return { startMessage, showsGameBoard, showsWinner, showsTurn, showsTie };
};

const Game = () => {
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  const getCurrentPlayer = () => currentPlayer;

  return { switchPlayerTurn, getCurrentPlayer, currentPlayer };
};

(() => {
  displayController().startMessage();
  displayController().showsGameBoard();
  displayController().showsTurn();
})();
