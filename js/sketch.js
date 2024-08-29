
let curs = new CursorManager()
let deck = new Deck(100,100);
let cards = [];


function preload() {
  // Load a custom font before the sketch starts
  HelveticaNeue = loadFont('font/HelveticaNeueTLPro-MD.ttf');
  card_back     = loadImage('img/card_back.png');
  logo          = loadImage("img/dulux-logo.png");
}

function setup() {
  document.oncontextmenu = function() { return false; }

  createCanvas(windowWidth, windowHeight);
  deck.shuffle();

}

function draw() {

  background(param.backgroundColor);
  //drawCheckerBoard()

  curs.resetIcon();
  curs.updateEvent();


  deck.show();
  for(let card of cards)
  {
    if(card == null) continue;
    card.update();
    card.show();
  }

  curs.updateIcon()

  
}

function mousePressed() {
  let clickedCard = false;

  curs.mousedown = true;
  for(let card of cards)
    {
      if(card == null) continue;
      card.pressed();
    }
    
    deck.pressed();
    
}

function mouseReleased() {
  curs.mousedown = false;
  for(let card of cards)
    {
      if(card == null) continue;
      card.released();
    }
}




function drawCheckerBoard()
{
  background(param.backgroundColor);
  var unit = 300;
  var w_cells = Math.ceil(windowWidth/unit);
  var h_cells = Math.ceil(windowHeight/unit);


  fill(param.checkerColor)

  for(var y = 0; y < h_cells; y++)
  {
  for(var x = 0; x < w_cells; x++)
  {
      if( (x+y)%2 == 0)
      {
        rect(x*unit, y*unit, unit, unit)
      }


  }
  }

}