import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import img1 from "../../../assets/z6223063894468_38357e99297b491d9712cb1e17076215.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faCalendarCheck,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
// làm trang giao dịch
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <span>
          <img src={img1} alt="Logo" className={styles.imageLogo} />
        </span>
        <span>
          <h2 className={styles.logo}>Adopt A Pet</h2>
        </span>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/dashboard" className={styles.navLink}>
              <FontAwesomeIcon icon={faChartBar} className={styles.icon} /> Bảng
              Doanh Thu
            </Link>
          </li>
          <li>
            <Link to="/user" className={styles.navLink}>
              <FontAwesomeIcon icon={faUsers} className={styles.icon} /> Quản lí
              người dùng
            </Link>
          </li>
          <li>
            <Link to="/managebooking" className={styles.navLink}>
              <FontAwesomeIcon icon={faCalendarCheck} className={styles.icon} />{" "}
              Quản lí đặt lịch
            </Link>
          </li>
          <li>
            <Link to="/manage-service" className={styles.navLink}>
              <FontAwesomeIcon icon={faCog} className={styles.icon} /> Quản lí
              dịch vụ chính
            </Link>
          </li>
          <li>
            <Link to="/serviceoptional" className={styles.navLink}>
              <FontAwesomeIcon icon={faCog} className={styles.icon} /> Quản lí
              dịch vụ phụ
            </Link>
          </li>
          <li />
        </ul>
      </div>
    </div>
  );
}
