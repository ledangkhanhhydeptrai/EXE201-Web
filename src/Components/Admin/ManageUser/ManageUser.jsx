import {
  Button,
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
import styles from "./ManageUser.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUser() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://bookingpetservice.onrender.com/api/user/getAllAccount`
      );

      if (response.status >= 200 && response.status < 300) {
        const sortedData = response.data.data.sort(
          (a, b) => a.userId - b.userId
        );
        console.log("API Response:", response.data);
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleToggleStatus = async (userId, isActive) => {
    try {
      const url = isActive
        ? `https://bookingpetservice.onrender.com/api/user/v1/banAccountById/${userId}
`
        : `https://bookingpetservice.onrender.com/api/user/v1/unBanAccountById/${userId}
`;
      const response = await axios.put(url);
      if (response.status >= 200 && response.status < 300) {
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="user table">
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell className={styles.tableCell} align="center">
                  userId
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Username
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Email
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Phone
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Address
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Status
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Avatar
                </TableCell>
                <TableCell className={styles.tableCell} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    {row.userId}
                  </TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    <span
                      className={
                        row.active ? styles.activeStatus : styles.bannedStatus
                      }
                    >
                      {row.active ? "Đang hoạt động" : "Bị cấm"}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={row.avatarBase64}
                      alt="Avatar"
                      className={styles.avatar}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color={row.active ? "error" : "success"}
                      onClick={() => handleToggleStatus(row.userId, row.active)}
                    >
                      {row.active ? "Ban" : "Unban"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pagination}>
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)} // Tổng số trang
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      </div>
    </>
  );
}
