(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function(pos, vel) {
    this.RADIUS = 2;
    this.COLOR = "#f00";
    Asteroids.MovingObject.call(this, pos, vel, this.RADIUS, this.COLOR);
    this.LIFESPAN = 3000;
    this.alive = true;
    var that = this;
    setTimeout(function(){
      that.alive = false;
    }, this.LIFESPAN);
  };
  
  Bullet.inherits(Asteroids.MovingObject);
})(this);