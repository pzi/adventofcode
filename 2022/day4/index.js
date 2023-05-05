const { readFile } = require("fs");

const baseLine = new Array(100).fill(".");

// Create complete sections based on a range, e.g. 4-8 -> '...45678.'
const convertLine = (line) => {
  const min = Math.min(...line);
  const max = Math.max(...line);

  return baseLine.map((dot, position) => {
    const entry = position + 1;

    if (entry >= min && entry <= max) {
      return entry;
    } else {
      return dot;
    }
  });
  // .join('')
};

readFile(`${__dirname}/input.txt`, "utf-8", (error, data) => {
  if (error) {
    console.log("error reading file", error);
    return;
  }

  let part1Counter = 0;
  let part2Counter = 0;

  data
    .split(/\n/g)
    .filter(Boolean)
    .map((group) =>
      // Create [min, max] number pairs
      group
        .split(",")
        .map((pair) => pair.split("-"))
        .map((d) => d.map(Number))
    )
    .map((line) => {
      line[0] = convertLine(line[0]);
      line[1] = convertLine(line[1]);
      return line;
    })
    .forEach((line) => {
      const pair1 = line[0];
      const pair2 = line[1];

      // Complete overlap
      if (
        pair1.every((r) => pair2.includes(r)) ||
        pair2.every((r) => pair1.includes(r))
      ) {
        part1Counter++;
      }

      // Partial overlap (only comparing actual numbers)
      if (
        pair1.some((r) => {
          if (r !== ".") {
            return pair2.includes(r);
          } else {
            return false;
          }
        }) ||
        pair2.some((r) => {
          if (r !== ".") {
            return pair1.includes(r);
          } else {
            return false;
          }
        })
      ) {
        return part2Counter++;
      }

      // console.log(line)
    });

  console.log({ part1Counter, part2Counter });
});
