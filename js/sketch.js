
let curs    = new CursorManager()
let deck    = new Deck(100,100);
let playmat = new Playmat();


let HelveticaNeue, card_back, logo, sounds;
function preload() {
  // Load custom font, images and sounds before the sketch starts
  HelveticaNeue = loadFont('font/HelveticaNeueTLPro-MD.ttf');
  card_back     = loadImage('img/card_back.png');
  logo          = loadImage("img/dulux-logo.png");
  sounds = ["shuffle", "deal", "discard","flip"];
  sounds.forEach(name => {sounds[name] = loadSound(`sound/${name}.wav`)});

}

function setup() {
  document.oncontextmenu = function() { return false; }

  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  deck.shuffle();
  playmat.addDeck(deck)
  loadShareUrl(document.location);

}

function draw() {

  background(param.backgroundColor);
  //drawCheckerBoard()

  curs.resetIcon();
  curs.updateEvent();


  playmat.show();
  curs.updateIcon()
}

function mousePressed() {
  let clickedCard = false;
  let must_be_in_front = null;
  curs.mousedown = true;
  for(let card_index in playmat.cards)
    {
      let card = playmat.cards[card_index];
      if(card == null) continue;
      let is_pressed = card.pressed();
      if(is_pressed)
      {
        must_be_in_front = card_index;
      }
    }
    
    playmat.deck.pressed();
    
    if(must_be_in_front != null && must_be_in_front != playmat.cards.length-1) // If the card that is pressed is not already the one at front (i.e. last one in the array)
    {
      playmat.bringCardToFront(must_be_in_front);
    }
}

function mouseReleased() {
  curs.mousedown = false;
  for(let card of playmat.cards)
    {
      if(card == null) continue;
      card.released();
    }
}


function getShareUrl()
{
  let here = new URL(document.location);
  let serialized_playmat = playmat.serialize()
  
    here.searchParams.delete("c"); // delete to avoid adding it twice
  if(serialized_playmat != "")  // TODO: leaves an ugly c= empty, but will not update otherwise...
  {
    here.searchParams.append("c", serialized_playmat)
  }
  return here.href;
}

function loadShareUrl(url)
{
  let here = new URL(url);
  let serialized_playmat = here.searchParams.get("c");
  // console.log(serialized_playmat);
  if(serialized_playmat) playmat.unserialize(serialized_playmat);
}

function updateCurrentUrl()
{
  let updated_url = getShareUrl();
  try
  {
    window.history.pushState({ path: updated_url }, '', updated_url);
  }
  catch(e)
  {
    console.log(e);
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