import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App />);

let taskInput, addTaskButton, tasksList, showCompletedTasksCheckBox;
const initialTaskCount = 0;

afterEach(() => {
    cleanup()
});

beforeEach(() => {
    let { getByTestId } = renderApp();
    taskInput = getByTestId('input-task-name');
    addTaskButton = getByTestId('add-task-button');
    tasksList = getByTestId('tasks-list');
    showCompletedTasksCheckBox = getByTestId('show-completed-tasks-checkbox');
})

describe("Intial UI", () => {
    it("input tasks input box should be of type text", () => {
        expect(taskInput).toHaveAttribute("type", "text");
    });

    it("initially the tasks table should be empty", () => {
        expect(tasksList.children.length).toBe(initialTaskCount);
    });
});

describe("Add Task", () => {
    it("add task button should add a task", () => {
        fireEvent.change(taskInput, { target: { value: "Task 1" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children.length).toBe(initialTaskCount + 1);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Task 1");
    });

    it("should display an alert if input box is empty", () => {
        const alertMock = jest.spyOn(window, "alert").mockImplementation();
        // Click Add Task Button
        fireEvent.change(taskInput, { target: { value: "" } });
        fireEvent.click(addTaskButton);
        expect(alertMock).toHaveBeenCalledWith("Please enter the task name");
    });

    it("should empty the input boxes on adding a valid task", () => {
        fireEvent.change(taskInput, { target: { value: "Task 1" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children.length).toBe(initialTaskCount + 1);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Task 1");
        expect(taskInput).toHaveTextContent("");
    });
});

describe("Delete Task", () => {
    it("delete button should delete the corresponding task", () => {
        fireEvent.change(taskInput, { target: { value: "Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        fireEvent.change(taskInput, { target: { value: "Another Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);

        fireEvent.change(taskInput, { target: { value: "Last Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children[initialTaskCount + 2]).toHaveTextContent("Last Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 3);

        const deleteButton = tasksList.children[initialTaskCount + 2].children[2].children[0];
        expect(deleteButton).toHaveTextContent("Delete");
        // Click Delete Button for last sample task
        fireEvent.click(deleteButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);
    });
});

describe("Mark as Complete", () => {
    it("should mark the task as complete", () => {
        fireEvent.change(taskInput, { target: { value: "Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        fireEvent.change(taskInput, { target: { value: "Another Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);

        const markAsComplete = tasksList.children[initialTaskCount + 1].children[1].children[0];
        expect(markAsComplete).toHaveTextContent("Mark as Complete");
        // Click Mark as Complete for another sample task
        fireEvent.click(markAsComplete);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);
    });

    it("should be disabled after clicking when Show Completed Task checkbox is called", () => {
        fireEvent.change(taskInput, { target: { value: "Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        fireEvent.change(taskInput, { target: { value: "Another Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);

        let markAsComplete = tasksList.children[initialTaskCount + 1].children[1].children[0];
        expect(markAsComplete).toHaveTextContent("Mark as Complete");
        // Click Mark as Complete for another sample task
        fireEvent.click(markAsComplete);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        // Click Show Completed Tasks Checkbox
        expect(showCompletedTasksCheckBox).toHaveAttribute("type", "checkbox");
        fireEvent.click(showCompletedTasksCheckBox);
        expect(tasksList.children.length).toBe(initialTaskCount + 2);
        markAsComplete = tasksList.children[initialTaskCount + 1].children[1].children[0];
        expect(markAsComplete).toBeDisabled();
    });

    it("should be updated to Completed when Show Completed Task checkbox is called", () => {
        fireEvent.change(taskInput, { target: { value: "Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        fireEvent.change(taskInput, { target: { value: "Another Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);

        let markAsComplete = tasksList.children[initialTaskCount + 1].children[1].children[0];
        expect(markAsComplete).toHaveTextContent("Mark as Complete");
        // Click Mark as Complete for another sample task
        fireEvent.click(markAsComplete);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        // Click Show Completed Tasks Checkbox
        expect(showCompletedTasksCheckBox).toHaveAttribute("type", "checkbox");
        fireEvent.click(showCompletedTasksCheckBox);
        expect(tasksList.children.length).toBe(initialTaskCount + 2);
        markAsComplete = tasksList.children[initialTaskCount + 1].children[1].children[0];
        expect(markAsComplete).toHaveTextContent("Completed");
    });

});

describe("Show Completed Task", () => {
    it("should show all the tasks including the ones which are completed", () => {
        fireEvent.change(taskInput, { target: { value: "Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 1);

        fireEvent.change(taskInput, { target: { value: "Another Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);

        fireEvent.change(taskInput, { target: { value: "Last Sample Task" } });
        // Click Add Task Button
        fireEvent.click(addTaskButton);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children[initialTaskCount + 2]).toHaveTextContent("Last Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 3);

        const markAsComplete = tasksList.children[initialTaskCount + 1].children[1].children[0];
        expect(markAsComplete).toHaveTextContent("Mark as Complete");
        // Click Mark as Complete for another sample task
        fireEvent.click(markAsComplete);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Last Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 2);

        // Click Show Completed Tasks Checkbox
        expect(showCompletedTasksCheckBox).toHaveAttribute("type", "checkbox");
        fireEvent.click(showCompletedTasksCheckBox);
        expect(tasksList.children[initialTaskCount]).toHaveTextContent("Sample Task");
        expect(tasksList.children[initialTaskCount + 1]).toHaveTextContent("Another Sample Task");
        expect(tasksList.children[initialTaskCount + 2]).toHaveTextContent("Last Sample Task");
        expect(tasksList.children.length).toBe(initialTaskCount + 3);
    });

    it("should be not checked by default", () => {
        expect(showCompletedTasksCheckBox).toHaveAttribute("type", "checkbox");
        expect(showCompletedTasksCheckBox).not.toBeChecked();
    });

    it("should be checked after clicking", () => {
        expect(showCompletedTasksCheckBox).toHaveAttribute("type", "checkbox");
        expect(showCompletedTasksCheckBox).not.toBeChecked();
        // Click Show Completed Tasks Checkbox
        fireEvent.click(showCompletedTasksCheckBox);
        expect(showCompletedTasksCheckBox).toBeChecked();
    });
});
