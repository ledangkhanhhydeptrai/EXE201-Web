import styles from "./ManagePet.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../HeaderAdmin/Header";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export default function ManagePet() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9)
  ];

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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f50057" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Dessert (100g serving)
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="right"
                >
                  Calories
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="right"
                >
                  Fat&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="right"
                >
                  Carbs&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", fontWeight: "bold" }}
                  align="right"
                >
                  Protein&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#ffe6ea", cursor: "pointer" }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
