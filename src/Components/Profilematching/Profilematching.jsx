import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import styles from "./Profilematching.module.scss";

const Profilematching = () => {
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <h1>Kiti</h1>
          <img
            src="https://s3-alpha-sig.figma.com/img/9c55/7152/1d974adaa891f7ec8c78c2a235e84b54?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=izD94HzgiSqyx6IsZfP26ZJ0UxBG5n8U9kSsivtZREwB5uBLw3FpRydqkfw5mCNz0dZswLX-5kLrAGCJ8AXble2-UINsT-AS09AYfF3D1mGsv1qZTH09jci7eNkrd25jxG5e57bOV01yquCGJvfYOhNc5c0QVwOlNoxqcnRK4jOTlmCiM6MNdusbWro2LoXlZPR-AOTR4ugZ7mBElJiG0Qy0K7Odb7xV~M5qHS3jBZh~9B9XYd47yXnvMWJX3o2SVdY-PJo1suZJu~KFN~U~OxqsNP6am~tEncqzkRgJCRFwX4UThK-YeAj0XnnOpgexIa4VYmm6tiyUyJVsL~FG1w__"
            alt=""
          />
          <div className={styles.titleprofile}>
            <p>Giống mèo: Cỏ</p>
            <p>Độ tuổi: Trưởng thành</p>
            <p>Cân nặng: 1.5 kg</p>
            <p>Giới tính: Đực</p>
            <p>Triệt sản: Không</p>
            <p>Tiêm phòng: Có</p>
          </div>
          <button className={styles.feedtry}>Nhận nuôi thử</button>
          <button className={styles.feedall}>Nhận nuôi </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profilematching;
