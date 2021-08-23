import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import FriendlyError from "../Util/FriendlyError";

function Register() {
   const {register, error} = useContext(AuthContext)
   const history = useHistory();
  //const { user, loading, error, login, register, logout } = auth();

  const [registerInfo, setRegisterInfo] = useState({username: "", password: ""});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const registerUser = () => {
    register(registerInfo.username, registerInfo.password, result => {
      if(result.status === "success"){
        history.push("/")
      }
    })
  };

  return (
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={registerInfo.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={registerInfo.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={registerUser} className="btn btn-success">
            Register
          </button>

          {error && <FriendlyError error={error}/>}

          <br />
        </div>
    </div>
  );
}

export default Register;