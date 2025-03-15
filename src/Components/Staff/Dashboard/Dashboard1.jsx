import Header from "../HeaderAdmin/Header1";
import Sidebar1 from "../Sidebar/Sidebar1";
import styles from "./Dashboard.module.scss";
export default function Dashboard1() {
  return (
    <>
      <Sidebar1 />
      <Header />
      <div className={styles.container}></div>
    </>
  );
}
