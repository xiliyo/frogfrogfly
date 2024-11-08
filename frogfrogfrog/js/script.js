/**
 * Frogfrogfly
 * Carael Bandojo
 * 
 * A game of catching flies with your frog-tongue, except with capitalism
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies of black, purple, blue, and brown variety.
 * - Participate in the frog economy with the shop button
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

/*VARIABLES---------------------------------------------------------*/ 

// States for each screen of the game
const States = {
  TITLE: "title",
  GAME: "game",
  SHOP: "shop"
};


/**TITLE STATE VARIABLES**/
 
// Background image variable.
let img; 

// Start out with the state being the title screen on play
let state = States.TITLE;

// A bunch of random silly phrases that will go under the title
let subtitle = [
  'Now with added capitalism!', 
  'We coloured the flies!', 
  'Oh god.', 
  'I love frogggggggggggggggg.', 
  'Protip: Click to lick.', 
  'Apparently this is my life now.', 
  'I miss my wife, tails.', 
  'Sometimes you just gotta frog.', 
  'Yeahhhh the visuals still suck but hey, now there is a shop!',
  'The black flies are the normal ones, by the way. They dont do anything special.',
  'The purple flies make your tongue go slower! Permanently!',
  'The blue flies have something in it that will make you go brrr...',
  'The brown flies deduct points... Cause they are NOT flies...',
  'Press E to shop.'
];

// Current subtitle, will be random.
let currentSubtitle;

// Label the title
let titleString = "FrogFrogFly";


/**GAME STATE VARIABLES**/

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    // The frog's eyes has a position, and size
    eyes:  {
        x:  [-50, 50],
        y: 450,
        size:  [50,10]
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 20, // Will be random
    speed: 3,
    color: "rgb(0,0,0)" // Default color
};

let flyColor = ["rgb(0,0,0)", "rgb(133,0,255)", "rgb(0,18,255)", "rgb(100,78,62)"];


/**SHOP STATE VARIABLES**/

// Name for shop button
const shopButtonString = "press E to shop";

// Title for shop state
const shopTitleString = "SHOP";

// Store the score
let score = 0; 

// Store the speed stackables
let speedBuff = 0;

// Store the speed stackables price
let speedPrice = 1;

// Store the size stackables
let sizeBuff = 0;

// Store the size stackables price
let sizePrice = 1;

/*************************************************************************/

/**
 * Loads image before canvas setup
 */
function preload() {
    img = loadImage('/assets/beautifulSky.gif');
  }

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Select a random subtitle when the game starts
    currentSubtitle = random(subtitle);
    // Give the fly its first random position
    resetFly();
}

/**
 * Draws the screen based on state
 */
function draw() {
    // Title state
    if (state === States.TITLE) {
        title();
    } // Game state
    else if (state === States.GAME) {
        game();
    } // Shop State
    else if (state === States.SHOP) {
        shop();
    }
}

/*TITLE STATE---------------------------------------------------------*/

/**
 * Draws the Title state
 */
function title() {
    background("black");
    
    // Draw main title
    push();
    fill("#ffffff");
    textSize(30);
    textAlign(CENTER);
    text(titleString, width / 2, height / 2 - 30);
    pop();
    
    // Draw subtitle
    push();
    fill("#ffffff");
    textSize(16);
    textAlign(CENTER);
    text(currentSubtitle, width / 2, height / 2 + 10);
    pop();
    
    if (mouseIsPressed) {
        state = States.GAME;
    }
}

/*GAME STATE---------------------------------------------------------*/

/**
 * Draws the Game state
 */
function game() { 
    drawBackground();
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawShopButton();
    drawScore();
}

/**
 * Simply loads an image of the pretty blue sky
 */
drawBackground() {
    // Shows the beautiful sky
    image(img, 0, 0);
    describe('A gif of clouds over a briliant blue sky.');
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
    fly.size = random(5, 30) + sizeBuff;
    fly.speed = random(3, 9);
  
    // Randomly select a color from the flyColor array
    fly.color = random(flyColor);
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill(fly.color);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    // Draw the frog's eyes
    push();
    fill("#ffffff");
    noStroke();
    ellipse(frog.eyes.x[0] + mouseX, frog.eyes.y, frog.eyes.size[0]);
    pop();
  
    push();
    fill("#ffffff");
    noStroke();
    ellipse(frog.eyes.x[1] + mouseX, frog.eyes.y, frog.eyes.size[0]);
    pop();
  
    // Draw frog's pupils
    push();
    fill("#000000");
    noStroke();
    ellipse(frog.eyes.x[0] + mouseX, frog.eyes.y, frog.eyes.size[1]);
    pop();
  
    push();
    fill("#000000");
    noStroke();
    ellipse(frog.eyes.x[1] + mouseX, frog.eyes.y, frog.eyes.size[1]);
    pop();
}

/*GAME CALCULATIONS---------------------------------------------------------*/

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Add to the score
        calculateScore();  
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

/**
 * Add keyboard handling for the shop
 */
function keyPressed() {
    if (key === 'e' || key === 'E') {
        if (state === States.GAME) {
            state = States.SHOP;
        }
    }
}

/**
 * Adds to score
 */
function calculateScore() {
    if(fly.color === "rgb(0,0,0)") {  // Black fly (normal) 
        score += 1;
    } else if (fly.color === "rgb(133,0,255)") {  // Purple fly (slows tongue)
        score += 2;
        frog.tongue.speed -= 1; // Decrease speed 
    } else if (fly.color === "rgb(0,18,255)")  {  // Blue fly (speed boost)
        score += 3;
        frog.tongue.speed += 1;
    } else if (fly.color === "rgb(100,78,62)") {// Brown fly (penalty)
        score -= 1; // Subtract point
    }
}

/**
 * Draws the shop button for the game state
 */
function drawShopButton() {
    push();
    fill("#ffffff");
    textSize(30);
    textAlign(RIGHT);
    text(shopButtonString, width, 30);
    pop();
}

/*SHOP STATE---------------------------------------------------------*/

/**
 * Draws shop state
 */
function shop() {
    background("#4a4a4a");
    drawScore();
    drawShopTitle();
    drawShopItems();
    drawBackButton();
    checkGoBack();
    checkPurchase();
}

/**
 * Draws shop title
 */
function drawShopTitle() {
    push();
    fill("#ffffff");
    textSize(30);
    textAlign(CENTER);
    text(shopTitleString, width/2, 60);
    pop();
}
  
/**
 * Draws shop items
 */
function drawShopItems() {
    push();
    fill("#ffffff");
    textSize(30);
    textAlign(CENTER);
    text("Press 1 for a tongue speed boost\nPRICE: " + speedPrice + "\n\n" +
         "Press 2 for a fly size boost\nPRICE: " + sizePrice,
        width/2, 150);
    pop();
}

function drawBackButton() {    
    push();
    fill("#ffffff");
    rect(20, height - 60, 100, 40);
    fill("#000000");
    textSize(20);
    textAlign(CENTER);
    text("Back", 70, height - 35);
    pop();
}
    
function checkGoBack() {    
    if (mouseIsPressed) {
        state = States.GAME;   
    }
}
  
function checkPurchase() {
    // If the user presses 1 and has enough money to purchase speed buff
    if (keyIsPressed && key === '1' && score >= speedPrice) {
        // Increase speed by 2 
        speedBuff += 2;
        // Decrease the score as payment
        score -= speedPrice;
        // Increase future price of speed
        speedPrice += 2;
    // If the user presses 2 and has enough money to purchase size buff
    } else if (keyIsPressed && key === '2' && score >= sizePrice) {
        // Increase size by 2 
        sizeBuff += 2;
        // Decrease the score as payment
        score -= sizePrice;
        // Increase future price of size
        sizePrice += 2;
    }  
}

function drawScore() {
    push();
    fill("#ffffff");
    textSize(30);
    textAlign(LEFT);
    text(score, 20, 40);
    pop();
}  