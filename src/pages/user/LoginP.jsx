import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../server/request";
import { AuthContext } from "../../context/AuthContext";
import { setAuthCookies } from "../../utils/setAuthCookies";
import "../../scss/login.scss";

const LoginP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await request.post("auth/login", user);
      const { role } = data;
      setIsAuthenticated(true);
      setRole(role);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/my-posts");
      }
      setAuthCookies(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="container">
        {loading ? (
          "....Loading"
        ) : (
          <form className="login-form d-flex align-items-center" onSubmit={submit}>
            <div className="form-title">
              <h1>Login</h1>
            </div>
            <input
              type="text"
              onChange={handleChange}
              value={user.username}
              placeholder="username"
              name="username"
            />
            <input
              type="password"
              onChange={handleChange}
              value={user.password}
              placeholder="password"
              name="password"
            />
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginP;
