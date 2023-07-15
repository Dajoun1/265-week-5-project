## ToDo List

Complete the component as shown to pass the test cases. Certain core React functionalities are already implemented.

![](https://hrcdn.net/s3_pub/istreet-assets/eUyN-o4d-mymHu2FBAXUKw/demo.gif)

The application has only one component, `ToDoList`, where all the functionalities will be implemented.

The component must have the following functionalities:

- The type of input for the `Task Name` should be **text**.
- The initial view should have no tasks in the table.
- Clicking the `Add Task` button should:
  - add a task in the todo list table with 3 cells: the `Task Name`, a `Mark as Complete` button and a `Delete` button respectively.
  - display an alert saying "Please enter the task name" if the input box for the `Task Name` is empty.
  - reset the input box for the `Task Name` to empty after adding a valid task to the table.
- Clicking the `Delete` button should delete the corresponding task from the table.
- Clicking the `Mark as Complete` button should:
  - Mark the task as completed as the task is no longer active.
  - change the text of the button to `Completed`.
  - be disabled.
- The type of input for the `Show Completed Tasks` input should be **checkbox**.
- Clicking the checkbox for `Show Completed Tasks` input should:
  - Display all the tasks, included the completed tasks when the `Show Completed Tasks` input is **checked**.
  - Display only active tasks when the `Show Completed Tasks` input is **unchecked**.
- The Todo List table should display only active tasks by default.

The following data-testid attributes are required in the component for the tests to pass:

| **Attribute**                 | **Component**                       |
|-------------------------------|-------------------------------------|
| input-task-name               | Input box for task name             |
| add-task-button               | Button for adding task to ToDo List |
| tasks-list                    | List of tasks                       |
| show-completed-tasks-checkbox | Checkbox for completed tasks        |

Note:

- Components have data-testid attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.
- The file that should be modified by the candidate `src/components/ToDoList/index.js`  is open by default in the system editor.
- Avoid making changes to other files in the project structure.

## Environment 

- React Version: 16.13.1
- Node Version: 14(LTS)
- Default Port: 8000


**Read Only Files**
- `src/App.js`
- `src/App.css`
- `src/App.test.js`


**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```

