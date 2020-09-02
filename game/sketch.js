var PLAY=1;
var END=0;
var gamestate=PLAY;

var jungle,jungleImg;
var monkey , monkeyrun
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var num;

var ground;

function preload(){
  
 
  monkeyrun=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);

  //jungle=createSprite(200,200,400,400);
  //jungle.addImage("jungleImg");
  
  monkey=createSprite(20,330,50,50)
  monkey.addAnimation("monkeyrun")
  monkey.scale=0.5;

  ground=createSprite(200,350,400,10);
 //ground.velocityX=-2
// ground.x=width/2
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
  num=0;
  
}


function draw() {
background("white")
  
  text("Survival Time:"+score,300,20);
  text("Bananas:"+num,30,20);
  
  if(gamestate===PLAY){
     //ground.velocityX=-3
     score=score+Math.round(getFrameRate()/60)

    if(keyDown("space")&& monkey.y>=330){
       monkey.velocityY=-15;
       }
    monkey.velocityY=monkey.velocityY+0.5;
     
  food();
  rock();
    
 
    if(monkey.isTouching(FoodGroup)){
       
      num=num+1;
     FoodGroup.destroyEach();
       }
    
    if(monkey.isTouching(obstacleGroup)){
    gamestate=END;
    } 
  }  else if(gamestate===END){
        monkey.velocityY=0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
             }
    drawSprites();
  
  monkey.collide(ground);
}
function food(){
if(frameCount%80===0){
  banana=createSprite(390,200,20,20)
  banana.y=Math.round(random(120,200))
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3

  banana.lifetime=200;
  
FoodGroup.add(banana);
}
}

function rock(){
if(frameCount%200===0){
  obstacle=createSprite(390,330,30,30);
   obstacle.addImage(obstacleImage)
  obstacle.velocityX=-3;
  obstacle.debug=false;
  obstacle.setCollider("circle",0,0,250);
  
 obstacle.x=Math.round(random(390,390));                     
 obstacle.scale=0.1;
 
obstacleGroup.add(obstacle)

}
}




