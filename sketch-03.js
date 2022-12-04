const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const sketch = ({ context, width, height }) => {

  const agents = [];

  const qty = random.range(20, 100);

  for (let i = 0; i < qty; i++) {

    const x = random.range(0, width);
    const y = random.range(0, height);; 

    agents.push(new Agent(x, y));
    
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.update();
      agent.bounce(width, height);
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  bounce(width, height){
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save()
    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}