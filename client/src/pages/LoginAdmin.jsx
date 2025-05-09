import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constant/baseurl";

const LoginAdmin = () => {
  const navigation = useNavigate();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await axios
      .post(`${baseUrl}/admin-form`, formData)
      .then((result) => {
        if (result.data === "failure") {
          setError("** Wrong Username or Password");
        } else {
          navigation("/admin-panel", {
            state: { accesstoken: result.data.accessToken },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSumitForm = (e) => {
    e.preventDefault();
  };

  return (
    <section className="login">
      <div className="main-block">
        <h1>Admin Log In</h1>
        <form onSubmit={handleSumitForm}>
          <hr />

          <hr />
          <label id="icon" htmlFor="name">
            <i className="fas fa-envelope" />
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Email"
            required
            value={formData.username}
            onChange={(e) => handleInputChange(e)}
          />

          <label id="icon" htmlFor="name">
            <i className="fas fa-unlock-alt" />
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required=""
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
          />
          <hr />
          <span style={{ color: "red" }}>{error}</span>

          <div className="btn-block">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginAdmin;
