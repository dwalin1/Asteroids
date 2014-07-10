(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };
  
  MovingObject.prototype.move = function(dimX, dimY) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    
    if (this.pos[0] < 0) this.pos[0] += dimX;
    if (this.pos[1] < 0) this.pos[1] += dimY;
    
    if (this.pos[0] > dimX) this.pos[0] -= dimX;
    if (this.pos[1] > dimY) this.pos[1] -= dimY;
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var xDistance = this.pos[0] - otherObject.pos[0];
    var yDistance = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
    var sumOfRadii = this.radius + otherObject.radius;
    return (distance < sumOfRadii);
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

})(this);