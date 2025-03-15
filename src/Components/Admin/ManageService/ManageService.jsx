// import React from "react";
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
  Modal
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ManageService() {
  const [serviceRows, setServiceRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
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
  formData.append('serviceName', event.target.serviceName.value);
  formData.append('serviceDescription', event.target.serviceDescription.value);
  formData.append('servicePrice', event.target.servicePrice.value);

  // Append file if it exists
  const fileInput = event.target.imageService;
  if (fileInput.files.length > 0) {
    formData.append('imageService', fileInput.files[0]);
  }
  else {
    alert("Please upload an image");
    return;
  }

  try {
    const response = await axios.put(`https://bookingpetservice.onrender.com/api/service/v1/update/${currentService.serviceId}`, formData, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'multipart/form-data'
      },
      timeout: 5000
    });

    if (response.status >= 200 && response.status < 300) {
      alert('Service updated successfully');
      handleClose();
      // Refresh the service list or update the state
    } else {
      alert('Failed to update service');
    }
  } catch (error) {
    console.error('Error updating service:', error);
  }
};

const handleDelete = async (serviceId) => {
  if (window.confirm('Are you sure you want to delete this service?')) {
    try {
      const response = await axios.delete(`https://bookingpetservice.onrender.com/api/service/v1/deleteService/${serviceId}`, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        timeout: 5000
      });

      if (response.status >= 200 && response.status < 300) {
        alert('Service deleted successfully');
        setServiceRows(serviceRows.filter(service => service.serviceId !== serviceId));
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('An error occurred while deleting the service');
    }
  }
};

  useEffect(() => {
    const fetchService = async () => {
      const response = await axios.get("https://bookingpetservice.onrender.com/api/service/v1/getAllServiceIsActive", {}, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      setServiceRows(response.data?.data);
    };
    fetchService();
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
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
                  Service Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                  Description
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                  Price
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                  Active
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRows.map((row) => (
                <TableRow
                  key={row.serviceId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#ffe6ea", cursor: "pointer" }
                  }}
            
                >
                  <TableCell component="th" scope="row">
                    {row.serviceName}
                  </TableCell>
                  <TableCell align="right">
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={row?.imageServiceBase64} alt="service" />
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.active ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => handleOpen(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.serviceId)}>Delete</button>
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
          open={open} onClose={handleClose}>
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
