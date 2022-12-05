const { readFile } = require("fs");

const characters = "abcdefghijklmnopqrstuvwxyz";

const getLetterScore = (letter) => {
  if (characters.indexOf(letter) !== -1) {
    return characters.indexOf(letter) + 1;
  } else {
    return characters.toUpperCase().indexOf(letter) + 1 + characters.length;
  }
};

const sum = (acc, curr) => [acc[0] + curr];

readFile(`${__dirname}/input.txt`, "utf-8", (error, data) => {
  if (error) {
    console.log("error reading file", error);
    return;
  }

  const data2 = [];

  // Part 1
  data
    .replace(/\n/g, "|")
    .split("|")
    .filter(Boolean)
    .map((line, loc) => {
      // make groups of three
      if (loc % 3 === 0) {
        data2.push([line]);
      } else {
        data2[data2.length - 1].push(line);
      }

      const half = Math.floor(line.length / 2);
      return [line.slice(0, half), line.slice(half)];
    })
    .map((parts) => parts[0].split("").filter((d) => parts[1].includes(d))[0])
    .map(getLetterScore)
    .reduce(sum, [0])
    .forEach((d) => console.log(d));

  console.log(
    "-------------------------------------------------------------------------"
  );

  // Part 2
  data2
    .map((group) => {
      let match = "";
      group[0].split("").forEach((letter) => {
        if (group[1].includes(letter) && group[2].includes(letter)) {
          match = letter;
        }
      });

      return match;
    })
    .map(getLetterScore)
    .reduce(sum, [0])
    .forEach((d) => console.log(d));
});
