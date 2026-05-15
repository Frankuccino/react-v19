import FetchTodo from "./components/FetchTodo";
import FetchTodoNew from "./components/FetchTodoNew";
import Theme from "./components/Theme";
import "./index.css";

const App = () => {
  return (
    <div>
      <Theme />
      <FetchTodo />
      <FetchTodoNew />
    </div>
  );
};

export default App;
