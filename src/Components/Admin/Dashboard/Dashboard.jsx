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
import styles from "./Dashboard.module.scss";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // "active", "banned", ""
  // const filteredData = data.filter((user) => {
  //   const nameMatch = user.userName
  //     .toLowerCase()
  //     .includes(filterName.toLowerCase());
  //   const emailMatch = user.email
  //     .toLowerCase()
  //     .includes(filterEmail.toLowerCase());
  //   const statusMatch =
  //     filterStatus === ""
  //       ? true
  //       : filterStatus === "active"
  //       ? user.active
  //       : !user.active;

  //   return nameMatch && emailMatch && statusMatch;
  // });

  // const currentData = filteredData.slice(startIndex, endIndex);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getAllAccount`);

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
  });
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleToggleStatus = async (userId, isActive) => {
    try {
      const url = isActive
        ? `${API_URL}/user/v1/banAccountById/${userId}
`
        : `${API_URL}/user/v1/unBanAccountById/${userId}
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
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Lọc theo tên người dùng"
          value={filterName}
          onChange={(e) => {
            setCurrentPage(1);
            setFilterName(e.target.value);
          }}
          className={styles.filterInput}
        />
        <input
          type="text"
          placeholder="Lọc theo email"
          value={filterEmail}
          onChange={(e) => {
            setCurrentPage(1);
            setFilterEmail(e.target.value);
          }}
          className={styles.filterInput}
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setCurrentPage(1);
            setFilterStatus(e.target.value);
          }}
          className={styles.filterSelect}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="banned">Đã bị cấm</option>
        </select>
      </div>

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
