class Project
{
    constructor () {
        this.tasks = [];
    }

    pushTask (data) {
        this.tasks.push(data);
    }

    countTasks () {
        return Object.keys(this.tasks).length;
    }

}