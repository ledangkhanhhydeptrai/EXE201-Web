import React, { useEffect, useState } from "react";
import styles from "./Profille.module.scss";
import Header from "../../Header/Header";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios(
          "https://bookingpetservice.onrender.com/api/user/getUserProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setProfile(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <div className="">
      <Header />
      <div className={styles.container}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Personal Profile
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                marginBottom: "10px"
              }}
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
            </div>
            <Typography variant="h5" component="div">
              John Doe
            </Typography>
            <Typography variant="body2">
              456 Phan Xích Long, Phường 2, Quận Phú Nhuận
              <br />
              0962532184
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Button onClick={() => navigate("/bookinguser")}>Click</Button>
      </div>
    </div>
  );
};

export default Profile;
