import styles from "./Login.module.scss";
import img1 from "../../assets/z6313225194380_1e8ed0e7e86fefb78e707584269e6841.jpg";
import img2 from "../../assets/z6313248080550_e24e0e2ac08e0ca8b0601d6979fe26c2.jpg";
import img3 from "../../assets/z6313403101063_a088990a8d22dfcaa61c010e6b4875ff.jpg";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const handleLogin = async () => {
    if (!userName || !password) {
      alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/user/v1/login`,
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
          alert("Không tìm thấy token trong phản hồi!");
          return;
        }

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          const role = decoded.role || "ROLE_CUSTOMER";
          const username = decoded.userName || decoded.username || userName;
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
          alert("Lỗi khi giải mã token!");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error:", errorMessage);

      if (errorMessage.includes("Username doesn't exist")) {
        alert("Tên người dùng không tồn tại!");
      } else if (errorMessage.includes("Incorrect password")) {
        alert("Mật khẩu không chính xác!");
      } else {
        alert("Đăng nhập thất bại! Vui lòng thử lại.");
      }
    }
  };
  const handleForgotPassword = async () => {
    if (!userName || !newPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/user/v1/forGotPassword`,
        {
          userName,
          newPassword
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message); // Hiển thị "Update password successfully"
        setOpen(false);
      }
    } catch (error) {
      console.error(
        "Forgot Password Error:",
        error.response?.data || error.message
      );
      alert("Không thể đặt lại mật khẩu. Vui lòng thử lại!");
    }
    setLoading(false);
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
              Đăng nhập với Google
            </button>
            <div className={styles.hoac}>
              <div className={styles.borderleft} />
              <p>Hoặc</p>
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
                Đăng nhập
              </button>
              <br />
              <br />
              <button
                className={styles.registernow}
                onClick={() => navigate("/register")}
              >
                Đăng kí bây giờ
              </button>
            </div>
            <div className={styles.passwordfinal}>
              <button
                className={styles.forgotPassword}
                onClick={() => setOpen(true)}
              >
                Quên mật khẩu?
              </button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle className={styles.popupTitle}>
                  Quên mật khẩu?
                </DialogTitle>
                <DialogContent>
                  <p className={styles.popupText}>
                    Nhập username và new password của bạn để đặt lại mật khẩu.
                  </p>
                  <input
                    type="text"
                    placeholder="Nhập username mới"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ width: "100%", marginBottom: 12 }}
                  />
                  <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpen(false)}
                    className={styles.cancelButton}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleForgotPassword}
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className={styles.conditions}>
            <Link to="/">
              <p>Điều khoản & Điều kiện của việc nhận nuôi thú cưng</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
