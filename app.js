// Getting the DOM element.
const canvas = document.getElementById('my-canvas');

// Getting the 2d context.
const ctx = canvas.getContext('2d');

// Drawing the little rectangle.
ctx.fillStyle = 'grey';
ctx.fillRect(230, 230, 50, 50);

ctx.fillStyle = 'blue'
ctx.fillRect(50,50, 200, 200)