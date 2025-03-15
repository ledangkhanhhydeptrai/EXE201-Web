import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Header.module.scss";
import img1 from "../assets/z6223063894468_38357e99297b491d9712cb1e17076215.jpg";
import img20 from "../assets/z6286210782286_93d4277bea785592927bf0272974f580.jpg";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("jwt");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={img1} alt="Adopt Pet" onClick={() => navigate("/")} />
        <div className={styles.brand}>
          <h1>Adopt Pet</h1>
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li onClick={() => navigate("/")}>Trang chủ</li>
          <li onClick={() => navigate("/blog")}>Blog</li>
          <li onClick={() => navigate("/introduce")}>Giới thiệu</li>
          <li onClick={() => navigate("/service")}>Dịch vụ</li>
          <li onClick={() => navigate("/matching")}>Ghép đôi</li>
          <li onClick={() => navigate("/feed")}>Danh sách</li>
          <li onClick={() => navigate("/booking")}>Đặt lịch</li>
        </ul>
      </nav>
      <div className={styles.actions}>
        <div className={styles.languages}>
          <span className={styles.imagelanguage}>
            <img src={img20} alt="logo" />
          </span>
          <span className={styles.language}>Tiếng Việt</span>
        </div>

        {user ? (
          <div className={styles.userMenu}>
            <FaUserCircle
              size={30}
              className={styles.avatar}
              onClick={toggleDropdown}
            />
            <span>{user.username}</span>
            {isDropdownOpen && (
              <ul className={styles.dropdown}>
                <li onClick={() => navigate("/profile")}>Hồ sơ</li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <button className={styles.login} onClick={() => navigate("/login")}>
              Đăng nhập
            </button>
            <button
              className={styles.register}
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
