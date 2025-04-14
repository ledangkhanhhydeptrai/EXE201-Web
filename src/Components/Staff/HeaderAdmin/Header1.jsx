import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

export default function Header1() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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
  const handleNavigate = () => {
    navigate("/profilestaff");
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.userDropdown}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
          alt="User Avatar"
          className={styles.userAvatar}
          onClick={toggleDropdown}
        />
        <p style={{ marginTop: "-30px", marginLeft: "40px" }}>
          Chào: {user?.userName}
        </p>
        <div
          className={`${styles.dropdownMenu} ${
            isDropdownVisible ? styles.active : ""
          }`}
        >
          <a onClick={handleNavigate}>Quản lí Hồ Sơ</a>
          <a onClick={handleLogout}>Đăng xuất</a>
        </div>
      </div>
    </div>
  );
}
