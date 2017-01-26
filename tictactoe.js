var TicTacToeBoard = function() {
  this.board = [0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ]; // Board state
  this.tilesInUse = 0; // Current tiles that have been clicked

  // The index of the tiles in the board array and their corresponding tile position names
  this.tileIndex = [
    "top_left",
    "top_middle",
    "top_right",
    "center_left",
    "center_middle",
    "center_right",
    "bottom_left",
    "bottom_middle",
    "bottom_right"
  ];

  // The name of the tile positions and their corresponding index in the board array
  this.tileName = {
    "top_left": 0,
    "top_middle": 1,
    "top_right": 2,
    "center_left": 3,
    "center_middle": 4,
    "center_right": 5,
    "bottom_left": 6,
    "bottom_middle": 7,
    "bottom_right": 8
  };

  // Possible combinations to win the game
  this.winningCombinations = {
    "top_row": [0, 1, 2],
    "middle_row": [3, 4, 5],
    "bottom_row": [6, 7, 8],
    "left_column": [0, 3, 6],
    "middle_column": [1, 4, 7],
    "right_column": [2, 5, 8],
    "diagonal_LtR": [0, 4, 8],
    "diagonal_RtL": [2, 4, 6]
  };

  // Sets a tile position using the tiles name
  this.setTileWithName = function(name, symbol) {
    this.board[this.tileName[name]] = symbol;
    this.tilesInUse++;
  };

  // Gets a tile using the tiles position name
  this.getTileWithName = function(name) {
    return this.board[this.tileName[name]];
  };

  // Sets a tile position that has been clicked using the board index
  this.setTileWithIndex = function(index, symbol) {
    this.board[index] = symbol;
    this.tilesInUse++;
  };

  // Gets a tile name using its position index in board
  this.getTileNameWithIndex = function(index) {
    return this.tileIndex[index];
  };

  // Returns the number of tiles that have been clicked
  this.getTilesInUse = function() {
    return this.tilesInUse;
  };

  // Checks if a tile at a given index is available to use
  this.isTileAvailable = function(tileIndex) {
    if (typeof this.board[tileIndex] == "number") {
      return true;
    }
    return false;
  };

  // Checks if a player has won
  // @symbol: determines which player to check has won
  this.checkForWin = function(symbol) {
    // If the tiles in use < 5, a win isn't possible yet
    if (this.tilesInUse < 5) {
      return false;
    }

    // Check the winning combinations to see if a player has won
    for (var comb in this.winningCombinations) {
      if (this.board[this.winningCombinations[comb][0]] == symbol &&
        this.board[this.winningCombinations[comb][1]] == symbol &&
        this.board[this.winningCombinations[comb][2]] == symbol) {
        return comb;
      }
    }

    // If no one has won, return false
    return false;
  };

  // Checks for a potential winning move for either player
  // @symbol: denotes which player to check a winning move for
  this.checkForWinningMove = function(symbol) {
    for (var comb in this.winningCombinations) {
      // If the first two tiles are the same, return the last tile if it's unoccupied
      if (this.board[this.winningCombinations[comb][0]] == symbol &&
        this.board[this.winningCombinations[comb][1]] == symbol &&
        this.board[this.winningCombinations[comb][2]] == 0) {
        return this.winningCombinations[comb][2];
      }
      // If the first and third tile are the same, return the second tile if it's unoccupied
      else if (this.board[this.winningCombinations[comb][0]] == symbol &&
        this.board[this.winningCombinations[comb][1]] == 0 &&
        this.board[this.winningCombinations[comb][2]] == symbol) {
        return this.winningCombinations[comb][1];
      }
      // If the second and third tile are the same, return the first tile if it's unoccupied
      else if (this.board[this.winningCombinations[comb][0]] == 0 &&
        this.board[this.winningCombinations[comb][1]] == symbol &&
        this.board[this.winningCombinations[comb][2]] == symbol) {
        return this.winningCombinations[comb][0];
      }
    }

    // Return -1 if there is no possible winning move
    return -1;
  };

  // Resets the board for another round of play
  this.resetBoard = function() {
    this.board = [0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];
    this.tilesInUse = 0;
  };
}

$(document).ready(function() {
  var playerSymbol;
  var compSymbol;
  var turn = ""; // Current turn
  var board = new TicTacToeBoard();
  var compTile;
  var O_img_url = "./images/o-tic-tac-toe.png";
  var X_img_url = "./images/x-tic-tac-toe.png";
  var winner = false;   // Who wonn
  var winningComb;      // Winning three in a row combination

  // Player chooses X or O
  $("#O").on('click', function() {
    if (turn == "") {
      playerSymbol = 'O';
      $("#X").fadeOut();
      compSymbol = 'X';
      turn = chooseTurn();
      $("#turn").html(turn + "'s Turn");
      if (turn == "Computer") {
        compTile = handleComputerTurn(board, playerSymbol, compSymbol);
        board.setTileWithIndex(compTile, compSymbol);
        if (compSymbol == 'O') {
          $('#' + board.getTileNameWithIndex(compTile)).html('<img src="' + O_img_url + '">')
        } else {
          $('#' + board.getTileNameWithIndex(compTile)).html('<img src="' + X_img_url + '">');
        }
        turn = "Player";
        $("#turn").html(turn + "'s Turn");
      }
    }
  });

  $("#X").on('click', function() {
    if (turn == "") {
      playerSymbol = 'X';
      $("#O").fadeOut();
      compSymbol = 'O';
      turn = chooseTurn();
      $("#turn").html(turn + "'s Turn");
      if (turn == "Computer") {
        compTile = handleComputerTurn(board, playerSymbol, compSymbol);
        board.setTileWithIndex(compTile, compSymbol);
        if (compSymbol == 'O') {
          $('#' + board.getTileNameWithIndex(compTile)).html('<img src="' + O_img_url + '">')
        } else {
          $('#' + board.getTileNameWithIndex(compTile)).html('<img src="' + X_img_url + '">');
        }
        turn = "Player";
        $("#turn").html(turn + "'s Turn");
      }
    }
  });

  // If a tile on the board is clicked by the player
  $(".tile").on('click', function(event) {
    // Handle the player clicking a tile
    if (turn == "Player" && board.getTilesInUse() < 9) {
      // Make sure tile hasn't been clicked
      if (typeof board.getTileWithName(event.target.id) == "number") {
        // Put the proper symbol in the tile
        if (playerSymbol == 'O') {
          $('#' + event.target.id).html('<img src="' + O_img_url + '">')
        } else {
          $('#' + event.target.id).html('<img src="' + X_img_url + '">');
        }
        // Set the tile to the player symbol and tiles in use
        board.setTileWithName(event.target.id, playerSymbol);
      }

      // Check for win, otherwise move to next turn
      winningComb = board.checkForWin(playerSymbol);
      if (winningComb) {
        winner = "Player";
      }
      else {
        turn = "Computer";
        $("#turn").html(turn + "'s Turn");
      }
    }
    // Handle the computer's turn as long as there are still tiles available
    if (turn == "Computer" && board.getTilesInUse() < 9) {
      $("#turn").html(turn + "'s Turn");
      compTile = handleComputerTurn(board, playerSymbol, compSymbol);
      board.setTileWithIndex(compTile, compSymbol);
      if (compSymbol == 'O') {
        $('#' + board.getTileNameWithIndex(compTile)).html('<img src="' + O_img_url + '">')
      } else {
        $('#' + board.getTileNameWithIndex(compTile)).html('<img src="' + X_img_url + '">');
      }

      // Check for win, otherwise move to next turn
      winningComb = board.checkForWin(compSymbol);
      if (winningComb) {
        winner = "Computer";
      }
      else {
        turn = "Player";
        $("#turn").html(turn + "'s Turn");
      }
    }

    // Check for win or draw
    if (winner) {
      turn = "";
      $("#win").css("background", "url('" + getWinImage(winningComb) + "')");
      $("#turn").html(winner + " Wins");
      $("#reset").css("display", "block");
    }
    else if (board.getTilesInUse() == 9) {
      turn = "";
      $("#turn").html("Draw");
      $("#reset").css("display", "block");
    }
  });

  // Reset the board for another round of play
  $("#reset").on('click', function() {
    board.resetBoard();
    $("#O").css("display", "inline");
    $("#X").css("display", "inline");
    $(".tile").html('');
    $("#turn").html('');
    $("#win").css("background", "");
    $("#reset").css("display", "none");
    winner = false;
  });
});

/*
 * Choose which player gets to go first
 * 50% chance for either player to go first
 */
function chooseTurn() {
  // Coin flip
  if (Math.random() < 0.5) {
    return "Player";
  } else {
    return "Computer";
  }
}

/*
* Handles the computer taking its turn
* Determines which tile for the computer to place its symbol
* @board: current state of game board
* @playerSym: the player's symbol
* @compSym: the computer's symbol
*/
function handleComputerTurn(board, playerSym, compSym) {
  // Check if a winning move can be played by the computer
  var winningMove = board.checkForWinningMove(compSym);
  var playerWinningMove = board.checkForWinningMove(playerSym);
  if (winningMove != -1) {
    return winningMove;
  }
  // Check if a winning move can be made by the player next turn
  // and block it if there is one
  else if (playerWinningMove != -1) {
    return playerWinningMove;
  }
  // Else, place a symbol on a random tile
  else {
    return getRandomTile(board);
  }
}

/*
 * Gets a random tile to place a symbol on the board
 * @board: tic-tac-toe board
 */
function getRandomTile(board) {
  var rand = Math.floor(Math.random() * 9);
  while (!board.isTileAvailable(rand)) {
    rand = Math.floor(Math.random() * 9);
  }
  return rand;
}

/*
* Retrieves the appropriate image for a winning three in a row
* @comb: combination that won
*/
function getWinImage(comb) {
  switch(comb) {
    case "top_row":
      return "./images/top_row.png";
    case "middle_row":
      return "./images/middle_row.png";
    case "bottom_row":
      return "./images/bottom_row.png";
    case "left_column":
      return "./images/left_column.png";
    case "middle_column":
      return "./images/middle_column.png";
    case "right_column":
      return "./images/right_row.png";
    case "diagonal_LtR":
      return "./images/diagonal_LtR.png";
    case "diagonal_RtL":
      return "./images/diagonal_RtL.png";
    default:
      return "";
  }
}
