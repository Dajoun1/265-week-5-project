import { useState } from 'react';
import "./index.css";

const ToDoList = () => {
    

    /*
- create an array ["taskOne", "taskTwo"]
- create a delete function
- create onClick
    */

/* 
const hold = <>
 <tr>
                            <td>Task</td>
                            <td><button>Mark as Complete</button></td>
                            <td><button className="danger" onClick={() => {onDelete()}}>Delete</button></td>
                        </tr>
</> */

/* 
For delete button 

- eventHandler for onDelete
- this method needs task index
- array method to remove an item *use splice or filter*
- call setTask with new array
- add onClick event
*/
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const onTaskNameChange = (event) => {
        setTaskName(event.target.value);
    }

    const onAddNewTask = () => {
        if (taskName === "") {
            window.alert("Please enter the task name");
            return;

    } else {
        const newTask = [...tasks, { id: Date.now(), name: taskName }];
        setTasks(newTask);
        setTaskName('');
    }
}
    const onDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
};
    const onComplete = (taskId) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex((task) => task.id === taskId);
    newTasks[index].completed = true;

    setTasks(newTasks);
};
    const onShowCompleted = () => {
        setShowCompleted(!showCompleted);
    }

    const renderTask = (task) => {
        return (
            <tr key={task.id}>
            <td>{task.name}</td>
            <td><button onClick={() => onComplete(task.id)} disabled={Boolean(task.completed)}>{Boolean(task.completed) ? 'Completed' : 'Mark as Complete'}</button></td>
            <td><button className="danger" onClick={() => onDelete(task.id)}>Delete</button></td>
        </tr>   
        )
    }
    const filterTasks = (task) => {
        return showCompleted || !Boolean(task.completed);
    }

    
    return (
        <div className="layout-column align-items-center justify-content-start">
            <section className="layout-row align-items-center justify-content-center mt-30">
                <input
                    placeholder="Task Name"
                    data-testid="input-task-name"
                    type="text"
                    value={taskName}
                    onChange={onTaskNameChange}
                />
                <button className="outlined" data-testid="add-task-button" onClick={onAddNewTask}>Add Task</button>

            </section>
            <div className="card w-40 pt-30 pb-8 mt-2">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Name</th>
                        </tr>
                    </thead>
                    <tbody data-testid="tasks-list">
                    {tasks.filter(filterTasks).map(renderTask)}
                       
                        

                    </tbody>
                </table>
            </div>
            <section className="layout-row align-items-center justify-content-center mt-30">
                <input className="show-completed-tasks-checkbox" data-testid="show-completed-tasks-checkbox" placeholder="Show Completed Tasks" type="checkbox" checked={showCompleted} onChange={onShowCompleted}/>
                <label className="show-completed-tasks-label">Show Completed Tasks</label>
            </section>

        </div>
    );
}

export default ToDoList;