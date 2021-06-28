const substitutionModule = (function () {
  //helper function to get a key from an object by inputting the value
  function _getKeyByValue(codeKey, letter) {
    for (const kv of codeKey.entries()) {
      if (kv[1] === letter) return kv[0];
    }
  }

  function substitution(input, alphabet, encode = true) {
    if (typeof alphabet != "string" || alphabet.length != 26) return false;
    //checks that every character of the inputted alphabet is unique
    let uniquenessTest = alphabet.split("");
    let tester = uniquenessTest.reduce((acc, letter) => {
      if (acc[letter] === 1) {
        console.log("here I am");
        return false;
      }
      acc[letter] = 1;
      return acc;
    }, {});
    if (!tester) return false;

    //turns all strings into arrays
    const alphabetPrime = "abcdefghijklmnopqrstuvwxyz".split("");
    const alphabetSecondary = alphabet.toLowerCase().split("");
    let inputArr = input.toLowerCase().split("");

    //creates a new object with the keys as the regular alphabet and values as the inputted new alphabet
    const codeKey = new Map();
    alphabetPrime.map((letter) => {
      codeKey.set(letter, alphabetSecondary[alphabetPrime.indexOf(letter)]);
    });

    //if encoding it returns a string of letters filtered through the codeKey object
    if (encode) {
      return inputArr
        .map((letter) => {
          if (!alphabetPrime.includes(letter)) return letter;
          return codeKey.get(letter);
        })
        .join("");
      //if decoding it runs the array through the _getKeyByValue helper, then returns the joined result
    } else {
      return inputArr
        .map((letter) => {
          if (letter === " ") return letter;
          return _getKeyByValue(codeKey, letter);
        })
        .join("");
    }
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
