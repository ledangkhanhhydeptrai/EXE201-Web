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
      `https://bookingpetservice.onrender.com/api/OptionalService/v1/getAllOptionalServiceIsActive`
    );
    if (response.status >= 200 && response.status < 300) {
      setData(response.data.data);
    } else {
      throw new Error(`HTTP Status:${response.status}`);
    }
  };
  useEffect(() => {
    fetchData();
  });
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("description", description);
    formData.append("price", price);
    if (file) {
      formData.append("file", file);
    } else {
      alert("Please upload an image");
      return;
    }
    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        `https://bookingpetservice.onrender.com/api/OptionalService/v1/createService`,
        formData, // 🟢 Gửi `formData` trực tiếp
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 201) {
        setData([...data, response.data.data]);
        alert("Create successfully");
        setOpenCreate(false);
        window.location.reload();
      } else {
        throw new Error(`HTTP Status:${response.status}`);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("serviceName", event.target.serviceName.value);
    formData.append("description", event.target.serviceDescription.value);
    formData.append("price", event.target.servicePrice.value);

    const fileInput = event.target.imageService;
    if (fileInput.files.length > 0) {
      console.log("✅ File uploaded:", fileInput.files[0].name);
      formData.append("file", fileInput.files[0]);
    } else {
      console.warn("❌ Không có file nào được chọn!");
    }

    // Kiểm tra dữ liệu trong FormData
    console.log("📤 Dữ liệu gửi lên:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios.put(
        `https://bookingpetservice.onrender.com/api/OptionalService/v1/update/${currentService.serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "*/*"
          }
        }
      );

      console.log("Response data:", response.data);

      if (response.status >= 200 && response.status < 300) {
        alert("Service updated successfully");
        window.location.reload();
        handleClose();
      } else {
        alert("Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Error updating service. Please try again.");
    } finally {
      setIsLoading(false);
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
                    {row.active ? "True" : "False"}
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => handleOpen(row)}>Edit</button>
                  </TableCell>
                  <TableCell align="center">
                    <button>Delete</button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        navigate(`/serviceoptional/${row.serviceId}`)
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
