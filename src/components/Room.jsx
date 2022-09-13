import React, { useState } from 'react'
import socket from '../socket';

function Room(state, users, messages, userName, roomId, addMessage) {
    console.log(state)
    const [messageValue, setMessageValue] = useState('');
    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGES', {
            userName,
            roomId,
            text: messageValue
        })
        debugger;
        addMessage({
            userName,
            text: messageValue})
        setMessageValue('');
    }
    return (
        <div className='chat'>
            <div className='chat-users'>
            <h3>Chamber: {state.roomId}</h3>
                <b>Users ({state.users.length}):</b>
                <ul>  {state.users.map((name, index) => <li key={name + index}>{name}</li>)} </ul>
            </div>
            <div className='chat-messages'>
                <div className='messages'>
                    <div className='message'>
                        {
                            state.messages.map((message) => {
                                (
                                    <div className='message'>
                                        <p>{message.text}</p>
                                        <div>
                                            <span>{message.userName}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <form>
                    <textarea
                        value={messageValue}
                        onChange={(e) => { setMessageValue(e.target.value) }}
                        className='form-control area' name="" id="" cols="3" rows="2" placeholder='write something...'></textarea>
                    <button onClick={onSendMessage} type='button' className='btn btn-success mt-2'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Room