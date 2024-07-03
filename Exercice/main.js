import { getRandomNumber } from "./random.js";

class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height, color) {
        super(x, y, color);

        this.width = width;
        this.height = height
    }
    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.rect(this.x, this.y, this.width, this.height)  
        context.fill()
    }
}

class Circle extends Shape{
    constructor(x, y, radius, color){
        super(x, y, color)

        this.radius = radius
    }
    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill()
    }
}

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const shapeForm = document.getElementById('shapeForm');
const shapeTypeSelect = document.getElementById('shapeType');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const radiusInput = document.getElementById('radius');
const colorInput = document.getElementById('color');
const modeSelect = document.getElementById('mode');

const shapes = [
    new Rectangle(20, 20, 50, 50, 'red'),
    new Rectangle(200, 200, 55, 100, 'green'),
    new Circle(150, 150, 50, 'black'),
    new Circle(150, 150, 50, 'black')
]
shapes.forEach(shape => shape.draw(context))

shapeTypeSelect.addEventListener('change', () => {
    const shapeType = shapeTypeSelect.value;
    if (shapeType === 'Rectangle') {
        widthInput.parentElement.style.display = 'block';
        heightInput.parentElement.style.display = 'block';
        radiusInput.parentElement.style.display = 'none';
    } else {
        widthInput.parentElement.style.display = 'none';
        heightInput.parentElement.style.display = 'none';
        radiusInput.parentElement.style.display = 'block';
    }
});

modeSelect.addEventListener('change', () => {
    const mode = modeSelect.value;
    if (mode === 'random') {
        formFields.style.display = 'none';
    } else {
        formFields.style.display = 'block';
    }
});

formFields.style.display = modeSelect.value === 'random' ? 'none' : 'block';

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const mode = modeSelect.value;

    if (mode === 'random') {
        const shapeType = getRandomNumber(0, 1) === 0 ? 'Rectangle' : 'Circle';
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        if (shapeType === 'Rectangle') {
            const width = getRandomNumber(5, 100);
            const height = getRandomNumber(5, 100);
            const rectangle = new Rectangle(x, y, width, height, color);
            rectangle.draw(context);
        } else {
            const radius = getRandomNumber(5, 100);
            const circle = new Circle(x, y, radius, color);
            circle.draw(context);
        }
    } else if (mode === 'form') {
        const shapeType = shapeTypeSelect.value;
        const color = colorInput.value;

        if (shapeType === 'Rectangle') {
            const width = parseInt(widthInput.value);
            const height = parseInt(heightInput.value);
            const rectangle = new Rectangle(x, y, width, height, color);
            rectangle.draw(context);
        } else {
            const radius = parseInt(radiusInput.value);
            const circle = new Circle(x, y, radius, color);
            circle.draw(context);
        }
    }
});

const clear = document.querySelector('button')

clear.addEventListener('click', (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
})
