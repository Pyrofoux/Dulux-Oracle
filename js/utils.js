function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

function clamp(value, min, max)
{
    return Math.min(Math.max(value, min), max);
};

function easeInSine(x) {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function angleBetween(start_x, start_y, end_x, end_y)
{
  return Math.atan2(end_y-start_y, end_x-start_x) / TWO_PI*360;
}