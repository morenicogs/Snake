const gridScaleX = 16;
const gridScaleY = 16;
class Snake {
	constructor() {
		this._posX = Math.floor(Math.random() * gridScaleX) + 1;
		this._posY = Math.floor(Math.random() * gridScaleY) + 1;
		this._position = [this._posX, this._posY];
		this.length = 1;
		this.body = [this._position];
		this.speed = 150;
		this.apple = [Math.floor(Math.random() * gridScaleX) + 1, Math.floor(Math.random() * gridScaleY) + 1]
		this.alive = true;
	}
	get posX() {
		return this._posX;
	}
	get posY() {
		return this._posY;
	}
	get position() {
		return this._position;
	}

	set posX(x) {
		if(x == 0){
			x = gridScaleX;
		}
		if(x == gridScaleX + 1){
			x = 1;
		}
		this._posX = x;
		this.position = [x, this._posY];
	}

	set posY(y) {
		if(y == 0){
			y = gridScaleY;
		}
		if(y == gridScaleY + 1){
			y = 1;
		}
		this._posY = y;
		this.position = [this._posX, y];
	}

	set position(array){
		this._position = array
		this.checkForApple();
		this.checkForBody();
		this.body.unshift(array);
		if(this.body.length > this.length){
			this.body.pop();
		}
	}

	checkForApple() {
		if(this.apple[0] === this.position[0] && this.apple[1] === this.position[1]){
			this.length = this.length + 2;
			this.speed = this.speed * 0.95;
			this.apple = [Math.floor(Math.random() * gridScaleX) + 1, Math.floor(Math.random() * gridScaleY) + 1];
			console.log("found apple");
		}
	}

	checkForBody() {
		for (let i = 0; i < this.body.length; i++) {
			if(this.body[i][0] === this.position[0] && this.body[i][1] === this.position[1]){
				this.alive = false;
			}
		}
	}

	goUp() {
		this.posY = this.posY - 1;
	}

	goDown() {
		this.posY = this.posY + 1;
	}

	goLeft() {
		this.posX = this.posX - 1;
	}

	goRight() {
		this.posX = this.posX + 1;
	}
}



let snake;
let currentInt;

function createGrid() {
	const gridDiv = document.getElementById("grid")

	while (gridDiv.hasChildNodes()) {
		gridDiv.lastChild.remove();
	}

	for (let i = 1; i <= gridScaleY; i++) {
		for (let j = 1; j <= gridScaleX; j++) {
			const pixel = document.createElement("div")
			pixel.classList.add("pixel");
			pixel.dataset.positionX = j;
			pixel.dataset.positionY = i;
			pixel.dataset.position = [j,i];
			pixel.dataset.snake = false;
			gridDiv.append(pixel);
		}
	}
}

function renderSnake() {
	for (let i = 0; i < snake.body.length; i++) {
		const snakePixel = document.querySelector("[data-position='" + snake.body[i] +"']");
		snakePixel.dataset.snake = true
	}
}
function renderApple() {
	const applePixel = document.querySelector("[data-position='" + snake.apple +"']");
	applePixel.dataset.apple = true
}

function renderScore() {
	const scoreEl = document.getElementById("score");
	scoreEl.innerText = snake.length;
	if(!snake.alive){
		scoreEl.innerText = scoreEl.innerText + " // GAME OVER";
	}
}


function control(e){
	if(snake.alive){
		if(e.keyCode === 39) {
			clearInterval(currentInt);
			currentInt = setInterval(() => {
				snake.goRight();
				renderGame();
			}, snake.speed);
		}
		if(e.keyCode === 38) {
			clearInterval(currentInt);
			currentInt = setInterval(() => {
				snake.goUp();
				renderGame();
			}, snake.speed);
		}
		if(e.keyCode === 37) {
			clearInterval(currentInt);
			currentInt = setInterval(() => {
				snake.goLeft();
				renderGame();
			}, snake.speed);
		}
		if(e.keyCode === 40) {
			clearInterval(currentInt);
			currentInt = setInterval(() => {
				snake.goDown();
				renderGame();
			}, snake.speed);
		}
	}
}

function renderGame(){
	if(snake.alive) {
		createGrid();
		renderSnake();
		renderScore();
		renderApple();
	} else {
		clearInterval(currentInt);
		createGrid();
		renderSnake();
		renderScore();
		renderApple();
		
	}
	
}

function startGame(){
	snake = new Snake();
	clearInterval(currentInt);
	renderGame();
}

document.addEventListener("keyup", control)