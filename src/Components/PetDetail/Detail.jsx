import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  DialogActions
} from "@mui/material";
import Header from "../../Header/Header";
import styles from "./Detail.module.scss";
import Footer from "../../Footer/Footer";
const Detail = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [petDetail, setPetDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petGender, setPetGender] = useState("");
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const token = localStorage.getItem("jwt");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const UpdateFeed = async (pet) => {
    setSelectedPet(pet);
    setPetName(pet?.petName);
    setPetType(pet?.petType);
    setPetGender(pet?.petGender);
    setFile(null);
    setNote(pet?.notes);
    setPetAge(pet?.petAges);
    setShowUpdateForm(true);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedPet || !selectedPet.petId) {
      alert("❌ Lỗi: Không tìm thấy thú cưng! Vui lòng chọn lại.");
      return;
    }

    const formData = new FormData();
    formData.append("petId", petId);
    formData.append("petName", petName);
    formData.append("petTypeEnum", petType);
    formData.append("petGenderEnum", petGender);
    formData.append("notes", note);
    formData.append("ages", petAge);
    console.log("🆔 petId:", petId);
    console.log("🆔 selectedPet?.petId:", selectedPet?.petId);
    // 🛑 Kiểm tra nếu người dùng đã chọn file ảnh mới
    if (file) {
      formData.append("imagePet", file);
    } else {
      console.warn("⚠️ Không có file ảnh, gửi request không có ảnh.");
    }

    // 📝 Kiểm tra dữ liệu gửi đi
    console.log("📤 FormData Gửi đi:");
    for (let [key, value] of formData.entries()) {
      console.log(`📝 ${key}:`, value);
    }

    try {
      console.log("📤 Sending Data:", Object.fromEntries(formData.entries()));

      const response = await axios.put(
        `https://bookingpetservice.onrender.com/api/pets/v1/updatePet/${selectedPet?.petId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("✅ Cập nhật thú cưng thành công!");
        setShowUpdateForm(false);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi cập nhật dịch vụ:", error);
      console.error("🔴 Response Data:", error.response?.data);

      alert(
        `❌ Lỗi cập nhật: ${error.response?.data?.message || "Có lỗi xảy ra!"}`
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Đang gọi API với petID:", petId);
        const response = await axios.get(
          `https://bookingpetservice.onrender.com/api/pets/getPetByIdOfUser/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
          }
        );
        console.log("Dữ liệu nhận được:", response.data);
        setPetDetail(response.data.data);
      } catch (error) {
        console.error(
          "Lỗi khi gọi API:",
          error.response?.status,
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [petId]);

  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography>Đang tải dữ liệu...</Typography>
      </Container>
    );
  }

  if (!petDetail) {
    return (
      <Container style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h5">Không tìm thấy thú cưng</Typography>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <Typography className={styles.header}>Thông tin chi tiết</Typography>
        <img
          src={petDetail.imagePetBase64}
          alt={petDetail.petName}
          className={styles.petImage}
        />
        <Typography className={styles.petInfo}>
          <strong>Tên:</strong> {petDetail.petName}
        </Typography>
        <Typography className={styles.petInfo}>
          <strong>Loại:</strong> {petDetail.petTypeEnum}
        </Typography>
        <Typography className={styles.petInfo}>
          <strong>Giới tính:</strong> {petDetail.petGenderEnum}
        </Typography>
        <Typography className={styles.petInfo}>
          <strong>Tuổi:</strong> {petDetail.age} tháng
        </Typography>
        <div className={styles.buttonContainer}>
          <Button variant="contained" className={styles.adoptButton}>
            Nhận Nuôi
          </Button>
          <Button
            variant="contained"
            className={styles.updateButton}
            onClick={() => UpdateFeed(petDetail)}
          >
            Cập Nhật
          </Button>
          <Button
            variant="outlined"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Quay Lại
          </Button>
        </div>
      </Container>
      <Dialog
        open={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
        fullWidth
      >
        <DialogTitle>Cập Nhật Thú Cưng</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Tên thú cưng"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <Select
            fullWidth
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          >
            <MenuItem value="DOG">Chó</MenuItem>
            <MenuItem value="CAT">Mèo</MenuItem>
          </Select>

          <Select
            fullWidth
            value={petGender}
            onChange={(e) => setPetGender(e.target.value)}
          >
            <MenuItem value="MALE">Đực</MenuItem>
            <MenuItem value="FEMALE">Cái</MenuItem>
          </Select>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <TextField
            fullWidth
            margin="dense"
            type="number"
            label="Tuổi (tháng)"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowUpdateForm(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
      {/* {selectedPet && (
        <div className={styles.petDetail}>
          <h2>Thông tin chi tiết</h2>
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
          <button className={styles.adoptButton}>Nhận Nuôi</button>
          <button
            className={styles.updateButton}
            onClick={() => UpdateFeed(selectedPet)}
          >
            Cập Nhật
          </button>
          
        </div>
      )} */}
      <Footer/>
    </>
  );
};

export default Detail;
