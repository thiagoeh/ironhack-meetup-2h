// Some app setup.
const ENEMIES_STORE = [];
const ENEMIES_SIZE = 50;
const ENEMIES_COLORS = [
  'red', 'blue', 'yellow', 'white',
  'green', 'purple', 'navy', 'silver', 'olive',
  'lime', 'fuchsia', 'teal', 'aqua', 'maroon'
];
const HERO_SIZE = ENEMIES_SIZE;
const HERO_COLOR = 'grey';

// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Our looper control.
let looper;

// Animation frames counter.
let frames = 0;

// Our class that will generate enemies instances.
class Enemy {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = ENEMIES_SIZE;
    this.height = ENEMIES_SIZE;
    // Getting a random color when the object is instantiated.
    this.color = ENEMIES_COLORS[Math.floor(Math.random() * ENEMIES_COLORS.length)];
  }

  draw() {
    this.y += 1;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, ENEMIES_SIZE, ENEMIES_SIZE);  
  }
}

// Our Hero class.
class Hero {
  constructor() {
    this.x = 0;
    this.y = canvas.height - HERO_SIZE;
    this.width = HERO_SIZE;
    this.height = HERO_SIZE;
    this.color = HERO_COLOR;
  }

  draw() {
    // Prevent our hero from going beyond the available area.
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - HERO_SIZE) this.x = canvas.width - HERO_SIZE;

    // Drawing the hero itself.
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, HERO_SIZE, HERO_SIZE);  
  }
}

// This function just instantiate one enemy in a random x position and add it to the array of enemies.
const createEnemy = () => {
  // Each 50 frames we create a new enemy.
  if (frames % ENEMIES_SIZE === 0) {
    // Set enemy x coordinate from 0 to 450.
    const x = Math.floor(Math.random() * 10) * ENEMIES_SIZE;
    // Adding the enemy to the array of enemies.
    ENEMIES_STORE.push(new Enemy(x));
  }
}

// This functions performs a loop in the enemies array and draw each enemy.
const drawEnemies = () => {
  // Drawing all enemies.
  ENEMIES_STORE.forEach(enemy => enemy.draw());
}

// We just need one hero, so let's instantiate it.
const ourHero = new Hero();

// Canvas cleaner.
const resetCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

// Each loop we call render function.
const render = () => {
  // We clean everything in the canvas.
  resetCanvas();

  // Incremeting frames for each loop.
  frames += 1;

  // Drawing our hero.
  ourHero.draw();

  // Intantiate one new enemy at a random x position and add it to the enemies array.
  createEnemy();

  // Draw all enemies available in the enemies array.
  drawEnemies();
}

// Keyboard listener to check if the user press arrows keys.
window.addEventListener('keydown', (e) => {
  // Left arrow key.
  if (e.keyCode === 37) {
    if (ourHero.x <= 0) return;
    ourHero.x -= HERO_SIZE;
  }
  // Right arrow key.
  if (e.keyCode === 39) {
    if (ourHero.x >= canvas.width - HERO_SIZE) return;
    ourHero.x += HERO_SIZE;
  }    
});

// Starting looper.
looper = setInterval(render, 0);