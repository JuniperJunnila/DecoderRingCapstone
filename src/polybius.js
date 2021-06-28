const polybiusModule = (function () {
  const codeKey = new Map();
  let polyKeyOnes = 1;
  let polyKeyTens = 0;
  const alphabet = "a b c d e f g h i/j k l m n o p q r s t u v w x y z".split(
    " "
  );
  const digits = "0123456789";

  //maps every letter into an object with the keys being letters
  //and the values being numbers according to the polybius cipher
  alphabet.map((letter) => {
    if (polyKeyTens === 50 && polyKeyOnes < 5) {
      polyKeyOnes++;
      polyKeyTens = 0;
    }
    polyKeyTens += 10;
    codeKey.set(letter, (polyKeyOnes + polyKeyTens).toString());
  });

  //a helper function to check that any number entered is valid
  function _decodeCheck(coded) {
    coded = coded.split(" ").join("");
    return coded.length % 2 === 1;
  }
  //helper function to separate an array of numbers into an array of pairs of numbers
  function _doubleDigits(inputArr) {
    let letterHold = "ab";
    return inputArr.reduce((acc, letter) => {
      if (letter === " ") {
        acc.push(letter);
        return acc;
      }
      if (letterHold.length === 2) {
        letterHold = letter;
      } else {
        letterHold += letter;
        acc.push(letterHold);
        return acc;
      }
      return acc;
    }, []);
  }
  //helper function to get a key from an object by inputting the value
  function _getKeyByValue(codeKey, letter) {
    for (const kv of codeKey.entries()) {
      if (kv[1] === letter) return kv[0];
    }
  }

  function polybius(input, encode = true) {
    if (!input || (!encode && _decodeCheck(input))) {
      return false;
    }
    input = input.toLowerCase();
    let inputArr = input.split("");
    //checks if the input is numbers or letters
    if (digits.includes(inputArr[0])) {
      inputArr = _doubleDigits(inputArr);
    }
    //maps, then immdeiately joins input array into a string of numbers,
    //with special cases for the letters i and j, and for spaces
    function encoder() {
      return inputArr
        .map((letter) => {
          if (letter === " ") return letter;
          if (letter === "i" || letter === "j") return "42";
          return codeKey.get(letter);
        })
        .join("");
    }
    //maps, then immdeiately joins input array into a string of letters with a special case for space
    function decoder() {
      return inputArr
        .map((num) => {
          if (num === " ") return num;
          return _getKeyByValue(codeKey, num);
        })
        .join("");
    }
    //returns depending on whether it's encoding or decoding
    if (encode) {
      return encoder();
    } else {
      return decoder();
    }
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
