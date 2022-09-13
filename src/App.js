import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { JoinBlock } from "./components/JoinBlock";
import Room from "./components/Room";
import reducer from "./reducer";
import socket from "./socket";
import { JOINED, NEW_MESSAGES, SET_USERS } from "./types";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    userId: [],
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit("ROOM:JOIN", obj);
   const {data} = await  axios.get(`/rooms/${obj.roomId}`)
   setUsers(data.users)
  };
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };
const addMessage = (message)=>{
  dispatch({
    type: 'NEW_MESSAGES',
    payload: message
  })
}
  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGES", addMessage);
  }, []);
  window.socket=socket
  return (
    <div className="App">
      {(!state.joined && <JoinBlock onLogin={onLogin} />) || (
        <Room {...state} addMessage={{addMessage}} />
      )}
    </div>
  );
}

export default App;
