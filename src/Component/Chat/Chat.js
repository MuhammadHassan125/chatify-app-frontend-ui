import React, { useEffect, useState } from 'react'
import {MdMessage, MdSend} from 'react-icons/md';
import socketIo from "socket.io-client";
import { User } from '../../App';
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from './Message/Message';

let socket;
const ENDPOINT = "http://localhost:5000/"
const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])


  const sendMsg = ()=>{
    const message = document.getElementById('chatInput').value
    socket.emit('message', {message, id});
    document.getElementById('chatInput').value = "";
  }

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert('New Connection');
      setid(socket.id)
    });

    console.log(socket);


    socket.emit('joined', ({User}))
    

    socket.on('welcome',(data)=>{
      setMessages([...messages, data]);
      console.log(data.User, data.message);
    })

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
  })

    socket.on('message',(data)=>{
      setMessages([...messages, data]);

      console.log(data.User, data.message);
    })


    socket.on('leave',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    return () => {
      socket.emit('userDisconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.User, data.message, data.id);
  })
  
    return () => {
      socket.off();

    }
  }, [messages])
  
    
  return (
   <>
    <section className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
              <h2>Chatify</h2>
              <a href='/'><img src='./closeIcon.png' alt='close'/></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
            {messages.map((item, i) => <Message User={item.id === id ? '' : item.User} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
            </ReactScrollToBottom>
            <div className='inputBox'>
                    <input type='text' id="chatInput" onKeyPress={(event)=> event.key === 'Enter' ? sendMsg() :null}/>
                    <button type='submit' onClick={sendMsg}  className='sendBtn'><MdSend/></button>
            </div>
        </div>
    </section>
   </>
  )
}

export default Chat
