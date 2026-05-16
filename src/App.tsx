import UseActionState from "./components/UseActionState";
import FetchTodo from "./components/FetchTodo";
import FetchTodoNew from "./components/FetchTodoNew";
import Form from "./components/Form";

import Theme from "./components/Theme";
import UseFormStatus from "./components/useFormStatus";
import "./index.css";

const App = () => {
  return (
    <div>
      <UseActionState />
      <UseFormStatus />
      <Form />
      <Theme />
      <FetchTodo />
      <FetchTodoNew />
    </div>
  );
};

export default App;
