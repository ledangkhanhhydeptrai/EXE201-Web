import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./ServiceOptional.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceOptional = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const [isLoading, setIsLoading] = useState(false);
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
  const fetchData = async () => {
    const response = await axios.get(
      `${API_URL}/OptionalService/v1/getAllOptionalServiceIsActive`
    );
    if (response.status >= 200 && response.status < 300) {
      setData(response.data.data.sort((a, b) => a.serviceId - b.serviceId));
    } else {
      throw new Error(`HTTP Status:${response.status}`);
    }
  };
  useEffect(() => {
    fetchData();
  });
  const handleSubmit = async () => {
    // 🔹 Kiểm tra dữ liệu đầu vào trước khi gửi API
    if (!serviceName || serviceName.trim() === "") {
      alert("❌ Vui lòng nhập tên dịch vụ!");
      return;
    }

    if (!description || description.trim() === "") {
      alert("❌ Vui lòng nhập mô tả dịch vụ!");
      return;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("❌ Giá dịch vụ không hợp lệ!");
      return;
    }

    if (!file) {
      alert("❌ Vui lòng tải lên hình ảnh dịch vụ!");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);

    console.log("📦 FormData content:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        `${API_URL}/OptionalService/v1/createService`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 201) {
        setData((prevData) => [...prevData, response.data.data]);
        alert("✅ Dịch vụ đã được tạo thành công!");
        setOpenCreate(false);
        window.location.reload();
      } else {
        throw new Error(`❌ HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi tạo dịch vụ:", error);

      let errorMessage = "❌ Có lỗi xảy ra khi tạo dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;

        // Xử lý lỗi từ API
        if (status === 400) {
          errorMessage = "❌ Yêu cầu không hợp lệ!";
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 409) {
          errorMessage = "❌ Dịch vụ này đã tồn tại!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(errorMessage);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // 🔹 Kiểm tra dữ liệu đầu vào trước khi gửi API
    const serviceName = event.target.serviceName.value.trim();
    const description = event.target.serviceDescription.value.trim();
    const price = event.target.servicePrice.value.trim();
    const fileInput = event.target.imageService;

    if (!serviceName) {
      alert("❌ Vui lòng nhập tên dịch vụ!");
      setIsLoading(false);
      return;
    }

    if (!description) {
      alert("❌ Vui lòng nhập mô tả dịch vụ!");
      setIsLoading(false);
      return;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("❌ Giá dịch vụ không hợp lệ!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);

    if (fileInput.files.length > 0) {
      console.log("✅ File uploaded:", fileInput.files[0].name);
      formData.append("file", fileInput.files[0]);
    } else {
      console.warn("⚠️ Không có file nào được chọn!");
    }

    // Kiểm tra dữ liệu trong FormData
    console.log("📤 Dữ liệu gửi lên:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios.put(
        `${API_URL}/OptionalService/v1/update/${currentService.serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*"
          }
        }
      );

      console.log("✅ Response data:", response.data);

      if (response.status >= 200 && response.status < 300) {
        alert("✅ Cập nhật dịch vụ thành công!");
        window.location.reload();
        handleClose();
      } else {
        alert("❌ Cập nhật dịch vụ thất bại!");
      }
    } catch (error) {
      console.error("🚨 Lỗi khi cập nhật dịch vụ:", error);

      let errorMessage = "❌ Có lỗi xảy ra khi cập nhật dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;

        // Xử lý lỗi từ API
        if (status === 400) {
          errorMessage = "❌ Yêu cầu không hợp lệ!";
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 404) {
          errorMessage = "❌ Dịch vụ không tồn tại!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm("❗ Bạn có chắc chắn muốn xóa dịch vụ này không?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/OptionalService/v1/deleteOptionalService/${serviceId}`,
        {
          headers: {
            accept: "*/*"
          },
          timeout: 5000
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("✅ Dịch vụ đã được xóa thành công!");
        setData((prevData) =>
          prevData.filter((service) => service.serviceId !== serviceId)
        );
      } else {
        alert("❌ Xóa dịch vụ thất bại! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("🚨 Lỗi khi xóa dịch vụ:", error);

      let errorMessage = "❌ Đã xảy ra lỗi khi xóa dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;

        // Xử lý lỗi từ API
        if (status === 400) {
          errorMessage = "❌ Yêu cầu không hợp lệ!";
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 403) {
          errorMessage = "❌ Bạn không có quyền xóa dịch vụ này!";
        } else if (status === 404) {
          errorMessage = "❌ Dịch vụ không tồn tại hoặc đã bị xóa!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "⏳ Yêu cầu xóa dịch vụ bị quá thời gian!";
      }

      alert(errorMessage);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Sidebar />
      <div className={styles.createButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreate}
          style={{
            display: "block",
            margin: "20px auto"
          }}
        >
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
                onClick={handleSubmit}
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
            overflow: "hidden",
            marginTop: "-50px"
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
                  Trang thái
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
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#ffe6ea",
                        cursor: "pointer"
                      }
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
                          src={`${row.imageServiceBase64}?t=${Date.now()}`}
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
                      {row.active ? "Đang hoạt dộng" : "Không hoat động"}
                    </TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() => handleOpen(row)}
                        style={{ fontSize: "0.8rem", width: "90px" }}
                      >
                        Cập nhật
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button onClick={() => handleDelete(row.serviceId)}>
                        Xóa
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          navigate(`/serviceoptional/${row.serviceId}`)
                        }
                        sx={{ fontSize: "0.75rem", width: "84px" }}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
            <form onSubmit={handleUpdate}>
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                name="serviceName"
                defaultValue={currentService?.serviceName}
                required
              />

              <label htmlFor="serviceDescription">Description</label>
              <input
                type="text"
                name="serviceDescription"
                defaultValue={currentService?.description}
                required
              />

              <label htmlFor="servicePrice">Price</label>
              <input
                type="number"
                name="servicePrice"
                defaultValue={currentService?.price}
                required
              />

              <label htmlFor="imageService">Image Service</label>
              <input type="file" name="imageService" required />

              <button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </Modal>
        <div className={styles.pagination}>
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default ServiceOptional;
