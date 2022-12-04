let project = new Project();

const canvas = document.querySelector('#diagram');

let diagram = new Diagram(canvas, project);
window.addEventListener('resize', () =>{
    diagram.render();
});

const taskElements = document.querySelectorAll('.task');
const diagramElement = document.getElementById('tasks-assigned');

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
    const taskData = draggingElement.getAttribute('data-task');
    const data = JSON.parse(taskData);
    diagram.project.pushTask(data);
    draggingElement.remove();

    diagram.render();

});


