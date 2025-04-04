class Card extends Draggable
{
    constructor(x, y, index, hex, name)
    {
        // x, y, w, h
        super(x, y, param.cardW, param.cardW*param.cardWHratio);
        this.index = index;
        this.hex = hex;
        this.name = name;
        this.isFlipped = true;
        this.isLight = Card.isLight(hex);
        this.angle = 0;
    }



    show() {

        

        translate(this.x, this.y);
        let being_dragged = this.dragging && this.elapsedDragged >= 1;
        if(being_dragged)
        {
            
            let shadow_vertical_delta = this.h*param.draggingShadowHeight;

            translate(this.w/2, this.h/2);

            // tilting the card
            let target_angle = angleBetween(this.x, this.y, this.target_x, this.target_y);
            let magnitude = clamp(Math.abs(target_angle), -param.draggingMaxAngle, param.draggingMaxAngle); // cap the maximum angle
            target_angle= Math.sign(target_angle) * magnitude;

            let distance_to_target = Math.round(Math.abs(this.delta_x) + Math.abs(this.delta_y)); // taxicab distance - if close enough, make it rotate back to vertical
            if(distance_to_target <= 40) target_angle = 0;



            // smooth transition
            this.angle =  (target_angle-this.angle) * param.draggingSmoothAngleSpeed + this.angle;

            

            rotate(this.angle);
            translate(-this.w/2, -this.h/2);

            //drawing a shadow
            fill(...param.cardShadowColor); // MAGIC NUMBER
            rect(0, this.h/2 + shadow_vertical_delta, this.w, this.h/2, 5, 10, 5, 10);
        }
        
        strokeWeight(param.cardBorderWeight)
        stroke(param.cardBorderColor)
        if(this.isFlipped) // back: dulux logo
        {
            // Border and background
            fill(param.deckBackgroundColor)
            rect(0, 0, this.w, this.h, 5, 10, 5, 10);

            // Draw dog logo
            let iw = 140;
            let ih = iw*card_back.height/card_back.width;
            let mx = (this.w  - iw)/2;
            let my = (this.h - ih)/2;
            image(card_back, mx, my, iw, ih)

            // Draw text logo
            let iw2 = 120;
            let ih2 = iw*logo.height/logo.width;
            let mx2 = (this.w  - iw2)/2;
            let my2 = my + ih2/2 + (this.h - ih2)/2;
            image(logo, mx2, my2, iw2, ih2)

            textAlign(CENTER);
            strokeWeight(0);
            fill(param.deckTextColor);
            textSize(32);
        }
        else // face: color and name
        {
            // Border and background
            fill(this.hex)
            rect(0, 0, this.w, this.h, 15, 5, 15, 5);

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
            textStyle(BOLD);
            textWrap(WORD);
            textSize(16);
            textAlign(RIGHT);

            text(this.name,this.w- param.cardW*0.9 -10, 30, param.cardW*0.9);
        }
        // debug
        //text(Math.round(Math.abs(this.delta_x) + Math.abs(this.delta_y)), 0 ,-10);
        translate(-this.x,-this.y);

    }

    pressed() // returns if it was pressed
    {
        let is_pressed = super.pressed();

        if(this.rollover)
        {
            if(mouseButton == RIGHT) // remove that card from the board
            {
                playmat.remove(this.index);
            }
        }

        return is_pressed;
    }
    

    released() // flip card to back
    {
        super.released();
        if (mouseButton == LEFT && this.rollover && this.elapsedDragged < 1)
        {
            this.isFlipped = !this.isFlipped;
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