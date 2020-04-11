const canvas= document.querySelector("canvas");
const ctx=canvas.getContext("2d");
let score=0;
let button;
let box=32;
let arr=[1,2,3,4];
let head={x:0,y:0};
let variable=false;

arr.push(5);
console.log(arr);
const ground= new Image();
ground.src= "/img/ground.png";

const snakehead=new Image();
snakehead.src="/img/snakehead.png";

const snakebody=new Image();
snakebody.src="/img/snakebody.png";

const snaketail=new Image();
snaketail.src="/img/snaketail.png";

const food1= new Image();
food1.src="/img/food.png";

for(let i=arr.length-1; i>=0; i--){
    console.log(arr[i]);
}

//create snake
let snake=[];
snake[0]={
    x:9* box, 
    y:10 *box,
}

//create food
var food={
    x:Math.floor(Math.random()*17+1) * box,
    y:Math.floor(Math.random()*15+3) * box
}

//create collusion with snake

function collision(head, snake){
   for(let i=1; i<snake.length; i++){
        if(head.x== snake[i].x && head.y==snake[i].y){
            return true;
        }
   }
   return false;
}
//food collusion with snakebody

function foodcollision(){
    for(let z=0; z<snake.length;z++){
        if(snake[z].x== food.x && snake[z].y==food.y){
            return true;
        }
    }
    return false;;

}


document.addEventListener("keydown",(e)=>
{
    let key=e.keyCode;
    if(key==65 && button!="RIGHT"){
        button="LEFT";       
    }
    else if(key==87 && button!="DOWN"){
        button="UP";       
    }
    else if(key==68 && button!="LEFT"){
        button="RIGHT";       
    }
    else if(key==83 && button!="UP"){
        button="DOWN";        
    }

});

function draw(){

    ctx.drawImage(ground,0,0); 
    (variable)? food={x:Math.floor(Math.random()*17+1) * box,
                           y:Math.floor(Math.random()*15+3) * box}        
                    :ctx.drawImage(food1,food.x,food.y);    
   
    for(let i=0; i<snake.length; i++){
        (i==0)?ctx.drawImage(snakehead,snake[i].x,snake[i].y):(i>0 && i<=snake.length-2 )? ctx.drawImage(snakebody,snake[i].x,snake[i].y)
        :ctx.drawImage(snaketail,snake[i].x,snake[i].y)
      
    }
 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(button=="LEFT"){snakeX-=box;}
    if(button=="RIGHT"){snakeX+=box;}
    if(button=="UP"){snakeY-=box;}
    if(button=="DOWN"){snakeY+=box;}  
    
    //collusions

    (head.x==food.x && head.y==food.y)? 
        (score++,        
         food={x:Math.floor(Math.random()*17+1) * box,
               y:Math.floor(Math.random()*15+3) * box} 
        ): 
         snake.pop();    
    
    variable=foodcollision();
    head={
            x:snakeX,
            y:snakeY
        }   

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(head,snake)){
            clearInterval(game);
    }
    
    snake.unshift(head);

    ctx.fillStyle="white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);

}

let game= setInterval(draw,140);