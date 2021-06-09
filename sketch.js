var invisibleground
var die
var checkpoint
var jumps 
var score
var gameover
var restart
var collide
var gamestate="play"
var obgroup
 var cloudgroup   
var object
var ob1
var ob2
var ob3
var ob4
var ob5
var ob6
var cloudimage
var trex_running
var trexSprite
var Ground2
var Groundsprite
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  Ground2=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  gameover=loadImage("gameOver.png")
  restart=loadImage("restart.png")
  collide=loadAnimation("trex_collided.png")
  die=loadSound("die.mp3")
  checkpoint=loadSound("checkPoint.mp3")
  jumps=loadSound("jump.mp3")

}

function setup() {
  createCanvas(600,200);
  trexSprite= createSprite(50,150,1,1)
  trexSprite.addAnimation("trex",trex_running)
  trexSprite.addAnimation("collide",collide)
  trexSprite.scale=0.5
  Groundsprite=createSprite(300,180,600,10)
  Groundsprite.addImage("Ground2,",Ground2)
  invisibleground= createSprite(300,190,600,10)
  invisibleground.visible=false
  obgroup=createGroup()
  cloudgroup=createGroup()
  gs=createSprite(300,100,10,10)
  gs.addImage("gs", gameover)
  rs=createSprite(300,150,10,10)
  rs.addImage("rs",restart)
  rs.scale=0.5
  gs.scale=0.5
  score=0

  
}

function draw() {
  background("white")
  text("score="+score,500,50)

 if(gamestate=="play")
   
 {
   if(score%200==0){
     checkpoint.play()
   }
   gs.visible=false
   rs.visible=false
   trexSprite.changeAnimation("trex",trex_running)
   score=score+1
   
   if(keyDown("space")&&trexSprite.y>100)
    {
      trexSprite.velocityY=-8
      jumps.play()
      
      
    
    }
      
   trexSprite.velocityY=trexSprite.velocityY+1
   Groundsprite.velocityX=-8
    if(Groundsprite.x<0)
    {Groundsprite.x=300}
    pc()
  objects()
     if(trexSprite.isTouching(obgroup))
       {
         gamestate="end"
       die.play()
       }
   
   }
  if(gamestate=="end"){
    Groundsprite.velocityX=0
    obgroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    obgroup.setLifetimeEach(-7)
       cloudgroup.setLifetimeEach(-7)  
    gs.visible=true
   rs.visible=true
    trexSprite.changeAnimation("collide",collide)
    if (mousePressedOver(rs)){
      reset()
      
    }
  }
  
 
  trexSprite.collide(invisibleground)
  drawSprites()
  
 
   
     
    
      
    
 
  
}
function pc()
{
  if(frameCount%60==0)
  {
     cloud=createSprite(600,20,10,10)
  cloud.addImage("cloud",cloudimage)
  cloud.velocityX=-8
  cloud.y=random(0,60)
    cloud.lifetime=70
    cloudgroup.add(cloud)
  }
  
}
function objects(){
  if(frameCount%60==0)
    {
      object=createSprite(580,170,10,10)
      object.velocityX=-8
      var a=Math.round(random(1,6))
      console.log(a)
      switch(a)
    {
      case 1:object.addImage("objects",ob1)
        break
        case 2:object.addImage("objects",ob2)
        break
        case 3:object.addImage("objects",ob3)
    
        break
        case 4:object.addImage("objects",ob4)
        break
        case 5:object.addImage("objects",ob5)
        break
        case 6:object.addImage("objects",ob6)
        break
      
    }object.scale=0.5
        
        object.lifetime=70
        obgroup.add(object)
        
    }
  
}

  function reset(){
    gamestate="play"
    obgroup.destroyEach()
    cloudgroup.destroyEach()
  score=0
    
    
  }
  




