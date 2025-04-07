const canvas = document.querySelector('.purple_squere');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

class Ball {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radio = 10;
        this.dirX = Math.random() * 2 -1;
        this.dirY = Math.random() * 2 -1;
        this.speed = 3;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radio, 0, Math.PI *2);
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;

        if(this.x + this.radio > canvas.width || this.x < 0){
            this.dirX *= -1;
        }

        if(this.y + this.radio > canvas.height || this.y < 0){
            this.dirY *= -1;
        }
    }
}

let bolas = []

for(let i =0; i<20; i++){
    bolas.push(new Ball(canvas.width /2, canvas.height /2));
}

function animar(){

    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';

    bolas.forEach(bola=>{

        bolas.forEach(bola2 =>{

            let dx= bola2.x - bola.x; 
            let dy= bola2.y - bola.y; 
            let dist = Math.sqrt(dx ** 2 + dy ** 2);

            if(dist < 100){
                ctx.beginPath();
                ctx.moveTo(bola.x, bola.y);
                ctx.lineTo(bola2.x, bola2.y);
                ctx.stroke();
                ctx.closePath();
            }     
        })

        bola.draw()
        bola.move()
    })

    requestAnimationFrame(animar)
}

animar();
