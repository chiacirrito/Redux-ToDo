import "./App.css";
import { AddTodo } from "./components/addTodo/AddTodo";
import { TodoLists } from "./components/todoList/TodoLists";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do List</h1>
      </header>
      <div className="AppMargin">
        <AddTodo />
        <TodoLists />
      </div>
    </div>
  );
}

export default App;
