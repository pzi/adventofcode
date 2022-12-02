const { readFile } = require("fs");

readFile("input.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("error reading file");
    return;
  }

  const elfLoadout = [];
  let elfCount = 0;

  data
    .replace(/\n|\s{2,}/g, ",")
    .split(",")
    .forEach((v) => {
      const calorie = Number(v);
      if (v !== "") {
        if (elfLoadout[elfCount] === undefined) {
          elfLoadout.push([calorie]);
        } else {
          elfLoadout[elfCount].push(calorie);
        }
      } else {
        elfCount++;
      }
    });

  const sum = (arr) => arr.reduce((prev, cur) => prev + cur, 0);

  const totals = elfLoadout.map(sum);

  const totalsSorted = totals.slice().sort((a, b) => {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });

  const maxCalories = Math.max(...totals);

  console.log(
    `Elf ${
      totals.indexOf(maxCalories) + 1
    } is carrying ${maxCalories} calories.`
  );

  const topThree = totalsSorted.slice(0, 3);

  console.log(`Top three elves carry ${sum(topThree)} calories in total.`);
});
