class Canvas
{

    color = '#fff';
    text = {
        font: 'Arial',
        size: '16px',
        align: 'left'
    };

    constructor (canvas) {

        this.canvas = canvas;
        this.context = canvas.getContext('2d');

    }

    resize(width, height) {

        this.canvas.width = width;
        this.canvas.height = height;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRectangle(fromX, fromY, toX, toY) {

        this.context.fillStyle = this.color;

        this.context.fillRect(
            Math.round(fromX),
            Math.round(fromY),
            Math.round(toX),
            Math.round(toY)
            );
    }

    drawLine(fromX, fromY, toX, toY) {

        this.context.lineWidth = 1;
        this.context.strokeStyle = this.color;

        this.context.beginPath();
        this.context.moveTo(
            Math.round(fromX),
            Math.round(fromY) + 0.5
            );
        this.context.lineTo(
            Math.round(toX),
            Math.round(toY) + 0.5
            );
        this.context.stroke();
    }

    drawText(fromX, fromY, text) {

        this.context.fillStyle = this.color;
        this.context.font = this.text.size + ' ' + this.text.font;
        this.context.textAlign = this.text.align;

        this.context.fillText(text, fromX, fromY);
    }

}