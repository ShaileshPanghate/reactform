import './App.css';
import { useState } from "react";

function App() {

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setState({ ...state, [name]: value });


  }
  const funcSubmit = async (event) => {
    event.preventDefault()

    const { name, email, phone, message } = state;

    if(name && email && phone && message ){
      const res = await fetch("https://reactform-22b17-default-rtdb.firebaseio.com/youtubereactform.json", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });
      if(res){
        setState({
        name: "",
        email: "",
        phone: "",
        message: ""
       })
       alert("Data Stored Successfully")
      }
    }
    else{
      alert("Please fill all data")
    }
    

  }

  return (
    <div className="App">
      <h3>Contact US</h3>
      <header className="App-header">
        <form method="post">
          <div>
            <label >Name : </label>
            <input type="text" name="name" value={state.name} autoComplete="off" placeholder='Enter your Name' onChange={getUserData} required />
          </div>
          <div>
            <label >Email : </label>
            <input type="email" name="email" value={state.email} autoComplete="off" placeholder='Enter Email' onChange={getUserData} />
          </div>
          <div>
            <label >Phone No : </label>
            <input type="number" name="phone" value={state.phone} autoComplete="off" placeholder='Enter Phone no' onChange={getUserData} />
          </div>
          <div>
            <label >Message : </label>
            <input type="textbox" name="message" value={state.message} autoComplete="off" placeholder='Enter Message' onChange={getUserData} />
          </div>
          <br />
          <button onClick={(event) => funcSubmit(event)}>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
