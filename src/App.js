import React from 'react';
import './App.css';
import 'h8k-components';
import ToDoList from './components/ToDoList';

const title = "Todo List";

const App = () => {
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <ToDoList />
        </div>
    );
}

export default App;