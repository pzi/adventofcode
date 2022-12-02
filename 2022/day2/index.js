const { readFile } = require("fs");

const move = {
  // Rock
  A: 1,
  X: 1,
  // Paper
  B: 2,
  Y: 2,
  // Scissors
  C: 3,
  Z: 3,
};

const moves = Object.entries(move)

const getResult = (a, b) => {
  // Rock beats scissors
  if (a === 1 && b === 3) {
    return 0
  }

  if (a === 3 && b === 1) {
    return 6
  }

  // loss
  if (a > b) {
    return 0;
    // win
  } else if (a < b) {
    return 6;
  } else {
    // draw
    return 3;
  }
};

readFile(`${__dirname}/input.txt`, "utf-8", (error, data) => {
  if (error) {
    console.log("error reading file", error);
    return;
  }

  let totalScore = 0;
  let totalScoreP2 = 0

  data
    .replace(/\n/g, "|")
    .split("|")
    .filter(Boolean)
    .forEach((line, i) => {
      const [opponent, player] = line.split(" ");
      const result = getResult(move[opponent], move[player]);
      // console.log(`Line ${i+1}: ${move[player]}, ${result}`)
      totalScore = totalScore + result + move[player];

      const recommended = moves.find(m => {
        // draw
        if (player === 'Y') {
          return m.includes(move[opponent])
        } else if (player === 'X') {
          // lose
          // if (opponent === 'C') {
          //   return m.includes(2)
          // }
          if (opponent === 'A') {
            return m.includes(3)
          } else {
            return move[opponent] - m[1] == 1
          }
        } else {
          // win
          if (opponent === 'C') {
            return m.includes(1)
          } else {
            return m[1] > move[opponent]
          }
        }
      })[0]

      const resultP2 = getResult(move[opponent], move[recommended])
      // console.log(`line ${i+1}:`, opponent, player, recommended, resultP2, move[recommended])
      totalScoreP2 = totalScoreP2 + resultP2 + move[recommended]

    });

  console.log(totalScore);
  console.log(totalScoreP2)
});
