document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const gameScore = document.getElementById("score");

  // 28x28 = 784 squares
  const width = 28;
  let score = 0;

  // Layout of grid and what is in the squares
  // Try and visualise the pac-man maze, that's that the layout translates
  /* Assign different classes to each grid square, including 
   wall positions, food and the start places of the ghosts and Pac-Man */
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = [];
  //  Make all 784 squares of grid based on layout length
  function createMaze() {
    for (let i = 0; i < layout.length; i++) {
      //Create div for all 784 squaures
      const square = document.createElement("div");
      //   Put those squares in grid using appendChild
      grid.appendChild(square);
      // Push squares into new array called squares
      //   (which is empty to push the 'square'(s) into)
      squares.push(square);

      // Add layout to create maze after squares have been pushed
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }

  createMaze();

  // Pick an index in array to pick where we want Pac-Man to start
  let startPacman = 490;
  // Add Pac-Man to the 490th place of the squares array(layout)
  squares[startPacman].classList.add("pac-man");

  // Move Pac-Man with keycodes
  function movePacman(e) {
    // First remove Pac-Man from squares currently in
    squares[startPacman].classList.remove("pac-man");

    switch (e.key) {
      // If you press the key with the keycode 37 (left arrow key)...
      // ...checking if the pac-man is in a square where number is divisble by width (28) & no remainder of 0
      case 'ArrowLeft':
        // Left
        // If true, move PacMan LEFT (so one space left of 490 which is 489)
        if (
          startPacman % width !== 0 &&
          !squares[startPacman - 1].classList.contains("wall") &&
          !squares[startPacman - 1].classList.contains("ghost-lair")
        )
          startPacman -= 1;

        // Check if PacMan is in left exit
        if (startPacman - 1 === 363) {
          startPacman = 391;
        }
        break;
      // Up arrow
      case 'ArrowUp':
        if (
          startPacman - width >= 0 &&
          !squares[startPacman - width].classList.contains("wall") &&
          !squares[startPacman - width].classList.contains("ghost-lair")
        )
          startPacman -= width;
        break;
      // Right
      case 'ArrowRight':
        if (
          startPacman % width < width - 1 &&
          !squares[startPacman + 1].classList.contains("wall") &&
          !squares[startPacman + 1].classList.contains("ghost-lair")
        )
          startPacman += 1;

        // Check if PacMan is in right exit
        if (startPacman + 1 === 392) {
          startPacman = 364;
        }
        break;
      // Down
      case 'ArrowDown':
        if (
          startPacman + width < width * width &&
          !squares[startPacman + width].classList.contains("wall") &&
          !squares[startPacman + width].classList.contains("ghost-lair")
        )
          startPacman += width;
        break;
    }
    squares[startPacman].classList.add("pac-man");

    // Also want to check for each move if:

    // pacDotEaten (Inner pack dot)
    pacDotEaten();

    // powerPelletEaten (Inner power pellet)
    powerPelletEaten();

    // checkForGameOver
    checkGameOver();

    // checkForWin
    checkForWin();

    isXCoordCloser();
    isYCoordCloser();
   
  }

  document.addEventListener("keyup", movePacman);
  // If the square PacMan is in contains a pac-dot class, add 1 to the score
  function pacDotEaten() {
    if (squares[startPacman].classList.contains("pac-dot")) {
      score++;
      gameScore.innerHTML = score;
      squares[startPacman].classList.remove("pac-dot");
    }
  }

  // What happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[startPacman].classList.contains("power-pellet")) {
      score += 10;
      ghosts.forEach((ghost) => (ghost.isScared = true));
      // Ghosts stay scared for 10 secs only
      setTimeout(unScareGhosts, 10000);
      // Remove class of power-pellet, to make it empty
      squares[startPacman].classList.remove("power-pellet");
    }
  }

  // Make ghosts stop appearing as aquamarine
  function unScareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  // Create Ghost template with constructors
  class Ghost {
    // Each ghost made should have a className, startIndex and speed
    constructor(className, startIndex, speed) {
      // Referring to a specific ghost made in the future
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      // Current index which will be startIndex as default
      this.currentIndex = startIndex;
      this.timerId = NaN;
      this.isScared = false;
    }
  }

  ghosts = [
    new Ghost("casper", 348, 250),
    new Ghost("dong", 376, 400),
    new Ghost("salem", 351, 300),
    new Ghost("luci", 379, 500),
  ];

  // Draw ghosts onto grid in their starting index
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  });

  // Move all ghosts randomly
  ghosts.forEach((ghost) => moveGhost(ghost));

  // Move array
  function moveGhost(ghost) {
    // Figure out direction options for the ghost and put in array
    // Ghost option: move 1 square back, 1 square down, 1 width down, 1 width/square up.
    const directions = [-1, +1, width, -width];

    // Randomly generate direction from array then multiply by how many elements there are in array
    let direction = directions[Math.floor(Math.random() * directions.length)];

    // Make each ghost at the speed of each ghost speed based on what was set in the constructor
    ghost.timerId = setInterval(function () {
      // If statement uisng classList, to check what is next step each ghost is about to take
      // If square of current ghost is about to go in the direction of is not a wall or ghost, continue

      if (
        !squares[ghost.currentIndex + direction].classList.contains("wall") &&
        !squares[ghost.currentIndex + direction].classList.contains("ghost")
      ) {
        // If ghost can move here: remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );


        // const [ghostX, ghostY] = getCoordinates(currentIndex);
        // const [pacmanX, pacmanY] = getCoordinates(startPacman);
        // const [ghostNewX, ghostNewY] = getCoordinates(currentIndex + direction);

        // function isXCoordCloser() {
        //   if ((Math.abs(ghostNewX - pacmanX)) < (Math.abs(ghostX - pacmanX))) {
        //     return true;
        //   } else return false;
        // }

        // function isYCoordCloser() {
        //   if ((Math.abs(ghostNewY - pacmanY)) < (Math.abs(ghostY - pacmanY))) {
        //     return true;
        //   } else return false;
        // }

        // if (isXCoordCloser() || isYCoordCloser()) {
        //   //Change current index of ghost to the new safe square
        //   ghost.currentIndex += direction;
        //   squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        // } else {
        //   squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        //   direction = directions[Math.floor(Math.random() * directions.length)];
        // }

        //Change current index of ghost to the new safe square
        ghost.currentIndex += direction;

        // Redraw the ghost in the new safe square
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      // Else find a new direction to go
      else
        direction = directions[Math.floor(Math.random() * directions.length)];

      // Stop game if square ghost currently in contains pac-man
      // Stop ghost moving by clearing timer interval
      if (squares[ghost.currentIndex].classList.contains("pac-man")) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      // score -= 10
      // gameScore.innerHTML = score;
      document.removeEventListener("keyup", movePacman);
      // setTimeout(function(){alert('Game Over!')}, 500)
      gameScore.innerHTML = "GAME OVER"; }

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      if (
        ghost.isScared &&
        squares[ghost.currentIndex].classList.contains("pac-man")
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      checkForGameOver();
    }, ghost.speed);
  }

 

  // const [ghostX, ghostY] = getCoordinates(currentIndex);
  //       const [pacmanX, pacmanY] = getCoordinates(startPacman);
  //       const [ghostNewX, ghostNewY] = getCoordinates(currentIndex + direction);

  //       function isXCoordCloser() {
  //         if ((Math.abs(ghostNewX - pacmanX)) < (Math.abs(ghostX - pacmanX))) {
  //           return true;
  //         } else return false;
  //       }

  //       function isYCoordCloser() {
  //         if ((Math.abs(ghostNewY - pacmanY)) < (Math.abs(ghostY - pacmanY))) {
  //           return true;
  //         } else return false;
  //       }


  //       if (isXCoordCloser() || isYCoordCloser()) {
  //         //Change current index of ghost to the new safe square
  //         ghost.currentIndex += direction;
  //         squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
  //       } else {
  //         squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
  //         direction = directions[Math.floor(Math.random() * directions.length)];
  //       }
      
      
  function checkGameOver() {
    if (
      squares[startPacman].classList.contains("ghost") &&
      !squares[startPacman].classList.contains("scared-ghost")
    ) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      // score -= 10
      // gameScore.innerHTML = score;
      document.removeEventListener("keyup", movePacman);
      // setTimeout(function(){alert('Game Over!')}, 500)
      gameScore.innerHTML = "GAME OVER";
    }
  }

  function checkForWin() {
    // Collecting max score (excluding scared ghosts)
    if (score === 274) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
      gameScore.innerHTML = "YOU WIN";
    }
  }
});
