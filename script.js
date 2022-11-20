"use strict";
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const charColor = '#0f0';
const headColor = '#fff';
const chars = '!"#$%&\'()*+,-./0123456789:;<=>ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨ª«¬­®¯°±²³µ¶·¸¹º»¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ';

const charHeight = 20;

ctx.font = `${charHeight}px Matrix`;
setInterval(() => {
    const x = (Math.random() * 10000) % canvas.width;
    const y = (Math.random() * 10000) % (canvas.height / 4) - canvas.height / 8;
    const normalX = x - x % (charHeight - 5);
    const normalY = y - y % charHeight;
    new Char(normalX, normalY);
}, 50);
setInterval(fading, 200);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = `${charHeight}px Matrix`;
});

class Char {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        const speed = 30 + (Math.random() * 100) % 70;
        this.id = setInterval(this.draw.bind(this), speed);
        this.char = this.getRandomChar();
    }
    draw() {
        ctx.fillStyle = charColor;
        ctx.fillText(this.char, this.x, this.y);
        const margin = 2;
        this.y += charHeight + margin;
        this.char = this.getRandomChar();
        ctx.fillStyle = headColor;
        ctx.fillText(this.char, this.x, this.y);

        if (this.y > canvas.height) {
            this.destroy();
        }
    }
    getRandomChar() {
        let n = Math.floor(Math.random() * 1000) % chars.length;
        return chars[n];
    }
    destroy() {
        clearInterval(this.id);
    }
}

function fading() {
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = image.data;
    const size = canvas.width * canvas.height * 4;
    for (let i = 0; i < size; i++) {
        if (pixels[i] > 0) {
            pixels[i] -= 10;
        }
    }
    ctx.putImageData(image, 0, 0);
}
