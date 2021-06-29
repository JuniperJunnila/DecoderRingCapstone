const caesarModule = (function () {
  //in ascii, a is 97 and z is 122
  //helper functions to turn letters to and from ascii
  function _fromAscii(ascii) {
    return String.fromCharCode(ascii);
  }
  function _toAscii(alphanumeric) {
    return alphanumeric.charCodeAt();
  }
  //shifts each letter of the input string based on the shift value
  function caesar(input, shift, encode = true) {
    if (!shift || shift > 25 || shift < -25) return false;
    //if decoding, flips the shift value
    if (!encode) shift *= -1;
    let letters = input.toLowerCase().split("");
    //returns accumulated string of shifted letters
    return letters.reduce((acc, letter) => {
      if (_toAscii(letter) >= 97 && _toAscii(letter) <= 122) {
        let shifted = _toAscii(letter) + shift;
        //if there's no need to wrap around the alphabet, add the letter to the accumulator string
        if (shifted >= 97 && shifted <= 122) {
          acc += _fromAscii(shifted);
          return acc;
          //if there is a need to wrap, do so and then add the letter to the accumulator string
        } else {
          if (shift > 0) {
            let wrapped = shifted - 122;
            acc += _fromAscii(96 + wrapped);
            return acc;
          } else {
            let wrapped = shifted - 97;
            acc += _fromAscii(wrapped + 123);
            return acc;
          }
        }
      } else {
        acc += letter;
        return acc;
      }
    }, "");
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
