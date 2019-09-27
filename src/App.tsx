import React, { useState, Fragment } from 'react';

type FormElem = React.FormEvent<HTMLFormElement>;

interface iTodo {
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<iTodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const completeTodo = (idx: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos[idx].complete = !newTodos[idx].complete;
    setTodos(newTodos);
  };

  const addTodo = (text: string): void => {
    const newTodos: iTodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const removeTodo = (idx: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos.splice(idx, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type='submit'>Add To Do</button>
      </form>
      {todos.map(({ text, complete }: iTodo, idx: number) => (
        <Fragment key={idx}>
          <div>{text}</div>
          <button type='button' onClick={() => completeTodo(idx)}>
            {complete ? 'Completed' : 'Incomplete'}
          </button>
          <button type='button' onClick={() => removeTodo(idx)}>
            X
          </button>
        </Fragment>
      ))}
    </>
  );
};

export default App;
