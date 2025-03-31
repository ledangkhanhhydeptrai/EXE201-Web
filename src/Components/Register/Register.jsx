import styles from "./Register.module.scss";
import img1 from "../../assets/z6314227807368_af67c8d227cb6907dc0782d924a25272.jpg";
import img2 from "../../assets/z6313248080550_e24e0e2ac08e0ca8b0601d6979fe26c2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
export default function Register() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user_name_account, setUser_name_account] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const handleCreate = async (e) => {
    e.preventDefault();
    setErrors({});
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }));
      return;
    }
    const formData = new FormData();
    formData.append("user_name_account", user_name_account);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axios.post(`${API_URL}/user/v1/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("API Response:", response.data.data);
      if (response.status >= 200 && response.status < 300) {
        setOpen(true);
      } else {
        throw new Error(`HTTP Status:${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.errors) {
          const newErrors = {};
          data.errors.forEach((err) => {
            newErrors[err.field] = err.msg;
          });
        } else if (data.message) {
          alert(`Error: ${data.message}`);
        } else {
          alert(`Error: ${JSON.stringify(data)}`);
        }
      } else if (error.request) {
        alert("Server không phản hồi, vui lòng thử lại sau");
      } else {
        alert(`Unexpected Error:${error.message}`);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <div className={styles.title}>
          <div className={styles.firstImage}>
            <img src={img1} alt="" />
          </div>
          <div className={styles.secondImage}>
            <img src={img2} alt="" onClick={() => navigate("/")} />
          </div>
          <div className={styles.mainTitle}>
            <p>Create Account</p>
            <form className={styles.inputall} onSubmit={handleCreate}>
              <div className={styles.column}>
                <input
                  type="text"
                  placeholder="usernameaccount"
                  onChange={(e) => setUser_name_account(e.target.value)}
                  value={user_name_account}
                />
                {errors.user_name_account && (
                  <p className="error">{errors.user_name_account}</p>
                )}
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                />
                {errors.fullname && <p className="error">{errors.fullname}</p>}
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {errors.file && <p className={styles.error}>{errors.file}</p>}
              </div>
              <div className={styles.column}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {errors.address && (
                  <p className={styles.error}>{errors.address}</p>
                )}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                {errors.confirmPassword && (
                  <p className={styles.error}>{errors.confirmPassword}</p>
                )}
              </div>
              <div className={styles.buttonall}>
                <button>Create Account</button>
              </div>
            </form>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>🎉 Registration Successful</DialogTitle>
              <DialogContent>
                <p>Welcome! You have registered successfully.</p>
                <Button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                  variant="contained"
                  color="primary"
                >
                  Go to Login
                </Button>
              </DialogContent>
            </Dialog>
            <div className={styles.foot}>
              <p>
                Already have an account?{" "}
                <Link to="/login" className={styles.loginlink}>
                  Login
                </Link>
              </p>
            </div>
            <div className={styles.conditions}>
              <Link to="/">
                <p>Adopt Pet Terms & Conditions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
