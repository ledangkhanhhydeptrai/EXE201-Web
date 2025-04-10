import styles from "./Footer.module.scss";
import img1 from "../assets/z6223063894468_38357e99297b491d9712cb1e17076215.jpg";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <div className={styles.logo}>
          <img src={img1} alt="Logo" />
          <div className={styles.brandName}>Adopt A Pet!</div>
        </div>
        <div className={styles.contactInfo}>
          <p>Địa chỉ: Đường D1, Khu Công Nghệ Cao, Quận 9</p>
          <p>Điện thoại: 0903 05 35 05</p>
          <p>Email: adoptpet@gmail.com</p>
          <p>Thời gian làm việc: từ 8h00 - 19h00</p>
        </div>
        <div className={styles.socialIcons}>
          <a href="#">
            <i className={`fa fa-facebook ${styles.icon}`} />
          </a>
          <a href="#">
            <i className={`fa fa-twitter ${styles.icon}`} />
          </a>
          <a href="#">
            <i className={`fa fa-envelope ${styles.icon}`} />
          </a>
        </div>
      </div>
      <div className={styles.footerMiddle}>
        <ul>
          <li>Nhận nuôi</li>
          <li>Dắt chó đi dạo</li>
          <li>Chăm sóc qua đêm</li>
          <li>Chăm sóc ngày lễ</li>
        </ul>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.adoptChart}>
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
        <span>ADOPT</span>
      </div>
    </footer>
  );
}
