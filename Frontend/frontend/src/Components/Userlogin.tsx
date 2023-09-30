import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie"; // Import js-cookie library
import "./Userlogin.css";

function Emplogin() {
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Use useNavigate inside the component function
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Perform the API request and handle the response here

    // Example fetch request
    fetch(
      "http://203.188.54.9/~u6411130038/mini-project/Backend/api/login_candidate.php?request=login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${inputs.email}&password=${inputs.password}`,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response:", result);
        setLoading(false);

        if (result.id) {
          setMessage("Login successful.");

          // Set a cookie with the user ID
          Cookies.set("candidateID", result.id, { expires: 7 }); // Expires in 7 days
          // Redirect to the homepage with user data
          navigate("/");
        } else {
          setMessage("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setLoading(false);
        setMessage("Login failed. An error occurred.");
      });
  };

  return (
    <>
      <div className="logincontainer">
        <div className="login-form">
          <h2>Login</h2>
          <div className="icon">
            <i className="fas fa-user"></i>
          </div>
          <form
            className="login-form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="email">Email:</label>
              <input
                type="text"
                name="username"
                value={inputs.email || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                placeholder="Enter your email"
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="password">Password:</label>
              <input
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Enter your password"
                required
              ></input>
            </div>
            <div className="form-group">
              <input type="submit" value="Login"></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Emplogin;
