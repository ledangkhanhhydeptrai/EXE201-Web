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
  DialogContent
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ManageService() {
  const [serviceRows, setServiceRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [serviceNAme, setServiceNAme] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [file, setFile] = useState(null);
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

    // Append form fields
    formData.append("serviceName", event.target.serviceName.value);
    formData.append(
      "serviceDescription",
      event.target.serviceDescription.value
    );
    formData.append("servicePrice", event.target.servicePrice.value);

    // Append file if it exists
    const fileInput = event.target.imageService;
    if (fileInput.files.length > 0) {
      formData.append("imageService", fileInput.files[0]);
    } else {
      alert("Please upload an image");
      return;
    }

    try {
      const response = await axios.put(
        `https://bookingpetservice.onrender.com/api/service/v1/update/${currentService.serviceId}`,
        formData,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "multipart/form-data"
          },
          timeout: 5000
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Service updated successfully");
        handleClose();
        window.location.reload();
      } else {
        alert("Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await axios.delete(
          `https://bookingpetservice.onrender.com/api/service/v1/deleteService/${serviceId}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
            timeout: 5000
          }
        );

        if (response.status >= 200 && response.status < 300) {
          alert("Service deleted successfully");
          setServiceRows(
            serviceRows.filter((service) => service.serviceId !== serviceId)
          );
        } else {
          alert("Failed to delete service");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("An error occurred while deleting the service");
      }
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      const response = await axios.get(
        "https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive",
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
    const formData = new FormData();
    formData.append("serviceName", serviceNAme);
    formData.append("description", description);
    formData.append("price", price);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await axios.post(
        `https://bookingpetservice.onrender.com/api/service/v1/createService`,
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
        alert("Create service successfully");
        window.location.reload();
      } else {
        throw new Error(`HTTP Status:${response.status}`);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };
  return (
    <>
      <Sidebar />
      <Header />
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
                value={serviceNAme}
                onChange={(e) => setServiceNAme(e.target.value)}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRows.map((row, index) => (
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
      </div>
    </>
  );
}
