import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import img1 from "../../../assets/z6223063894468_38357e99297b491d9712cb1e17076215.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faUsers, faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <span>
          <img src={img1} alt="Logo" className={styles.imageLogo} />
        </span>
        <span>
          <h2 className={styles.logo}>Adopt Pet</h2>
        </span>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/dashboard" className={styles.navLink}>
              <FontAwesomeIcon icon={faChartBar} className={styles.icon} />{" "}
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user" className={styles.navLink}>
              <FontAwesomeIcon icon={faUsers} className={styles.icon} /> Manage
              User
            </Link>
          </li>
          <li>
            <Link to="/pet" className={styles.navLink}>
              <FontAwesomeIcon icon={faPaw} className={styles.icon} /> Manage
              Pets
            </Link>
          </li>
          <li>
            <Link to="/managebooking" className={styles.navLink}>
              <FontAwesomeIcon icon={faPaw} className={styles.icon} /> Manage
              Booking
            </Link>
          </li>
          <li />
        </ul>
      </div>
    </div>
  );
}
