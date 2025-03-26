import { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import Header from "../../Header/Header";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://bookingpetservice.onrender.com/api/user/getUserProfile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          }
        );

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

    fetchProfile();
  }, []);

  return (
    <div className={styles.profilePage}>
      <Header />
      <div className={styles.container}>
        <Card className={styles.profileCard}>
          <CardContent>
            <Typography className={styles.title} variant="h5">
              Hồ Sơ Cá Nhân
            </Typography>

            {loading ? (
              <div className={styles.loading}>
                <CircularProgress size={40} />
                <Typography>Đang tải...</Typography>
              </div>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <div className={styles.profileInfo}>
                <Avatar
                  className={styles.avatar}
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
            )}
          </CardContent>
          <CardActions className={styles.actions}>
            <Button
              className={styles.navigateButton}
              onClick={() => navigate("/bookinguser")}
            >
              Chuyển trang
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
