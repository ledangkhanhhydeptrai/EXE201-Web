import { useEffect, useState } from "react";
import styles from "./Profile1.module.scss";

import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";
import Loading from "../../Loading/Loading";
import Header1 from "../HeaderAdmin/Header1";
import Sidebar1 from "../Sidebar/Sidebar1";

const ProfileStaff = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [setError] = useState("");
  const [open, setOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/user/getUserProfile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });

      if (response.data.status === "200 OK") {
        setProfile(response.data.data);
      } else {
        setError("Không thể tải thông tin hồ sơ!");
      }
    } catch (error) {
      setError("Lỗi kết nối đến server!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axios.put(
        `${API_URL}/user/v1/updateUserProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert("Update profile successfully");
        window.location.reload();
      } else {
        alert("Update profile failed");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            marginTop: 100
          }}
        >
          <div style={{ marginTop: "-100px" }}>
            <Header1 />
          </div>
          <Sidebar1 />
          <div style={{ marginTop: "50px" }}>
            <Card
              className={styles.profileCard}
              style={{
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 100
              }}
            >
              <CardContent>
                <Typography style={{ textAlign: "center" }} variant="h4">
                  Hồ Sơ Cá Nhân
                </Typography>

                <div className={styles.profileInfo}>
                  <Avatar
                    sx={{ borderRadius: 0, width: 100, height: 100 }} // Bo góc vuông và kích thước lớn
                    alt={profile?.fulName || "User Avatar"}
                    src={
                      profile?.avatarBase64 ||
                      "https://mui.com/static/images/avatar/1.jpg"
                    }
                  />

                  <Typography className={styles.name}>
                    {profile?.fulName || "Chưa có tên"}
                  </Typography>
                  <Typography className={styles.details}>
                    <strong>Email:</strong> {profile?.email || "Chưa có email"}{" "}
                    <br />
                    <strong>Địa chỉ:</strong>{" "}
                    {profile?.address || "Chưa có địa chỉ"} <br />
                    <strong>Điện thoại:</strong>{" "}
                    {profile?.phone || "Chưa có số điện thoại"}
                  </Typography>
                  <Typography
                    className={styles.status}
                    style={{ color: profile?.active ? "green" : "red" }}
                  >
                    Trạng thái:{" "}
                    {profile?.active ? "Hoạt động" : "Không hoạt động"}
                  </Typography>
                </div>
              </CardContent>
              <CardActions className={styles.actions}>
                <Button className={styles.navigateButton} onClick={handleOpen}>
                  Update
                </Button>
              </CardActions>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cập nhật Profile</DialogTitle>
                <DialogContent>
                  <TextField
                    label="fullname"
                    placeholder="Enter fullname"
                    onChange={(e) => setFullname(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="phone"
                    placeholder="Enter phone"
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="address"
                    placeholder="Enter address"
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    margin="dense"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFile(file);
                    }}
                    style={{ marginTop: "10px" }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleUpdate}>Cập nhật profile</Button>
                  <Button onClick={handleClose}>Đóng</Button>
                </DialogActions>
              </Dialog>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStaff;
