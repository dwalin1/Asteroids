Function.prototype.inherits = function(SuperClass) {
  var Surrogate = function(){};
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
};(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Ship = Asteroids.Ship = function(pos) {
    this.RADIUS = 10;
    this.COLOR = "#f00";
    this.INVINCIBLECOLOR = '#00f'
    this.orientation = (Math.PI / 2);
    this.TURNRATE = Math.PI / 16;
    this.ACCEL = 0.2;
    this.MUZZLE_VELOCITY = 5;
    Asteroids.MovingObject.call(this, pos, [0, 0], this.RADIUS, this.COLOR);
    this.becomeInvincible();
    this.refracting = false;
    this.REFRACTORY_PERIOD = 300;
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1])
    ctx.rotate(-this.orientation);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.strokeStyle = (this.invincible ? this.INVINCIBLECOLOR : this.COLOR);
    ctx.stroke();
    ctx.fillStyle = (this.invincible ? this.INVINCIBLECOLOR : this.COLOR);
    ctx.fill();
    ctx.restore();
  };
  
  Ship.prototype.ccw = function() {
    this.orientation += this.TURNRATE;
  };
  
  Ship.prototype.cw = function() {
    this.orientation -= this.TURNRATE;
  };

  var getNewVelocity = function(accel) {
    var dX = this.vel[0] + Math.cos(this.orientation) * accel;
    var dY = this.vel[1] - Math.sin(this.orientation) * accel;
    return [dX, dY];
  };
    
  Ship.prototype.impulse = function() {
    this.vel = getNewVelocity.call(this, this.ACCEL);
  };
  
  Ship.prototype.fire = function() {
    if (!this.refracting) {
      this.refracting = true;
      var that = this;
    
      setTimeout(function(){
        that.refracting = false;
      }, this.REFRACTORY_PERIOD);
    
      var bVel = getNewVelocity.call(this, this.MUZZLE_VELOCITY);
      return new Asteroids.Bullet([this.pos[0], this.pos[1]], bVel);
    } else {
      return false;
    }
  };
  
  Ship.prototype.becomeInvincible = function() {
    this.invincible = true;
    var that = this;
    setTimeout(function(){
      that.invincible = false;
    }, 3000);
  };
  
})(this);