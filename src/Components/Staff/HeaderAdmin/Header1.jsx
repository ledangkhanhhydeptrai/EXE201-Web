import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export default function Header1() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedUsername = localStorage.getItem("username");
    console.log("Stored Token:", storedToken);
    console.log("Stored Username:", storedUsername);

    if (storedToken && storedUsername) {
      setUser({ token: storedToken, userName: storedUsername });
    }
  }, []);
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
        <p style={{ marginTop: "-30px", marginLeft: "40px" }}>
          Hello: {user?.userName}
        </p>
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
