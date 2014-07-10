(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
    this.COLOR = '#ccc';
    this.radius = radius;
    Asteroids.MovingObject.call(this, pos, vel, this.radius, this.COLOR);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  var randomVec = function(maxV) {
    var angle = Math.random() * Math.PI * 2;
    var vel = Math.random() * maxV;
    var xV = Math.cos(angle) * vel;
    var yV = Math.sin(angle) * vel;
    
    return [xV, yV];
  }
  
  Asteroid.randomAsteroid = function(dimX, dimY, radius) {
    var x = Math.random() * dimX;
    var y = Math.random() * dimY;

    return new Asteroid([x, y], randomVec(3), radius);
  };
  
  Asteroid.prototype.makeBabyAsteroid = function() {
    return new Asteroid([this.pos[0], this.pos[1]], randomVec(3), this.radius/2);
  };
  
  Asteroid.prototype.shatter = function(dimX, dimY) {
    if (this.radius > 10) {
      var children = [];
      for (var i = 0; i < 3; i++) {
        children.push(this.makeBabyAsteroid());
      }
      return children;
    } else {
      return false;
    }
  };
  
})(this);