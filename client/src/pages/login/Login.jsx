import { useState } from "react";
import axios from "axios";
import baseUrl from "../../config/urls";

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({
    email: "praveen.yadav@gmail.com",
    password: "password123",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(
        `${baseUrl}/api/auth/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login successful:", data);

      // Optional: store token if backend sends
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err);

      const message = err?.response?.data?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

// Basic inline styles (replace with MUI/Tailwind in real app)
const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
};

export default Login;
