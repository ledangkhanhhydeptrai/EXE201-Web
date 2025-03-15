import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Dashboard.module.scss";
export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.container}></div>
    </>
  );
}
