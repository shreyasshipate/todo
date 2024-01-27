import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "./components/Popup";
import ToDo from "./components/ToDo";
import { baseURL } from "./utils/constant";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [mark, setMark] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    if (!input.trim()) {
      // Display an error message
      alert("Please enter a title for the ToDo.");
      return;
    }

    axios
      .post(`${baseURL}/save`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">ToDo App</h1>
        <div>
          <div className="input_holder">
            <input
              value={input}
              required
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add a Title..."
            />
            <button onClick={saveToDo}>Add</button>
          </div>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
              setMark={setMark}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
          mark={mark}
        />
      )}
    </main>
  );
};

export default App;
