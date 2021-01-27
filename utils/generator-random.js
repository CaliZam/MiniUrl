const generateRandomChar = () => {
    const possibleChars = "abcdefghijkmnlopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let rand = '';
    debugger
    while(rand.length < 6){
        rand += possibleChars[parseInt(Math.random() * possibleChars.length)];
    }
    return rand;
  }

  module.exports = generateRandomChar;