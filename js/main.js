let project = new Project();

const canvas = document.querySelector('#diagram');

let diagram = new Diagram(canvas, project);
window.addEventListener('resize', () => {
    diagram.render();
});

const diagramElement = document.querySelector('#tasks-assigned');
const employeeElements = document.querySelectorAll('.employee');
const taskElements = document.querySelectorAll('.task');

employeeElements.forEach((element) => {

    element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
    });

    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    });

});

taskElements.forEach((element) => {

    element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
    });

    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    });

});

diagramElement.addEventListener('dragover', (event) => {

    event.preventDefault();

});

diagramElement.addEventListener('drop', () => {

    const draggingElement = document.querySelector('.dragging');

    if (draggingElement.classList.contains('task')) {

        const taskData = draggingElement.getAttribute('data-task');
        const result = diagram.project.pushTask(JSON.parse(taskData));
        if (result) draggingElement.remove();

    } else if (draggingElement.classList.contains('employee')) {

        const employeeData = draggingElement.getAttribute('data-employee');
        const result = diagram.project.pushEmployee(JSON.parse(employeeData));
        if (result) draggingElement.remove();
    }

    diagram.render();

});
