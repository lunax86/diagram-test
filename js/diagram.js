class Diagram
{

    colors = {
        diagramHeaderBackground: '#222',
        diagramHeaderText: '#eee',
        diagramBodyBackground: '#333',
        taskBackground: '#093',
        taskText: '#eee',
        text: '#093',
        grid: '#555'
    };

    constructor(canvas, project) {
  
        this.wrap = canvas.parentElement;
        this.project = project;
        this.canvas = new Canvas(canvas);
        this.calendar = new Calendar();

        this.render();
    }

    renderEmpty(chart) {

        const fixedHeight = 400;

        this.canvas.resize(chart.size.width, fixedHeight);
        this.canvas.color = this.colors.diagramBodyBackground;

        this.canvas.drawRectangle(
            chart.size.cell,
            chart.size.cell,
            chart.size.width - chart.size.cell * 2,
            fixedHeight - chart.size.cell * 2
            );

        this.canvas.color = this.colors.diagramHeaderText;
        this.canvas.text.size = Math.round(chart.size.unit * 3) + 'px';
        this.canvas.text.align = 'center';
        this.canvas.drawText( chart.size.width / 2, fixedHeight / 2, 'Drag and Drop Employee Here');
    }

    renderHeader(chart, tasksLength) {

        /*
        this.canvas.color = this.colors.diagramHeaderBackground;
        this.canvas.drawRectangle(0 ,0 , chart.size.width, chart.size.cell);
        */

        /*
        this.canvas.color = this.colors.diagramBodyBackground;
        this.canvas.drawRectangle(0 , chart.size.unit, chart.size.width, chart.size.cell - chart.size.unit * 2);
        */

        /*
        this.canvas.color = this.colors.taskBackground;
        this.canvas.drawRectangle(0 ,chart.size.cell - chart.size.unit, tasksLength, chart.size.unit);
        */

        this.canvas.color = this.colors.taskBackground;
        this.canvas.drawRectangle(0 , chart.size.unit, tasksLength, chart.size.cell - chart.size.unit * 2 );

        this.canvas.color = this.colors.diagramHeaderText;
        this.canvas.text.size = Math.round(chart.size.unit * 3) + 'px';
        this.canvas.text.align = 'center';

        for (let i = 0; i < chart.columns; i++) {
            this.canvas.drawText(
                chart.size.cell * i + (chart.size.cell / 2),
                chart.size.unit + (chart.size.cell / 2),
                i + 1
                );
        }
    }

    renderTasks(chart, employees) {

        // TODO this method is way too long - split !!!

        let currentRow = 0;
        let maxLength = 0;

        for (let i = 0; i < employees.length; i++) {

            let currentLength = 0;
            const spacing = Math.round(chart.size.unit);

            this.canvas.color = this.colors.diagramHeaderBackground;
            this.canvas.drawRectangle(
                0,
                chart.size.cell * currentRow + chart.size.cell,
                chart.size.width,
                chart.size.cell + 2,
                );

            this.canvas.color = this.colors.diagramHeaderText;
            this.canvas.text.size = Math.round(chart.size.unit * 3) + 'px';
            this.canvas.text.align = 'center';
            this.canvas.drawText(
                chart.size.width / 2,
                (chart.size.cell * currentRow + chart.size.cell + chart.size.unit + chart.size.cell / 2),
                employees[i].name
                );
            currentRow++

            employees[i].tasks.forEach( (task) => {

                const taskLength = (task.hours * chart.size.unit) * employees[i].coefficient;

                this.canvas.color = this.colors.text;
                this.canvas.drawRectangle(
                    currentLength,
                    (chart.size.cell * currentRow + spacing ) + chart.size.cell,
                    taskLength,
                    chart.size.cell - spacing * 2,
                    );
                currentLength += taskLength;

                this.canvas.color = this.colors.diagramHeaderText;
                this.canvas.text.size = Math.round(chart.size.unit * 3) + 'px';
                this.canvas.text.align = 'left';

                this.canvas.drawText(
                    currentLength - taskLength + chart.size.unit,
                    (chart.size.cell * currentRow + chart.size.cell + chart.size.unit + chart.size.cell / 2),
                    task.name,
                    );

                currentRow++;    
            });

            if (maxLength < currentLength) maxLength = currentLength;
        }

        return maxLength;
    }

    renderBackground (chart) {

        const spacing = chart.size.cell / 8;
        this.canvas.color = this.colors.diagramBodyBackground;

        /*
        for (let i = 0; i < chart.columns; i++) {
            this.canvas.drawRectangle(
                chart.size.cell * i + spacing,
                0,
                chart.size.cell - spacing * 2,
                chart.size.height
                );
        }
        */

        for (let i = 0; i <= chart.rows; i++) {
            this.canvas.drawRectangle(
                0,
                chart.size.cell * i + spacing,
                chart.size.width,
                chart.size.cell - spacing * 2
                );
        }
    }

    renderGrid (chart, renderColumns = true, renderRows = true) {

        this.canvas.color = this.colors.grid;

        if (renderColumns) {
            for (let i = 1; i < chart.columns; i++) {
                const temp = i * chart.size.cell;
                this.canvas.drawLine(temp, 0, temp, chart.size.height);
            }
        }

        if (renderRows) {
            for (let i = 1; i < (chart.rows+1); i++) {
                const temp = i * chart.size.cell;
                this.canvas.drawLine(0, temp, chart.size.width, temp);
            }
        }

    }

    render () {

        const chart = new Chart(this.calendar.todo(), this.project.countTasks() + this.project.countEmployees(), this.wrap.offsetWidth);

        this.canvas.resize(chart.size.width, chart.size.height);
        this.canvas.clear();

        if (this.project.countEmployees() === 0) {
            this.renderEmpty(chart);
            return;
        }

        this.renderGrid(chart);
        this.renderBackground(chart);

        const tasksLength = this.renderTasks(chart, this.project.employees);
        this.renderHeader(chart, tasksLength);
        
    }

}