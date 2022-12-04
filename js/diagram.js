class Diagram
{

    constructor(canvas, project) {

        this.canvas = canvas;
        this.project = project;
        this.columns = 30; // TODO - for now just render unknown 30 days

        this.context = this.canvas.getContext('2d');

        this.render();
    }

    setWidth () {

        this.width = this.canvas.parentElement.offsetWidth;
    }

    setHeight () {

        this.height = (this.rows + 2) * this.cellSize;
    }

    resize () {

        // calculate new size values based on parent element and number of tasks
        this.setWidth();
        this.cellSize = this.width/this.columns;
        this.unitSize = this.cellSize/8;
        this.setHeight();

        // apply new size values to element
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    drawLine (fromWidth, fromHeight, toWidth, toHeight, color = '#fff') {

        this.context.lineWidth = 1;
        this.context.strokeStyle = color;

        this.context.beginPath();
        this.context.moveTo(Math.round(fromWidth), Math.round(fromHeight)+0.5);
        this.context.lineTo(Math.round(toWidth), Math.round(toHeight)+0.5);
        this.context.stroke();
    }

    drawRectangle (fromWidth, fromHeight, toWidth, toHeight, color = '#fff') {

        this.context.fillStyle = color;
        this.context.fillRect(Math.round(fromWidth), Math.round(fromHeight), Math.round(toWidth), Math.round(toHeight));

    }

    drawText (fromWidth, fromHeight, text, color = '#fff', centered = false) {

        const fontSize = Math.round(this.unitSize*3);

        this.context.font = fontSize+'px Arial';
        if (centered) this.context.textAlign = 'center';
            else this.context.textAlign = 'left';
        this.context.fillStyle = color;
        
        //this.context.fillText(text, fromWidth+(this.cellSize/2), fromHeight+(this.cellSize/2));
        this.context.fillText(text, fromWidth, fromHeight); 
    }

    renderHeader(timeTaken) {

        const spacing = this.cellSize/4;

        this.drawRectangle(0,0,this.width,this.cellSize, '#222');

        this.drawRectangle(0,this.unitSize,this.width,this.cellSize-this.unitSize*2, '#333');

        this.drawRectangle(0,this.cellSize-this.unitSize,timeTaken,this.unitSize, '#093');

        for (let i=0; i<this.columns; i++) {
            this.drawText(this.cellSize*i+(this.cellSize/2), this.unitSize+(this.cellSize/2), i+1, '#eee', true);
        }
    }

    // render background
    renderBackground () {

        const spacing = this.cellSize/4;
        const color = '#333';

        // fill with solid color
        //this.drawRectangle(0,0,this.width,this.height, color);

        /* looks ugly ?
        for (let i=0; i<this.columns; i++) {

            if (i % 2 === 0) {
                this.drawRectangle(this.cellSize*i,0,this.cellSize,this.height, color);
            }
        }*/

        for (let i=0; i<this.columns; i++) {
            this.drawRectangle((this.cellSize*i)+spacing,0,this.cellSize-(spacing*2),this.height, color);
        }

    }

    // grid
    renderGrid () {

        const color = 'rgba(255, 255, 255, 0.8)';

        for (let i=1; i<this.columns; i++) {

            const hodor = i*this.cellSize;

            this.drawLine(hodor, 0, hodor, this.height, color);
        }

        for (let i=1; i<(this.rows+2); i++) {

            const hodor = i*this.cellSize;

            this.drawLine(0, hodor, this.width, hodor, color);
        }
    }

    renderTasks() {

        let currentPosition = 0;
        const spacing = Math.round(this.unitSize);

        this.project.tasks.forEach( (task, i) => {

            const taskWidth = task.hours*this.unitSize;

            this.drawRectangle(
                currentPosition,
                ((this.cellSize*i)+spacing)+(this.cellSize),
                taskWidth,
                this.cellSize-spacing*2,
                '#093');
            currentPosition += taskWidth;

            // add text
            this.drawText(
                currentPosition-taskWidth+this.unitSize,
                ((this.cellSize*i)+this.cellSize)+this.unitSize+(this.cellSize/2),
                task.name,
                '#fff',
                false
            );
        });
        
        return currentPosition;
    }

    renderEmpty () {

        const width = this.canvas.parentElement.offsetWidth;
        const height = this.canvas.parentElement.offsetHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        this.drawRectangle(this.cellSize, this.cellSize, width - this.cellSize*2, height - this.cellSize*2, '#333');
        this.drawText(width/2, height/2, 'Drag and Drop Tasks Here', '#eee', true);

    }

    render () {

        this.rows = this.project.countTasks();

        // set optimal canvas size
        this.resize();

        // clear canvas
        this.context.clearRect(0, 0, this.width, this.height);

        // if no tasks assigned yet
        if (this.project.countTasks() === 0) {
            this.renderEmpty();
            return;
        }

        // render background
        this.renderBackground();

        // render tasks
        const timeTaken = this.renderTasks();

        // render header
        this. renderHeader(timeTaken);

        // grid ?
        this.renderGrid();

    }

}