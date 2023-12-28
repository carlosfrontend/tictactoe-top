// Game IIFE
const game = (() => {
  const size = 3;
  const board = [];

  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i].push("");
    }
  }
  const Gameboard = { board: board };
  // Factory
  const getBoard = () => Gameboard.board;

  return { getBoard };
})();

// Player IIFE
const player = (() => {
  // Factory
  const createPlayer = (name, token) => {
    return { name, token };
  };

  return {
    createPlayer,
  };
})();

// Controller IIFE
const controller = (() => {
  const playerOne = player.createPlayer("Player One", "X");
  const playerTwo = player.createPlayer(
    "Mr. Robot",
    playerOne.token === "X" ? "O" : "X"
  );

  let actualPlayer = playerOne;

  const switchPlayer = () => {
    // Switch between Players
    actualPlayer === playerOne
      ? (actualPlayer = playerTwo)
      : (actualPlayer = playerOne);
    return actualPlayer;
  };

  const getActualPlayer = () => actualPlayer; // Show actual player

  const putToken = (player, row, col) => {
    let board = game.getBoard();

    board[row][col] = player.token;
    console.log(player);
  };
  const playRound = (player, row, col) => {
    if (game.getBoard()[row][col] === "") {
      controller.putToken(player, row, col);
      console.log(
        `The Player: "${player.name}" put "${player.token}" on coordenates [${row}] [${col}]`
      );
      console.log(game.getBoard());
      player = controller.switchPlayer();
      controller.checkWinner();
    } else {
      console.log(`Try other coordenates. It's was ocupped!`);
      console.log(`Turn is of ${controller.getActualPlayer().name}`);
      return;
    }
    console.log(`Now turn is of the Player: ${player.name}`);
  };
  const checkWinner = () => {
    let board = game.getBoard();
    // X
    if (
      (board[0][0] === "X" &&
        board[0][0] === board[0][1] &&
        board[0][1] === board[0][2]) ||
      (board[1][0] === "X" &&
        board[1][0] === board[1][1] &&
        board[1][1] === board[1][2]) ||
      (board[2][0] === "X" &&
        board[2][0] === board[2][1] &&
        board[2][1] === board[2][2]) ||
      (board[0][0] === "X" &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) ||
      (board[0][2] === "X" &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) ||
      (board[0][0] === "X" &&
        board[0][0] === board[1][0] &&
        board[1][0] === board[2][0]) ||
      (board[0][1] === "X" &&
        board[0][1] === board[1][1] &&
        board[1][1] === board[2][1]) ||
      (board[0][2] === "X" &&
        board[0][2] === board[1][2] &&
        board[1][2] === board[2][2]) ||
      (board[0][0] === "O" &&
        board[0][0] === board[0][1] &&
        board[0][1] === board[0][2]) ||
      (board[1][0] === "O" &&
        board[1][0] === board[1][1] &&
        board[1][1] === board[1][2]) ||
      (board[2][0] === "O" &&
        board[2][0] === board[2][1] &&
        board[2][1] === board[2][2]) ||
      (board[0][0] === "O" &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]) ||
      (board[0][2] === "O" &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]) ||
      (board[0][0] === "O" &&
        board[0][0] === board[1][0] &&
        board[1][0] === board[2][0]) ||
      (board[0][1] === "O" &&
        board[0][1] === board[1][1] &&
        board[1][1] === board[2][1]) ||
      (board[0][2] === "O" &&
        board[0][2] === board[1][2] &&
        board[1][2] === board[2][2])
    ) {
      controller.switchPlayer();
      console.log(`${controller.getActualPlayer().name} Wins!`);
    }
  };
  return { switchPlayer, getActualPlayer, putToken, playRound, checkWinner };
})();
