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
import Loading from "../Loading/Loading";
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
  const [isCreatePetApiFetching, setCreatePetApiFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const handleClick = async () => {
    if (isLoggedIn) {
      setShowForm(true);
    } else {
      setOpenPopUp(true);
    }
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/pets/v1/getPetListOfUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status >= 200 && response.status < 300) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      console.warn("JWT token không tồn tại!");
    }
  }, [token]);
  const formData = new FormData();
  formData.append("petName", petName);
  formData.append("petType", petType);
  formData.append("petGender", petGender);
  formData.append("file", file);
  formData.append("note", note);
  formData.append("petAge", petAge);
  const resetFormData = () => {
    setPetName("");
    setPetType("");
    setPetGender("");
    setFile("");
    setNote("");
    setPetAge("");
  };
  const handleCreate = async () => {
    try {
      setCreatePetApiFetching(true);

      const response = await axios.post(
        `${API_URL}/pets/v1/createPet`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("API Response:", response.data); // Debugging

      if (response.status === 201) {
        setData((prevData) => [
          ...(Array.isArray(prevData) ? prevData : []),
          response.data.data
        ]);
        fetchData(); // Ensure this doesn’t reset data incorrectly
        setShowForm(false);
        resetFormData();
      }
    } catch (error) {
      console.error("🚨 Lỗi khi tạo thú cưng:", error);
      console.error("🔴 Response Data:", error.response?.data);

      let errorMessage = "❌ Có lỗi xảy ra!";
      if (error.response) {
        const { data, status } = error.response;

        // Xử lý lỗi trả về từ API
        if (status === 400 && data?.errors) {
          errorMessage = data.errors.map((err) => `- ${err.msg}`).join("\n");
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 409) {
          errorMessage = "❌ Thú cưng đã tồn tại!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(`❌ Lỗi khi thêm thú cưng:\n${errorMessage}`);
    } finally {
      setCreatePetApiFetching(false);
    }
  };

  const deletePetByUser = async (petId) => {
    if (!petId) {
      alert("❌ Lỗi: Không tìm thấy thú cưng cần xóa!");
      return;
    }

    const confirmDelete = window.confirm(
      "⚠️ Bạn có chắc chắn muốn xóa thú cưng này?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${API_URL}/pets/deletePetOfUserById/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setData((prevData) => prevData.filter((a) => a.petId !== petId));
        alert("✅ Xóa thú cưng thành công!");
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi xóa thú cưng:", error);
      console.error("🔴 Response Data:", error.response?.data);

      let errorMessage = "❌ Có lỗi xảy ra!";
      if (error.response) {
        const { data, status } = error.response;

        // Xử lý lỗi từ API
        if (status === 400 && data?.errors) {
          errorMessage = data.errors.map((err) => `- ${err.msg}`).join("\n");
        } else if (status === 404) {
          errorMessage = "❌ Không tìm thấy thú cưng hoặc đã bị xóa!";
        } else if (status === 403) {
          errorMessage = "❌ Bạn không có quyền xóa thú cưng này!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(`❌ Lỗi khi xóa:\n${errorMessage}`);
    }
  };

  const date = new Date().toDateString();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Header />
          <h1 className={styles.title}>Danh sách thú cưng của bạn</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            <Button variant="contained" onClick={handleClick}>
              + Thêm thú cưng
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn click vào card khi xóa
                    deletePetByUser(pet.petId);
                  }}
                >
                  Xóa thú cưng
                </Button>
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
            <DialogContent>
              Bạn cần đăng nhập mới tạo được thú cưng!
            </DialogContent>
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
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value="">Chọn loại thú cưng</option>
                <option value="CAT">CAT</option>
                <option value="DOG">DOG</option>
              </select>
              <select
                value={petGender}
                onChange={(e) => setPetGender(e.target.value)}
              >
                <option value="">Chọn Giới Tính</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
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
              <Button
                disabled={isCreatePetApiFetching}
                className={styles["create-button"]}
                onClick={handleCreate}
              >
                {isCreatePetApiFetching ? "Đang tạo" : "Xác nhận"}
              </Button>
            </DialogActions>
          </Dialog>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
