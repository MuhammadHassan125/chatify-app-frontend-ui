import { Link } from 'react-router-dom';
import './App.css';
import {useState} from 'react'


let User;

const sendUser = () =>{
  User = document.getElementById("logininput").value;
  document.getElementById("logininput").value = "";
}


function App() {

  const [name, setname] = useState("");
  console.log(name);

  return (
    <>
      <section className="login">
        <div className="container">
              <img src="https://static.vecteezy.com/system/resources/previews/012/872/330/original/bubble-chat-icon-3d-png.png" alt="logo"/>
              <h1>Chatify</h1>
              <input onChange={(e)=>{setname(e.target.value)}} type="text" id="logininput"/>
              <Link onClick={(event) => { if (!name) event.preventDefault(); }} to="/chat">
                <button type="submit" onClick={sendUser}>Join Now</button>
              </Link>

        </div>
      </section>
    </>
  );
}

export default App;
export {User};
