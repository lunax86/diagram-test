class Project
{
    name = 'Project 1';
    manager = 123; // user ID
    desc = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    /*
        etc...
    */

    // Tasks for testing
    tasks = [
        /*
        {name: 'Task 1', hours: 20 },
        {name: 'Task 2', hours: 60 },
        {name: 'Task 3', hours: 40 },
        {name: 'Task 4', hours: 10 },
        {name: 'Task 5', hours: 50 },
        {name: 'Task 6', hours: 30 },
        {name: 'Task 7', hours: 15 },
        */
    ];

    // Employees for testing
    employees = [

        {name: 'Employee 1', coefficient: 0.5, tasks: [
            {name: 'Task 1', hours: 20 },
            {name: 'Task 2', hours: 60 },
            {name: 'Task 4', hours: 10 },
            {name: 'Task 3', hours: 40 }
        ]},
        {name: 'Employee 2', coefficient: 1, tasks: [
            {name: 'Task 6', hours: 30 },
            {name: 'Task 5', hours: 50 },
        ]},
        {name: 'Employee 3', coefficient: 1.5, tasks: [
            {name: 'Task 8', hours: 5 },
            {name: 'Task 9', hours: 35 },
            {name: 'Task 7', hours: 15 },
        ]}

    ];

    pushTask (data) {
        if (this.countEmployees == 0) {
            // ALERT! select employee 1st !!!
            return false;
        }

        // TODO lets push it to 1st employee for now
        this.employees[0].tasks.push(data);
        return true;
    }

    pushEmployee (data) {

        data.tasks = [];
        this.employees.push(data);

        return true;
    }

    countTasks() {

        let result = 0;

        this.employees.forEach ((employee) => {
            result +=  employee.tasks.length; 
        });

        return result;
    }

    countEmployees() {
        return this.employees.length;
    }

}