import styles from "./Register.module.scss";
import img1 from "../../assets/z6314227807368_af67c8d227cb6907dc0782d924a25272.jpg";
import img2 from "../../assets/z6313248080550_e24e0e2ac08e0ca8b0601d6979fe26c2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [address, setAddress] = useState("");
  const [imageUserfile, setImageUserfile] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleRegister = async () => {
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("userName", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    console.log("FormData", formData);
    if (imageUserfile) {
      formData.append("imageUserfile", imageUserfile);
    }

    try {
      const response = await axios.post(
        `https://bookingpetservice.onrender.com/api/user/v1/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          timeout: 10000
        }
      );
      console.log("Response data", response.data);
      if (response.status >= 200 && response.status < 300) {
        setOpen(true);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
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
            <div className={styles.inputall}>
              <div className={styles.column}>
                <input
                  type="text"
                  placeholder="userName"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageUserfile(e.target.files[0])}
                />
              </div>
              <div className={styles.column}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.buttonall}>
              <button onClick={handleRegister}>Create Account</button>
            </div>
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
