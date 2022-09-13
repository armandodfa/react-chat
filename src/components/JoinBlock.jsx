import axios from "axios";
import React, { useState } from "react";
import socket from "../socket.js"

export const JoinBlock = ({onLogin}) => {
    const connectSocket = () => {
        console.log("Попытка соединения....");
        socket();
        console.log(` a user connected`);
    };
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false)

    const onEnter = async ()=>{
        if(!roomId || !userName){
            return( 
               
                alert('Введены неверные данные! Попробуйте ещё раз...')
            
        )}
                const obj ={
                    roomId,
                    userName
                }
        setLoading(true);

       await  axios.post('/rooms', obj).then(onLogin(obj))
     
    } 

    return (
        <div className="wrapper">
            <h1>Chamber of Secrets</h1>
            <div className="input-group">
            <input
                className="input input-group-text"
                type="text"
                required
                value={roomId}
                onChange={(e)=>setRoomId(e.target.value)}
            />
            <label className="input-label">Chamber ID</label>
            </div>
            <div className="input-group">
            <input
                className="input input-group-text"
                type="text"
                required
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
            />
            <label className="input-label">User Name</label>
            </div>
            <button
                disabled={isLoading}
                type="button"
                className="btn btn-success mt-2"
                onClick={onEnter}
            >
             {isLoading ? 'Вход...' :  'Войти'}
            </button>
        </div>
    );
}
