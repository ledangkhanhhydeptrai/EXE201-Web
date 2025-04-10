import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import img1 from "../../../assets/z6223063894468_38357e99297b491d9712cb1e17076215.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
export default function Sidebar1() {
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
            <Link to="/managebooking1" className={styles.navLink}>
              <FontAwesomeIcon icon={faCalendarCheck} className={styles.icon} />{" "}
              Manage Booking
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
