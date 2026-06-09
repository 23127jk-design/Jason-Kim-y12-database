let score = 0;
let restart = false;
let randNum;
let coins = 0;
let win = 0;
let timer = 1;
let player;
let gamestate = "menu";
let gamestart = 0;
//this makes the timer show up
let startTime = 0;
let currentTime = 0;
let timeUp = false;
let secondTimer = 0;
let intervalID;
intervalID = setInterval(() => {
  secondTimer = secondTimer + 1;
}, 1000); //1000ms timer


function setup() {
  cnv = new Canvas(800, 800);
  console.log("setup:");

  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.color = 'black';
  wallLH.bounciness = 0;
  wallRH = new Sprite(800, 400, 25, 800, 'k');
  wallRH.bounciness = 0;
  wallTop = new Sprite(400, 0, 800, 25, 'k');
  wallTop.bounciness = 0;
  wallBot = new Sprite(400, 800, 800, 25, 'k');
  wallBot.bounciness = 0;

  player = new Sprite(755, 755, 65, 65, 'd');
  player.color = ('rgb(0, 0, 0)');
  player.friction = 0;
  player.bounciness = 0;
  //this should make the player not spin when colliding with certain platforms or walls.
  player.collider = 'dynamic';
  player.rotationlock = true;
  //end goal is the portal
  portal = new Sprite(760, 168, 60, 60, 'k');
  portal.bounciness = 0;
  portal.color = ('rgb(135, 0, 153)')

  platform_1 = new Sprite(380, 400, 600, 10, 'k');
  platform_1.friction = 0;
  platform_1.bounciness = 0;
  platform_2 = new Sprite(600, 200, 800, 10, 'k');
  platform_2.bounciness = 0;
  wallRH_2 = new Sprite(600, 700, 25, 600, 'k');
  wallRH_2.bounciness = 0;
  platform_3 = new Sprite(200, 600, 630, 10, 'k');
  platform_3.bounciness = 0;
  platform_4 = new Sprite(737, 600, 100, 10, 'k');
  platform_4.bounciness = 0;
  platform_4.drag = 0;

  box = new Sprite(760, 568, 50, 50, 'k');
  box.bounciness = 0;
  box.color = '56be5b';

  box_2 = new Sprite(30, 630, 50, 50, 'k');
  box_2.bounciness = 0;
  box_2.color = '56be5b';

  box_3 = new Sprite(563, 430, 50, 50, 'k');
  box_3.bounciness = 0;
  box_3.color = '56be5b';

  //coins in some parts of the map
  coinsGroup = new Group();
  //circle = new Sprite(width/2, height/2, 50, 'd');
  const VELARRAY = [-1, 1];

  randNum = random(2, 5) * random(VELARRAY);
  for (i = 0; i < 5; i++) {
    coins = new Sprite(width / 2, height / 2, 50, 'd');
    coins.color = 'rgb(255, 255, 255)'
    coins.bounciness = 0;
    coins.friction = 0;
    coinsGroup.add(coins);
  }
  box.collides(player, func2call);
  box_2.collides(player, func3call);
  box_3.collides(player, func4call);
  player.collides(portal, func5call);
  coinsGroup.collides(player, func6call);

}

function deleteSprites() {
  player.remove();
  box.remove();
  box_2.remove();
  box_3.remove();
  wallBot.remove();
  wallLH.remove();
  wallRH.remove();
  wallRH_2.remove();
  wallTop.remove();
  portal.remove();
  coinsGroup.removeAll();
  platform_1.remove();
  platform_2.remove();
  platform_3.remove();
  platform_4.remove();

}

//the stars that get collected when player collides with the stars
// this makes the player get the point and the point disappear after player collects it.
function func2call(_ssss, _player) {
  score = score + 1;
  _ssss.remove();
};
function func3call(_ssss, _player) {
  score = score + 1;
  _ssss.remove();
};
function func4call(_ssss, _player) {
  score = score + 1;
  _ssss.remove();
};
function func5call(_ssss, _portal) {
  _ssss.remove();
  win = win + 1;
};
function func6call(_ssss, _player) {
  _ssss.remove();
  coins = coins + 1;
};

function draw() {
  if (gamestart != 1) {
    secondTimer = 0
    coins = 0;
  }

  //background('rgb(117, 104, 104)');

  if (gamestate === "play") {
    //movement making it to one side very quickly and not go diagonal.
    // player.vel.x = 0;
    // player.vel.y = 0;
    if (kb.pressing('up') && !kb.pressing('down') && !kb.pressing('left') && !kb.pressing('right')) {
      player.vel.y = -37;
    }
    if (kb.pressing('down') && !kb.pressing('up') && !kb.pressing('right') && !kb.pressing('left')) {
      player.vel.y = 37;
    }
    if (kb.pressing('left') && !kb.pressing('up') && !kb.pressing('right') && !kb.pressing('down')) {
      player.vel.x = -37;
    }
    if (kb.pressing('right') && !kb.pressing('up') && !kb.pressing('down') && !kb.pressing('left')) {
      player.vel.x = 37;
    }
  }

  fill(0);
  textSize(20);
  text("score: " + score, 10, 30);
  text("win:" + win, 10, 100);
  var name = " player";
  text("welcome" + name, 100, 30);
  text("the arrow keys are your movements", 400, 30)
  text("timer:" + secondTimer, 10, 50)
  text("coins:" + coins, 10, 150);

  if (gamestate === "menu") {
    drewMenu();
  }
  else if (gamestate === "play") {
    drawGame();
  }
  else if (gamestate === "gameover") {
    drawGameOver();
  }
}

function drewMenu() {
  background('rgb(49, 168, 95)');
  textSize(20);
  text("press 'space' to start", 400, 50)
  var name = " player";
  text("welcome" + name, 100, 30);
  text("WASD or the arrow keys are your movement.", 360, 30);
  if (restart == true) {
    deleteSprites();
    setup();
    secondTimer = 0;
    score = 0;
    gamestart = 0;
    win = 0;
    coins = 0;
    timeUp = false;
    restart = false;
  }
  if (kb.pressing('space')) {
    gamestate = "play";
    gamestart = 1;
  }
  console.log("menu");
  console.log('timerstarted')
  console.log(gamestate);
  console.log("gamestart = " + gamestart);
}

function drawGame() {
  background('rgb(117, 104, 104)');
  fill(0);
  textSize(20);
  text("reach the portal after the stars are collected.", 360, 30);
  text("score: " + score, 10, 30);
  text("win:" + win, 10, 100);
  text("timer:" + secondTimer, 10, 50);
  text("coins:" + coins, 10, 150);
  if (secondTimer >= 10) {
    fill(0, 0, 0);
    background(200);
    textSize(35);
    text("time's up", 100, 100);
  }
  //if gamestart is 1 then timer starts
  if (gamestart == 1) {
    if (secondTimer >= 10 && win == 0) {
      timeUp = true;
    }
    if (timeUp == true) {
      gamestate = "gameover"
    }
  }
  if (player.collides(portal)) {
    gamestate = "gameover"
    win = 1;
  }
  // score the shows on the screen
  if (win >= 1 && score >= 0) {
    fill(0, 0, 0);
    background(200);
    textSize(30);
    text("you skipped the all the stars in the level.", 50, 100);
    text("press m to restart", 50, 150);
    if (kb.pressing('m')) {
      restart = true;
      gamestate = "menu";
    }
  }
  if (win >= 1 && score >= 1) {
    fill(0, 0, 0);
    background(200);
    textSize(35);
    text("you have 33% stars in the level.", 100, 100);
    text("press m to restart", 50, 150);
    if (kb.pressing('m')) {
      restart = true;
      gamestate = "menu";
    }
  }
  if (win >= 1 && score >= 2) {
    fill(0, 0, 0);
    background(200);
    textSize(35);
    text("you have 66% stars in the level.", 100, 100);
    text("press m to restart", 50, 150);
    if (kb.pressing('m')) {
      restart = true;
      gamestate = "menu";
    }
  }
  if (win >= 1 && score >= 3) {
    fill(0, 0, 0);
    textSize(37);
    background(200);
    text("you 100% the level.", 100, 100);
    text("press m to restart", 50, 150);
    if (kb.pressing('m')) {
      restart = true;
      gamestate = "menu";
    }
  }
}

function drawGameOver() {
  background('rgb(179, 62, 62)')
  fill(0, 0, 0);
  textSize(37)
  text("you lost. press m to go menu", 100, 100);

  if (kb.pressing('m')) {
    restart = true;
    gamestate = "menu";
  }
}