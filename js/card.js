class Card extends Draggable
{
    constructor(x, y, index, hex, name)
    {
        // x, y, w, h
        super(x, y, param.cardW, param.cardW*param.cardWHratio);
        this.index = index;
        this.hex = hex;
        this.name = name;
        this.isLight = Card.isLight(hex);
    }



    show() {
        // Border and background
        strokeWeight(param.cardBorderWeight)
        stroke(param.cardBorderColor)
        fill(this.hex)
        rect(this.x, this.y, this.w, this.h, 15, 5, 15, 5);

        // Text
        strokeWeight(0)

        // Detect light/dark text
        if(this.isLight)
        {
            fill(param.darkTextColor)
        }
        else
        {
            fill(param.lightTextColor)
        }
        
        textFont(HelveticaNeue);
        textWrap(WORD);
        textSize(16);
        textAlign(RIGHT);

        text(this.name, this.x+this.w- param.cardW*0.9 -10, this.y + 30, param.cardW*0.9);
    }

    pressed()
    {
        super.pressed()

        if(this.rollover && mouseButton == RIGHT) // remove that card from the board
        {
            deck.remove(this.index)
        }
    }
    


    static isLight(hex) // #abcdef
    {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var vals = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };

        // based on
        // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
        for(let c in vals)
        {
            vals[c] /= 255;
            vals[c] = vals[c] < 0.04045 ? vals[c]/12.92 : Math.pow((vals[c]+0.055)/1.055, 2.4)
        }

        let luminance = 0.2126 * vals.r + 0.7152 * vals.g + 0.0722 * vals.b

        return luminance > 0.179;
    }


}