class Playmat
{
    constructor(x,y)
    {
        this.cards = [];
    }

    add(card)
    {
        card.index = this.cards.length;
        this.cards.push(card);
    }

    remove(index)
    {
        let cards_without_removed = this.cards.filter((card, i) => i != index);
        this.cards = cards_without_removed;
        this.updateCardIndexes();
    }

    removeAll(index)
    {
        this.cards = [];
    }

    bringCardToFront(index)
    {
        let card_to_bring = this.cards[index];
        if(card_to_bring)
        {
            let new_order = this.cards.filter((card, i) => i != index);
            new_order.push(card_to_bring);
            this.cards = new_order;
            this.updateCardIndexes();
        }
    }

    updateCardIndexes()
    {
        for(let card_index in this.cards)
        {
            this.cards[card_index].index = card_index;
        }
    }

    show()
    {
        for(let card of this.cards)
        {
            if(card == null) continue;
            card.update();
            card.show();
        }
          
    }


}