class CursorManager
{
    constructor()
    {
        this.icon = "default";
        this.mousedown = false;
    }



    updateEvent()
    {
        let highest_card;
        let all_cards = [deck, ...cards]
        for(let card of all_cards)
        {
            if(card == null) continue;
            // reset the card cursor status
            card.rollover = false;

            // Is mouse over object
            if (mouseX > card.x && mouseX < card.x + card.w && mouseY > card.y && mouseY < card.y + card.h)
            {
                highest_card = card; //might also be the deck
            }
        }

        if(highest_card)
        {
            highest_card.rollover = true;
        }
    }

    updateIcon()
    {
        cursor(this.icon)
    }


    resetIcon()
    {
        this.icon = "default"
    }

    setIcon(icon)
    {
        this.icon = icon;
    }

}