class Deck
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.w = param.cardW;
        this.h = this.w*param.cardWHratio;

        this.lastIndex = 0;
        this.shuffled_colors = [];
    }


    show()
    {
        // Border and background
        strokeWeight(param.cardBorderWeight)
        stroke(param.cardBorderColor)
        fill(param.deckBackgroundColor)
        for(var i = 30; i >= 0; i--)
        {
            rect(this.x+i*0.25, this.y+i, this.w, this.h, 5, 10, 5, 10);
        }

        // Draw dog logo
        let iw = 140;
        let ih = iw*card_back.height/card_back.width;
        let mx = this.x + (this.w  - iw)/2;
        let my = this.y + (this.h - ih)/2;
        image(card_back, mx, my, iw, ih)

        // Draw text logo
        let iw2 = 120;
        let ih2 = iw*logo.height/logo.width;
        let mx2 = this.x + (this.w  - iw2)/2;
        let my2 = my + ih2/2 + (this.h - ih2)/2;
        image(logo, mx2, my2, iw2, ih2)

        textAlign(CENTER);
        strokeWeight(0);
        fill(param.deckTextColor);
        textSize(32);
        //text("Dulux", mx + this.w/2, my + ih)

        if(this.rollover)
        {
            curs.setIcon("pointer")
        }
        
    }

    pressed()
    {
        if(this.rollover)
        {
            if(mouseButton === LEFT) // Left click: draw a new card
            {
                let card = this.index2card(this.lastIndex, this.x, this.y)
                cards.push(card);
                this.lastIndex++;
                //card.rollover = true;
                // card.dragging = true;
            }
            else // reshuffle the whole deck
            {
                cards = [];
                this.lastIndex = 0;
                this.shuffle();
            }
            
        }
    }

    index2card(index, x = 0, y = 0)
    {
        let data = this.shuffled_colors[index]
        let card = new Card(x, y, index, data[1], data[0])
        return card;
    }

    shuffle()
    {
        this.shuffled_colors = shuffle(dulux_colors);
    }

    remove(index)
    {
        cards[index] = null;
    }


}