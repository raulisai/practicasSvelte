<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  let canvas;
  let ctx;

  onMount(() => {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";

    class Player {
      constructor(game) {
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 50;
        this.speedx = 0;
        this.speedy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speedModifier = 20;
      }
      draw(context) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();
      }
      update() {
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
        const distance = Math.hypot(this.dy, this.dx);
        if (distance > this.speedModifier) {
          this.speedx = this.dx / distance || 0;
          this.speedy = this.dy / distance || 0;
        }else{
          this.speedx =  0;
          this.speedy =  0;
        }

        this.collisionX += this.speedx * this.speedModifier;
        this.collisionY += this.speedy * this.speedModifier;
      }
    }


    class Obstacle{
       constructor(game){
        this.game = game;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this.collisionRadius = 30;
        this.image = document.getElementById("obstacles");
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX= this.collisionX - this.width * 0.5 ;
        this.spriteY= this.collisionY - this.height * 0.5;


       }
       draw(context){
        context.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight, this.collisionX, this.collisionY, this.width, this.height);
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
       }
    }

    class Game {
      constructor() {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.Player = new Player(this);
        this.numberOfObstacles = 1;
        this.obstacles = [];
        this.mouse = {
          x: this.width * 0.5,
          y: this.height * 0.5,
          pressed: false,
        };

        canvas.addEventListener("mousedown", (event) => {
          this.mouse.pressed = true;
          this.mouse.x = event.offsetX;
          this.mouse.y = event.offsetY;
        });
        canvas.addEventListener("mouseup", (event) => {
          this.mouse.x = event.offsetX;
          this.mouse.y = event.offsetY;
          this.mouse.pressed = false;
        });
        canvas.addEventListener("mousemove", (event) => {
          this.mouse.x = event.offsetX;
          this.mouse.y = event.offsetY;
        });
      }

      render(context) {
        this.Player.draw(context);
        this.Player.update();
        this.obstacles.forEach((obstacle) => {
          obstacle.draw(context);
        });
      }
      iniciar(){
      let attempts=0;
      while(this.obstacles.length < this.numberOfObstacles && attempts < 1500){
        const testobstacle = new Obstacle(this);
        let overlap = false;
        this.obstacles.forEach((obstacle) => {
          const dx = testobstacle.collisionX - obstacle.collisionX;
          const dy = testobstacle.collisionY - obstacle.collisionY;
          const distance = Math.hypot(dx, dy);
          const sumOfRadius = testobstacle.collisionRadius + obstacle.collisionRadius;
          if(distance < sumOfRadius){
            overlap=true;
          }

        });
        if(!overlap){
          this.obstacles.push(testobstacle);
        }
        attempts++;
        
      }  

      
      }
    }

    const game = new Game(canvas);
    game.iniciar();
    console.log(game);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.render(ctx);
      window.requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<svelte:head>
  <title>Bullseye</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<canvas id="canvas1" />
<img src="./zombi-images/overlay.png" id="overlay" alt="overlay" />
<img src="./zombi-images/obstacles.png" id="obstacles" alt="obstacles" />

<style>
  #canvas1 {
    background: url("./zombi-images/background.png");
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  #obstacles{
    display: none;
  }
</style>
