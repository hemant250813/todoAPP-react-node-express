import { useEffect, useState } from "react";
import ToDo from "./componants/todo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/handleapi";



function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="App">
      <h1 className="h2">Search</h1>

<div className="search-container">
  <div className="search-inner">
    <input type="text" value={value} onChange={onChange} />
    <button onClick={() => onSearch(value)}> Search </button>
  </div>
  <div className="dropdown">
    {toDo
      .filter((item) => {
        const searchTerm = value.toLowerCase();
        const fullName = item.text.toLowerCase();

        return (
          searchTerm &&
          fullName.startsWith(searchTerm) &&
          fullName !== searchTerm
        );
      })
      .slice(0, 10)
      .map((item) => (
        <div
          onClick={() => onSearch(item.text)}
          className="dropdown-row"
          key={item.text}
        >
          {item.text}
        </div>
      ))}
  </div>
</div>

      <div className="container">

        <h1>ToDo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={isUpdating ?
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}
          </div>
          

        </div>

        <div className="list">

          {toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text}
          
        
          updateMode = {() => updateMode(item._id, item.text)}
          deleteToDo = {() => deleteToDo(item._id, setToDo)} />)}
          

        </div>

      </div>
     

    </div>
  );
}

export default App;

