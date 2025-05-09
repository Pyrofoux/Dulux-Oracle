class Deck
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.w = param.cardW;
        this.h = this.w*param.cardWHratio;

        this.lastIndex = 0;
        this.shuffled_indexes = [];
        this.interactable = true;

        this.deal_parity = 0;
    }

    remaining_cards()
    {
        return this.shuffled_indexes.length - this.lastIndex;
    }

    show()
    {
        // Border and background
        push();
        strokeWeight(param.cardBorderWeight);
        stroke(param.cardBorderColor);
        fill(param.deckBackgroundColor);

        let cards_in_deck = this.remaining_cards();
        if(cards_in_deck > 0)
        {
            for(var i = Math.min(30, cards_in_deck); i > 0; i--) // draw up to 30 cards
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

            if(this.rollover)
            {
                curs.setIcon("grab");
            }
        }
        else
        {
            noFill();
            rect(this.x, this.y, this.w, this.h, 5, 10, 5, 10);

            if(this.rollover)
            {
                curs.setIcon(HAND);
            }
        }
        pop();
    }

    pressed()
    {
        if(this.rollover)
        {
            if(mouseButton === LEFT && this.lastIndex < this.shuffled_indexes.length) // Left click: draw a new card
            {
                let card = this.index2card(this.lastIndex, this.x, this.y)
                playmat.add(card)
                this.lastIndex++;

                
                // Make sure the card is dragged when it appears (cleaner way to do this?)
                card.rollover = true;
                card.pressed(false);

                sounds[`deal`].play();
                this.deal_parity = (this.deal_parity+1)%2;
            }
            else // reshuffle the whole deck
            {
                playmat.discardAll(); // discard all cards, with animation
            }
            
        }
    }

    // TODO
    push() // add a card index at the very end
    {

    }

    reinsert(card_index) // reinsert a card index, at a random place
    {

        let beginning = this.shuffled_indexes.slice(0, this.lastIndex);
        let end       = this.shuffled_indexes.slice(this.lastIndex);

        beginning = beginning.filter(value => value != card_index);
        let random_index = random(end.length);
        end.splice(random_index, 0, card_index);
        this.lastIndex -= 1;

        this.shuffled_indexes = beginning.concat(end);
    }

    index2card(index, x = 0, y = 0)
    {
        let deck_index = this.shuffled_indexes[index];
        let data = dulux_colors[deck_index];
        let card = new Card(x, y, null, data[1], data[0], deck_index)
        return card;
    }

    shuffle()
    {
        let ordered_indexes = Array(dulux_colors.length).fill(0).map((value,i) => i);
        this.shuffled_indexes = shuffle(ordered_indexes);
    }
}