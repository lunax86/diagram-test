
class Chart
{

    // preparation for clickable areas
    /*
        ...
    */

    constructor(columns, rows, width) {

        this.columns = columns;
        this.rows = rows;

        const cell = width / this.columns;
        const unit = cell / 8;
        const height = (this.rows + 1) * cell;

        this.size = {
            width: width,
            cell: cell,
            unit: unit,
            height: height
        };
    }

}