import axios from "axios";
import styles from "./MangeService1.module.scss";
import { useEffect, useState } from "react";
import Sidebar1 from "../Sidebar/Sidebar1";
import Header1 from "../HeaderAdmin/Header1";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
const ManageService1 = () => {
  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setSerivePrice] = useState("");
  const [imageService, setImageService] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const handleOpenCreatePopUp = () => {
    setShowPopUp(!showPopUp);
  };
  const handleCloseCreatePopUp = () => {
    setShowPopUp(false);
  };
  const handleOpenUpdate = () => {
    setShowUpdate(!showUpdate);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive`
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("API Response:", response.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCreate = async (event) => {
    event.preventDefault();
    if (!serviceName || !serviceDescription || !servicePrice || !imageService) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (isNaN(servicePrice) || Number(servicePrice) <= 0) {
      alert("Giá dịch vụ phải là số hợp lệ và lớn hơn 0!");
      return;
    }

    if (!(imageService instanceof File)) {
      alert("Hình ảnh không hợp lệ! Vui lòng chọn lại.");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceDescription", serviceDescription);
    formData.append("servicePrice", servicePrice);
    formData.append("imageService", imageService);

    console.log("Dữ liệu FormData:", [...formData.entries()]);

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    console.log("Token:", token);

    try {
      const response = await axios.post(
        `https://bookingpetservice.onrender.com/api/service/v1/createService`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("Dịch vụ đã được tạo:", response.data);
      alert("Tạo dịch vụ thành công!");
      setServiceName("");
      setServiceDescription("");
      setSerivePrice("");
      setImageService(null);
      setShowPopUp(false);
    } catch (error) {
      console.error("Lỗi khi tạo dịch vụ:", error);
      console.log("Chi tiết lỗi:", error.response?.data || error.message);
      alert(
        `Lỗi: ${
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!"
        }`
      );
    }
  };
  const UpdateService = (service) => {
    setSelectedService(service);
    setServiceName(service.serviceName);
    setServiceDescription(service.serviceDescription);
    setSerivePrice(service.servicePrice);
    setImageService(null);
    handleOpenUpdate();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!selectedService) {
      alert("Không có dịch vụ nào được chọn!");
      return;
    }

    if (!serviceName || !serviceDescription || !servicePrice) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (isNaN(servicePrice) || Number(servicePrice) <= 0) {
      alert("Giá dịch vụ phải là số hợp lệ!");
      return;
    }

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceDescription", serviceDescription);
    formData.append("servicePrice", servicePrice);

    if (imageService) {
      formData.append("imageService", imageService);
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    try {
      const response = await axios.put(
        `https://bookingpetservice.onrender.com/api/service/v1/update/${selectedService.serviceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Cập nhật dịch vụ thành công!");
        fetchData();
        handleCloseUpdate();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error);
      alert(
        `Lỗi cập nhật: ${error.response?.data?.message || "Có lỗi xảy ra!"}`
      );
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(
        `https://bookingpetservice.onrender.com/api/service/v1/deleteService/${serviceId}`
      );
      setData(data.filter((service) => service.serviceId !== serviceId));
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <>
      <Sidebar1 />
      <Header1 />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell}>Service ID</TableCell>
                <TableCell className={styles.tableCell}>Service Name</TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Description
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Price
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Image
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Status
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Update
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.serviceId} className={styles.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    {row.serviceId}
                  </TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <img
                      src={row.imageServiceBase64}
                      alt=""
                      className={styles.avatar}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={
                        row.active ? styles.activeStatus : styles.bannedStatus
                      }
                    >
                      {row.active ? "Đang hoạt động" : "Bị cấm"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        UpdateService(row);
                        handleOpenUpdate();
                      }}
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleDelete(row.serviceId)}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            position: "fixed",
            bottom: "180px",
            width: "100%",
            textAlign: "center"
          }}
        >
          <Button
            sx={{ backgroundColor: "orange" }}
            onClick={handleOpenCreatePopUp}
            variant="contained"
            className="hover:bg-blue-700"
          >
            Create
          </Button>
        </div>

        <Dialog open={showPopUp} onClose={handleCloseCreatePopUp}>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogContent>
            <form onSubmit={handleCreate}>
              <TextField
                label="Service Name"
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ my: 1 }}
              />
              <TextField
                label="Description"
                type="text"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ my: 1 }}
              />
              <TextField
                label="servicePrice"
                type="number"
                value={servicePrice}
                onChange={(e) => setSerivePrice(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ my: 1 }}
              />
              <TextField
                type="file"
                accept="image/*"
                onChange={(e) => setImageService(e.target.files[0])}
                fullWidth
                variant="outlined"
                sx={{ my: 1 }}
              />
              <DialogActions>
                <Button onClick={handleCloseCreatePopUp} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        {showUpdate && (
          <Paper
            sx={{
              p: 4,
              mt: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              mx: "auto",
              boxShadow: 3
            }}
            elevation={3}
          >
            <form onSubmit={handleUpdate}>
              <TextField
                label="Service Name"
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="Enter a serviceName"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Service Description"
                type="text"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                placeholder="Enter a Service Description"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Service Price"
                type="number"
                value={servicePrice}
                onChange={(e) => setSerivePrice(e.target.value)}
                placeholder="Enter a Service Price"
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageService(e.target.files[0])}
                placeholder="Enter a place"
                fullWidth
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={(event) =>
                  handleUpdate(selectedService.serviceId, event)
                }
              >
                Update
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </>
  );
};
export default ManageService1;
