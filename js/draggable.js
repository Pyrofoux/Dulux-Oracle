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

      this.target_x = x;
      this.target_y = y;

      this.elapsedDragged = 0;
    }

    update() {

      // Adjust location if being dragged
      if (this.dragging) {


        this.target_x = mouseX + this.offsetX;
        this.target_y = mouseY + this.offsetY;

        //let new_x = mouseX + this.offsetX,  new_y = mouseY + this.offsetY;
        this. delta_x = this.target_x-this.x
        this.delta_y = this.target_y-this.y;
        if(this.delta_x != 0 || this.delta_y != 0)
        {
          this.elapsedDragged += 1; // number of frames it has been dragging

          let c = 0.5; // move by a percentage of the remaining distance // MAGIC NUMBER: speed
          this.x += c*this.delta_x;
          this.y += c*this.delta_y;

          // Make it reach when it's close enough
          if(Math.abs(this.delta_x) < 1) this.x = this.target_x;
          if(Math.abs(this.delta_y) < 1) this.y = this.target_y;

        }

        // this.x = new_x;
        // this.y = new_y;

        // test: terrible
        // this.tilt_angle = -Math.atan2(new_y - this.y, new_x - this.x) * 180 / Math.PI;
        // this.x += clamp(new_x - this.x, -50, 50);
        // this.y += clamp(new_y - this.y, -50, 50);
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

        this.elapsedDragged = 0;
        return true;
      }
      return false;
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

    animate(target_x, target_y)
    {
      this.target_x = target_x;
      this.target_y = target_y;
    }

  }