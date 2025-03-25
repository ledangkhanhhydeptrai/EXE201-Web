import styles from "./Login.module.scss";
import img1 from "../../assets/z6313225194380_1e8ed0e7e86fefb78e707584269e6841.jpg";
import img2 from "../../assets/z6313248080550_e24e0e2ac08e0ca8b0601d6979fe26c2.jpg";
import img3 from "../../assets/z6313403101063_a088990a8d22dfcaa61c010e6b4875ff.jpg";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!userName || !password) {
      console.log("Please fill in the text field");
      return;
    }

    try {
      const response = await axios.post(
        `https://bookingpetservice.onrender.com/api/user/v1/login`,
        { userName, password },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000
        }
      );

      console.log("API Response:", response.data);

      if (response.status >= 200 && response.status < 300) {
        console.log("Login successfully");

        const token = response.data.data;
        if (!token) {
          console.error("Token is missing in response!");
          return;
        }

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          const role = decoded.role || "ROLE_CUSTOMER";
          const username = decoded.userName;
          console.log("User Role:", role);
          console.log("Username:", username);

          localStorage.setItem("role", role);
          localStorage.setItem("jwt", token);
          localStorage.setItem("username", username);

          if (role === "ADMIN") {
            navigate("/dashboard");
          } else if (role === "STAFF") {
            navigate("/dashboard1");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error decoding token:", error.message);
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <div className={styles.firsttitle}>
          <div className={styles.imagefirst}>
            <img src={img1} alt="" />
          </div>
          <div className={styles.imagesecond}>
            <img src={img2} alt="" onClick={() => navigate("/")} />
          </div>
          <div className={styles.title}>
            <p>Đăng nhập vào Adopt Pet</p>
            <button className={styles.googleButton}>
              <img src={img3} alt="Google Icon" className={styles.googleIcon} />
              Sign Up with Google
            </button>
            <div className={styles.hoac}>
              <div className={styles.borderleft} />
              <p>OR</p>
              <div className={styles.borderright} />
            </div>
            <div className={styles.inputall}>
              <input
                type="text"
                placeholder="userName"
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.buttonall}>
              <button className={styles.signin} onClick={handleLogin}>
                Sign In
              </button>
              <br />
              <br />
              <button
                className={styles.registernow}
                onClick={() => navigate("/register")}
              >
                Register Now
              </button>
            </div>
            <div className={styles.passwordfinal}>
              <Link to="/">
                <p>Forget Password?</p>
              </Link>
            </div>
          </div>
          <div className={styles.conditions}>
            <Link to="/">
              <p>Adopt Pet Terms & Conditions</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
