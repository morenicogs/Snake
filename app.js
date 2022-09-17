const gridScaleX = 32;
const gridScaleY = 32;
class Snake {
	constructor() {
		this._posX = Math.floor(Math.random() * gridScaleX) + 1;
		this._posY = Math.floor(Math.random() * gridScaleY) + 1;
		this._position = [this._posX, this._posY];
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
		this._position = [x, this._posY];
	}

	set posY(y) {
		if(y == 0){
			y = gridScaleY;
		}
		if(y == gridScaleY + 1){
			y = 1;
		}
		this._posY = y;
		this._position = [this._posX, y];
	}

	goUp() {
		this.posY = this.posY - 1;
		console.log("Went up");
		console.dir(this);
	}

	goDown() {
		this.posY = this.posY + 1;
		console.log("Went down");
		console.dir(this);
	}

	goLeft() {
		this.posX = this.posX - 1;
		console.log("Went left");
		console.dir(this);
	}

	goRight() {
		this.posX = this.posX + 1;
		console.log("Went right");
		console.dir(this);
	}
}


const snake = new Snake();

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
			if(snake.posX == j && snake.posY == i) {
				pixel.dataset.snake = true;
			} else {
				pixel.dataset.snake = false;
			}
			gridDiv.append(pixel);
		}
	}
}

function showSnake() {
	const snakePixel = document.querySelector("[data-snake='true']");
	console.log(snakePixel);
}

function selectPixel(x,y) {
	const pixels = document.querySelectorAll(".pixel");


	for (const pixel of pixels) {
		if(pixel.dataset.positionX == x && pixel.dataset.positionY == y){
			pixel.dataset.snake = true;
			pixel.setAttribute("id", "snakehead")
			console.log("selected");
		}
	}

}

function goUp() {

}

