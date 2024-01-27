import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai"; //The icons are imported
import { RxCross1 } from "react-icons/rx"; //The icons are imported
import { baseURL } from "../utils/constant"; //The icons are imported

const ToDo = ({
  text,
  id,
  setUpdateUI,
  setShowPopup,
  setPopupContent,
  description,
}) => {
  const [isComplete, setComplete] = useState(() => {
    // Check localStorage for the completed state, default to false if not found
    const storedValue = localStorage.getItem(`todo_${id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    // Update localStorage when the state changes
    localStorage.setItem(`todo_${id}`, JSON.stringify(isComplete));
  }, [id, isComplete]);


  const completeTodo = () => {
    //to mark the todos as completed
    setComplete(true);
    console.log("Completed");
  };

  const deleteTodo = () => {
    //to delete the todos
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    //to update the todos iff the todos are not marked as completed
    if (!isComplete) {
      setPopupContent({ text, description, id });
      setShowPopup(true);
    }
  };

  return (
    <div className="toDo">
      {text}

      <div className="icons">
        <button>
          <AiFillEdit className="icon" onClick={updateToDo} />
        </button>

        <button>
          <RxCross1 className="icon" onClick={deleteTodo} />
        </button>

        <button type="submit" className="icon" onClick={completeTodo}>
          {isComplete ? "Complete" : "Pending"}
        </button>
      </div>
    </div>
  );
};

export default ToDo;
