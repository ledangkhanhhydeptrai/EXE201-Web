import styles from "./ManageService1.module.scss";
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
import Sidebar1 from "../Sidebar/Sidebar1";
import Header1 from "../HeaderAdmin/Header1";
export default function ManageService1() {
  const [serviceRows, setServiceRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
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

    // Kiểm tra dữ liệu đầu vào
    if (!serviceName) {
      alert("❌ Tên dịch vụ không được để trống!");
      return;
    }
    if (!description) {
      alert("❌ Mô tả dịch vụ không được để trống!");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("❌ Giá dịch vụ phải là một số hợp lệ và lớn hơn 0!");
      return;
    }
    if (!fileInput.files.length) {
      alert("❌ Vui lòng tải lên một hình ảnh!");
      return;
    }

    // Append dữ liệu vào formData
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", fileInput.files[0]);

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
        alert("✅ Dịch vụ đã được cập nhật thành công!");
        handleClose();
        window.location.reload();
      } else {
        alert("❌ Cập nhật dịch vụ thất bại!");
      }
    } catch (error) {
      console.error("🚨 Lỗi khi cập nhật dịch vụ:", error);

      let errorMessage = "❌ Đã xảy ra lỗi khi cập nhật dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          errorMessage = "❌ Yêu cầu không hợp lệ!";
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 403) {
          errorMessage = "❌ Bạn không có quyền chỉnh sửa dịch vụ này!";
        } else if (status === 404) {
          errorMessage = "❌ Dịch vụ không tồn tại!";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "⏳ Yêu cầu cập nhật bị quá thời gian!";
      }

      alert(errorMessage);
    }
  };

  const handleDelete = async (serviceId) => {
    if (!serviceId) {
      alert("❌ Không tìm thấy ID dịch vụ để xóa!");
      return;
    }

    if (!window.confirm("❗ Bạn có chắc chắn muốn xóa dịch vụ này không?")) {
      return;
    }

    setIsLoading(true); // Bắt đầu trạng thái loading

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
        setServiceRows(
          serviceRows.filter((service) => service.serviceId !== serviceId)
        );
      } else {
        alert("❌ Xóa dịch vụ thất bại!");
      }
    } catch (error) {
      console.error("🚨 Lỗi khi xóa dịch vụ:", error);

      let errorMessage = "❌ Đã xảy ra lỗi khi xóa dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;
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
        errorMessage = "⏳ Yêu cầu xóa bị quá thời gian!";
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      const response = await axios.get(
        `${API_URL}/service/v1/getAllServiceIsActive`,
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
  }, []);

  const handleCreate = async () => {
    // Kiểm tra dữ liệu đầu vào trước khi gửi API
    if (!serviceName.trim()) {
      alert("❌ Vui lòng nhập tên dịch vụ!");
      return;
    }
    if (!description.trim()) {
      alert("❌ Vui lòng nhập mô tả dịch vụ!");
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      alert("❌ Giá dịch vụ phải là số và lớn hơn 0!");
      return;
    }
    if (!file) {
      alert("❌ Vui lòng tải lên hình ảnh dịch vụ!");
      return;
    }

    setIsLoading(true); // Bắt đầu trạng thái loading

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
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setServiceRows([...serviceRows, response.data.data]);
        alert("✅ Tạo dịch vụ thành công!");
        window.location.reload();
      } else {
        throw new Error(`HTTP Status: ${response.status}`);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi tạo dịch vụ:", error);

      let errorMessage = "❌ Đã xảy ra lỗi khi tạo dịch vụ!";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          errorMessage =
            "❌ Yêu cầu không hợp lệ! Vui lòng kiểm tra dữ liệu nhập.";
        } else if (status === 401) {
          errorMessage = "❌ Bạn chưa đăng nhập hoặc token không hợp lệ!";
        } else if (status === 403) {
          errorMessage = "❌ Bạn không có quyền tạo dịch vụ!";
        } else if (status === 500) {
          errorMessage = "❌ Lỗi máy chủ! Vui lòng thử lại sau.";
        } else {
          errorMessage = data?.message || errorMessage;
        }
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <>
      <Sidebar1 />
      <Header1 />
      <div className={styles.createButtonContainer}>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create
        </Button>

        <Dialog open={openCreate} onClose={handleCloseCreate}>
          <DialogTitle className={styles.dialogTitle}>
            Tạo dịch vụ cho thú cưng
          </DialogTitle>
          <DialogContent>
            <div className={styles.formContainer}>
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                placeholder="Enter a service name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="price">Price</label>
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
                  Service Name
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  ImageServiceBase64
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Active
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Update
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Delete
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Detail
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
                    {row.active ? "True" : "False"}
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => handleOpen(row)}>Edit</button>
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => handleDelete(row.serviceId)}>
                      Delete
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        navigate(`/manageservice/${row.serviceId}`)
                      }
                    >
                      Detail
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
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                name="serviceName"
                defaultValue={currentService?.serviceName}
                title="Service Name"
              />
              <label htmlFor="serviceDescription">Description</label>
              <input
                type="text"
                name="serviceDescription"
                defaultValue={currentService?.description}
                title="Description"
              />
              <label htmlFor="servicePrice">Price</label>
              <input
                type="number"
                name="servicePrice"
                defaultValue={currentService?.price}
                title="Price"
              />
              <label htmlFor="imageService">Image Service</label>
              <input type="file" name="imageService" title="Image Service" />
              <button type="submit">Update</button>
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
