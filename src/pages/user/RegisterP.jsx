import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../server/request";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

const RegisterP = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setisAuthenticated } = useContext(AuthContext);
  setisAuthenticated;
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  console.log(user);

  async function submit(event) {
    event.preventDefault();
    try {
      const {
        data: { token, role, expire },
      } = await request.post("/auth/register", user);
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      Cookies.set(EXPIRE_DATE, expire);
      if (role === "user") {
        navigate("/my-posts");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      <div className="container">
        <form
          className="login-form d-flex align-items-center"
          onSubmit={submit}
        >
          <div className="form-title">
            <h1>Register</h1>
          </div>
          <input
            type="text"
            onChange={handleChange}
            value={user.first_name}
            placeholder="Firstname"
            name="first_name"
          />
          <input
            type="text"
            onChange={handleChange}
            value={user.last_name}
            placeholder="Lastname"
            name="last_name"
          />
          <input
            type="text"
            onChange={handleChange}
            value={user.username}
            placeholder="Username"
            name="username"
          />
          <input
            type="password"
            onChange={handleChange}
            value={user.password}
            placeholder="Password"
            name="password"
          />
          <input
            type="password"
            onChange={handleChange}
            value={user.password}
            placeholder="Confirm Password"
            name="password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
};

export default RegisterP;
