//Array -> Array
// returns the array with its digits shuffled
// <NOT pure--relies on randomness>
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//void -> string
//generates a random four-digit number that has no repeating digits
// and does not begin with zero.
export function generateNumber() {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let listlength = 10;
  let numbersneeded = 4;
  let finalnumber = [];
  let notshuffled = true;
  numbers.forEach(element => {
    if (Math.random() < numbersneeded / listlength) {
      finalnumber.push(element);
      numbersneeded--;
    }
    listlength--;
  });

  while (notshuffled || finalnumber[0] == 0) {
    finalnumber = shuffle(finalnumber);
    notshuffled = false;
  }

  return finalnumber.join("");
}

//Map -> string
//prints out a string representation of a map, with each k/v pair on
// a new line
export function printMap(printMap) {
  let str = "";
  for (let [k, v] of printMap) {
    str += k + " -- " + v + "\n";
  }
  return str;
}