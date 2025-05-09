class Playmat
{
    constructor(x,y)
    {
        this.cards = [];
    }

    // TODO: URL encode
    // TODO: compress? don't really want to
    
    static serialize_separator = "."
    
    serialize() // Note: Would probably useful to also serialize width/height of screen used for serialization
    {
        let serialized_cards = this.cards.map(card => card.serialize())
        return serialized_cards.join(Playmat.serialize_separator);
    }

    unserialize(serialized)
    {
        let blocks = serialized.split(Playmat.serialize_separator);
        try
        {
            // Create cards from serialized data
            let unserialized_cards = blocks.map( (block, i) => Card.unserialize(block, i));
            let card_indexes = unserialized_cards.map(card => card.deck_index);
            this.cards = unserialized_cards;

            //Remove cards from deck
            
            let remaining_cards = this.deck.shuffled_indexes.filter(index => card_indexes.indexOf(index) == -1);
            this.deck.shuffled_indexes = card_indexes.concat(remaining_cards);
            this.deck.lastIndex = card_indexes.length; 
            // console.log(this.deck.lastIndex);
            // console.log(this.deck.shuffled_indexes);

        }
        catch(e)
        {
            console.log("Parsing error", e);
        }
        
    }

    addDeck(deck)
    {
        this.deck = deck;
    }


    add(card)
    {
        card.z_index = this.cards.length;
        this.cards.push(card);
    }

    remove(index) // removes entirely a card from the playmat
    {
        let cards_without_removed = this.cards.filter((card, i) => i != index);
        this.cards = cards_without_removed;
        this.updateCardIndexes();
    }

    removeAll(index)
    {
        this.cards = [];
    }

    discardAll()
    {
        for(let card of this.cards)
        {
            card.discardAnimation(false);
        }
        sounds["shuffle"].play();
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
            this.cards[card_index].z_index = card_index;
        }
    }

    show()
    {

        deck.show();
        for(let card of this.cards)
        {
            if(card == null) continue;
            card.update();
            card.show();
        }
        
          
    }


}