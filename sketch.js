var START=1;          
var PLAY=2;
var END=0;
var gameState=START;
var start,startImage;
var bg,bgImage;
var player,playerImage;
var enemy,enemyImage,bossenemy,enemy2;
var ammoImage;
var gameover,gameoverImage;
var ammogrp,EnemyGrp;
var enemy2;

function preload(){
 startImage=loadImage("start page.png");
 bgImage=loadImage("bg.jpg");
 playerImage=loadImage("player.png");
 enemyImage=loadImage("2.png");
 ammoImage=loadImage("ammo.png");
 gameoverImage=loadImage("game over.jpg");   
 enemy2=loadImage("kamran.png");
   
}

function setup() {
    createCanvas(displayWidth-20,displayHeight-30);
 bg=createSprite(300,300,600,600)
 bg.addImage(bgImage);
  bg.velocityY=4;
  
  player=createSprite(300,500,50,80);
  player.addImage(playerImage);
  player.scale=0.2

  start=createSprite(300,300,windowWidth,windowHeight);
  start.addImage(startImage);
  start.scale=1.2;
  
  gameover=createSprite(300,300,600,600)
  gameover.addImage(gameoverImage);
  
  ammogrp= new Group();
  Enemygrp= new Group();

  camera.position.x=displayWidth/2-450;
  camera.position.y=displayHeight/2-50;
}

function draw() {
 background("white");
  
 if(bg.y>600){
     bg.y=300
     }
  if(gameState===START){
    Enemygrp.destroyEach()
     ammogrp.destroyEach();
    Enemygrp.setVisibleEach(false)
    bg.visible=false;
    player.visible=false;
    ammogrp.visible=false;
    gameover.visible=false;
    start.visible=true;
  }
       
  if(keyDown("s")){
    gameState=PLAY
    
  }
  if(gameState===PLAY){
     Enemygrp.visible=true;
    bg.visible=true;
    player.visible=true;
    ammogrp.visible=true;
    gameover.visible=false;
    startImage.visible=false;
    gameover.visible=false;
    start.visible=false;
    spawnEnemys();
 
    
   if(ammogrp.isTouching(Enemygrp)){
     Enemygrp.destroyEach()
    
     ammogrp.destroyEach(); 
   }
    
  if(keyDown("a")){
    createAmmo()
  }
    if(player.isTouching(Enemygrp)){
      gameState=END;
    }
    if(gameState===END){
    
      Enemygrp.destroyEach()
     ammogrp.destroyEach();
      player.destroy();
      start.destroy();
      bg.destroy();
      
      gameover.visible=true;
    }
  }
  
  player.x=World.mouseX;
  drawSprites();
  if(gameState===START){
    fill("blue");
    textSize(20);
    text("INSTRUCTIONS",20,180)
    text("(1)Press 's' to start the game.",20,210);
    text("(2)Press 'a' to Fire Ammo. ",20,230);
    text("(3)To move the player move your cursor.",20,250)
  }
}
function spawnEnemys(){
  if(frameCount%100===0){
enemy=createSprite(600,120,40,10);
    enemy.addImage(enemyImage);
    enemy.velocityY=6;
    enemy.scale=0.2;
    enemy.lifetime=500;
    
    enemy.x=Math.round(random(100,500))
    Enemygrp.add(enemy);
  }
}
function createAmmo(){
  var ammo=createSprite(300,500,20,20);
  ammo.addImage(ammoImage);
  ammo.scale=0.2
  ammo.x=player.x;
  ammo.y=player.y;
  ammo.velocityY=-3;
  ammo.lifetime=200;
  ammogrp.add(ammo)
}
