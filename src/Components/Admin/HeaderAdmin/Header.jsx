import { useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search" className={styles.searchInput} />
      <div className={styles.userDropdown}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={toggleDropdown}
        />
        <p style={{ marginTop: "-30px", marginLeft: "40px" }}>Hello User</p>
        <div
          className={`${styles.dropdownMenu} ${
            isDropdownVisible ? styles.active : ""
          }`}
        >
          <a href="/profile">Manage Profile</a>
          <a href="/login">Logout</a>
        </div>
      </div>
    </div>
  );
}
