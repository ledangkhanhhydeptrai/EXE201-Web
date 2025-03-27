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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Loading from "../Loading/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bookingpetservice.onrender.com/api/user/getUserProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
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
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            marginTop: 100,
          }}
        >
          <Header />
          <div>
            <Card
              className={styles.profileCard}
              style={{
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 100,
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
                <Button
                  className={styles.navigateButton}
                  onClick={() => navigate("/bookinguser")}
                >
                  Chuyển trang
                </Button>
              </CardActions>
            </Card>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Profile;
