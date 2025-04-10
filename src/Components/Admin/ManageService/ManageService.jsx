import styles from "./ManageService.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../HeaderAdmin/Header";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Pagination
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ManageService() {
  const [serviceRows, setServiceRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = serviceRows.slice(startIndex, endIndex);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const handleOpen = (service) => {
    setCurrentService(service);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Lấy dữ liệu từ form
    const serviceName = event.target.serviceName.value.trim();
    const description = event.target.serviceDescription.value.trim();
    const price = event.target.servicePrice.value.trim();
    const fileInput = event.target.imageService;

    // 🔹 Validation dữ liệu đầu vào
    if (!serviceName || serviceName.length < 3) {
      alert("❌ Vui lòng nhập tên dịch vụ hợp lệ (ít nhất 3 ký tự)!");
      return;
    }
    if (!description || description.length < 10) {
      alert("❌ Mô tả phải có ít nhất 10 ký tự!");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("❌ Giá dịch vụ không hợp lệ!");
      return;
    }
    if (fileInput.files.length === 0) {
      alert("❌ Vui lòng tải lên hình ảnh!");
      return;
    }

    const file = fileInput.files[0];
    if (!file.type.startsWith("image/")) {
      alert("❌ Chỉ chấp nhận file hình ảnh!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ Kích thước ảnh không được vượt quá 2MB!");
      return;
    }

    // ✅ Thêm dữ liệu vào FormData
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);

    try {
      const response = await axios.put(
        `${API_URL}/service/v1/update/${currentService.serviceId}`,
        formData,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("✅ Cập nhật dịch vụ thành công!");
        handleClose();
        window.location.reload();
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi cập nhật dịch vụ:", error);

      let errorMessage = "❌ Có lỗi xảy ra!";
      if (error.response) {
        const { data, status } = error.response;

        // Xử lý lỗi từ API
        if (status === 400 && data?.errors) {
          errorMessage = data.errors.map((err) => `- ${err.msg}`).join("\n");
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(`❌ Lỗi khi cập nhật dịch vụ:\n${errorMessage}`);
    }
  };

  const handleDelete = async (serviceId) => {
    if (!serviceId) {
      alert("❌ Service ID không hợp lệ!");
      return;
    }

    const isConfirmed = window.confirm(
      "⚠️ Bạn có chắc chắn muốn xóa dịch vụ này?"
    );
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(
        `${API_URL}/service/v1/deleteService/${serviceId}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          },
          timeout: 5000
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("✅ Dịch vụ đã được xóa thành công!");
        setServiceRows((prevRows) =>
          prevRows.filter((service) => service.serviceId !== serviceId)
        );
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi xóa dịch vụ:", error);

      let errorMessage = "❌ Có lỗi xảy ra khi xóa dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;

        // Xử lý lỗi từ API
        if (status === 400) {
          errorMessage = "❌ Yêu cầu không hợp lệ!";
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 404) {
          errorMessage = "❌ Không tìm thấy dịch vụ!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "❌ Yêu cầu bị hủy do hết thời gian chờ!";
      }

      alert(errorMessage);
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      const response = await axios.get(
        `${API_URL}/service/v1/getAllServiceByAdmin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );
      setServiceRows(
        response.data.data.sort((a, b) => a.serviceId - b.serviceId)
      );
    };
    fetchService();
  }, [API_URL]);

  const handleCreate = async () => {
    // Kiểm tra dữ liệu trước khi gửi
    if (!serviceName || serviceName.trim().length < 3) {
      alert("❌ Vui lòng nhập tên dịch vụ hợp lệ (ít nhất 3 ký tự)!");
      return;
    }
    if (!description || description.trim().length < 10) {
      alert("❌ Mô tả phải có ít nhất 10 ký tự!");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("❌ Giá dịch vụ không hợp lệ!");
      return;
    }
    if (!file) {
      alert("❌ Vui lòng tải lên hình ảnh!");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("❌ Chỉ chấp nhận file hình ảnh!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ Kích thước ảnh không được vượt quá 2MB!");
      return;
    }

    // ✅ Chuẩn bị form data
    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_URL}/service/v1/createService`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setServiceRows([...serviceRows, response.data.data]);
        alert("✅ Dịch vụ đã được tạo thành công!");
        window.location.reload();
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi tạo dịch vụ:", error);

      let errorMessage = "❌ Có lỗi xảy ra!";
      if (error.response) {
        const { data, status } = error.response;

        // Xử lý lỗi trả về từ API
        if (status === 400 && data?.errors) {
          errorMessage = data.errors.map((err) => `- ${err.msg}`).join("\n");
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(`❌ Lỗi khi tạo dịch vụ:\n${errorMessage}`);
    }
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.createButtonContainer}>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Tạo dịch vụ
        </Button>

        <Dialog open={openCreate} onClose={handleCloseCreate}>
          <DialogTitle className={styles.dialogTitle}>
            Tạo dịch vụ cho thú cưng
          </DialogTitle>
          <DialogContent>
            <div className={styles.formContainer}>
              <label htmlFor="serviceName">Tên dịch vụ</label>
              <input
                type="text"
                placeholder="Enter a service name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />

              <label htmlFor="description">Miêu tả</label>
              <input
                type="text"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="price">Giá dịch vụ</label>
              <input
                type="number"
                placeholder="Enter a price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="price">File</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className={styles.container}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="service table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f50057" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Service ID
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Tên dịch vụ
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Miêu tả
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Giá dịch vụ
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Hình ảnh
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Cập nhật
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Xóa
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Chi tiết
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#ffe6ea", cursor: "pointer" }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.serviceId}
                  </TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={row.imageServiceBase64}
                        alt="Service"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {row.active ? "Hoạt động" : "Không hoạt động"}
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => handleOpen(row)}>Sửa</button>
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => handleDelete(row.serviceId)}>
                      Xóa
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate(`/manageservice/${row.serviceId}`)
                      }
                      sx={{ fontSize: "0.75rem", width: "84px" }} // chỉnh cỡ chữ nhỏ hơn
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
          open={open}
          onClose={handleClose}
        >
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="serviceName">Tên dịch vụ</label>
              <input
                type="text"
                name="serviceName"
                defaultValue={currentService?.serviceName}
                title="Service Name"
              />
              <label htmlFor="serviceDescription">Miêu tả</label>
              <input
                type="text"
                name="serviceDescription"
                defaultValue={currentService?.description}
                title="Description"
              />
              <label htmlFor="servicePrice">Giá dịch vụ</label>
              <input
                type="number"
                name="servicePrice"
                defaultValue={currentService?.price}
                title="Price"
              />
              <label htmlFor="imageService">Hình ảnh dịch vụ</label>
              <input type="file" name="imageService" title="Image Service" />
              <button type="submit">Cập nhật</button>
            </form>
          </div>
        </Modal>
        <div className={styles.pagination}>
          <Pagination
            count={Math.ceil(serviceRows.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      </div>
    </>
  );
}
