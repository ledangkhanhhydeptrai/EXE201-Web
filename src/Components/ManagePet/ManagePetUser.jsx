import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ManagePet.module.scss";
import Header from "../../Header/Header";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
/* Danh sách thú cưng của bạn copy trang feed qua trang managepetUser
   Trang danh sách thú cưng đổi thành cái nhận nuôi
*/
export default function ManagepetUser() {
  const [selectedPet] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petGender, setPetGender] = useState("");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("jwt"));
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    if (isLoggedIn) {
      setShowForm(true);
    } else {
      setOpenPopUp(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bookingpetservice.onrender.com/api/pets/v1/getPetListOfUser",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setData(response.data.data);
        }
        console.log("API Response:", response.data.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.warn("JWT token không tồn tại!");
    }
    console.log("JWT Token:", token);
  }, [token]);
  const formData = new FormData();
  formData.append("petName", petName);
  formData.append("petType", petType);
  formData.append("petGender", petGender);
  formData.append("file", file);
  formData.append("note", note);
  formData.append("petAge", petAge);
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://bookingpetservice.onrender.com/api/pets/v1/createPet",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setData([...data, response.data.data]);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Lỗi tạo thú cưng:", error);
    }
  };
  const date = new Date().toDateString();
  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Danh sách thú cưng của bạn</h1>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button variant="contained" onClick={handleClick}>
          + Create
        </Button>
      </Box>
      <div className={styles.petsList}>
        {data?.map((pet, index) => (
          <div
            key={pet?.petId || index}
            className={`${styles.petCard} ${
              selectedPet?.petId === pet?.petId ? styles.selected : ""
            }`}
            onClick={() => navigate(`/pet/${pet.petId}`)}
          >
            <img
              src={pet?.imagePetBase64}
              alt={pet?.petName}
              className={styles.petImage}
            />
            <h3>{pet?.petName}</h3>
            <p>
              {pet?.petType} - {pet?.age} tháng - {pet?.petGender}
            </p>
          </div>
        ))}
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thông tin chi tiết</DialogTitle>
        <DialogContent>
          <p>
            <strong>Tên:</strong> {selectedPet?.petName}
          </p>
          <p>
            <strong>Loại:</strong> {selectedPet?.petTypeEnum}
          </p>
          <p>
            <strong>Giới tính:</strong> {selectedPet?.petGenderEnum}
          </p>
          <p>
            <strong>Tuổi:</strong> {selectedPet?.age} tháng
          </p>
          <p>{date}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
          <Button variant="contained" color="primary">
            Nhận Nuôi
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPopUp} onClose={() => setOpenPopUp(false)}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>Bạn cần đăng nhập mới tạo được thú cưng!</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopUp(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>Tạo Thú Cưng</DialogTitle>
        <DialogContent className={styles["popup-container"]}>
          <input
            type="text"
            placeholder="Tên thú cưng"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Loại thú cưng"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Giới tính"
            value={petGender}
            onChange={(e) => setPetGender(e.target.value)}
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
          />
          <input
            type="file"
            className={styles["file-input"]}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <textarea
            placeholder="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions className={styles["dialog-actions"]}>
          <Button
            className={styles["cancel-button"]}
            onClick={() => setShowForm(false)}
          >
            Hủy
          </Button>
          <Button className={styles["create-button"]} onClick={handleCreate}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
}
