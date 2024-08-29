// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>, modified by Younès Rabii

class Draggable {
    constructor(x,y,w,h) {
  
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse? Managed by the CursorManager
  
  
      this.x = x;
      this.y = y;
      this.w = w; // Dimensions
      this.h = h;
    }

    update() {

      // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
        curs.setIcon("move") // Change icon
      }
      else
      {
        // Change icon
        if(this.rollover && curs.icon != "move")
        {
          curs.setIcon("grab")
        }
        else if(curs.icon != "move" && curs.icon != "grab")
        {
          curs.setIcon("default")
        }
      }
      
  
    }
  
    show() {
  
      stroke(0);
      // Different fill based on state
      if (this.dragging) {
        fill(50);
      } else if (this.rollover) {
        fill(100);
      } else {
        fill(175, 200);
      }
      rect(this.x, this.y, this.w, this.h, 10, 5, 10, 5);
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (this.rollover) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
        return true;
      }
    }
  
    released() {
      if(this.dragging)
      {
        // Quit dragging
        this.dragging = false;


        if(param.snapToGrid) // disabled by default
        {
          //snap to grid
        if((this.x % param.gridSize) != 0)
          {
            this.x = Math.floor(this.x / param.gridSizeX) * param.gridSizeX;
          }

          if((this.y % param.gridSize) != 0)
          {
            this.y = Math.floor(this.y / param.gridSizeY) * param.gridSizeY;
          }
        }
        

      }
    }

  }