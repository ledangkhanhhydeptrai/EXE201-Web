import { Button } from "@mui/material";
import styles from "./FormTest.module.scss";
export default function FormTest() {
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <h2>Nhận nuôi thử</h2>
        <div className={styles.container}>
          <p className={styles.subtitle}>
            Thời gian nuôi thử được quy định 1 tháng
          </p>
          <div className={styles.info}>
            <p>
              <strong>Tên của bạn:</strong> Nguyễn Văn A
            </p>
            <p>
              <strong>Số điện thoại:</strong> 0123456789
            </p>
            <p>
              <strong>Dịch vụ:</strong> Nhận nuôi thử
            </p>
            <p>
              <strong>Email:</strong> abcd1234@gmail.com
            </p>
            <p>
              <strong>Thu nhập hàng tháng:</strong> 9 triệu/tháng
            </p>
            <p>
              <strong>Kinh nghiệm nuôi thú cưng:</strong> 3 năm
            </p>
            <p>
              <strong>Lý do muốn nhận nuôi:</strong> Giữ nhà, làm bạn với trẻ
              nhỏ.
            </p>
            <p>
              <strong>Ngày hẹn:</strong> 20/11/2024
            </p>
            <p>
              <strong>Thời gian:</strong>{" "}
              <span className={styles.time}>20h00</span>
            </p>
          </div>
          <div className={styles.petInfo}>
            <h3>Sun</h3>
            <img
              src="https://s3-alpha-sig.figma.com/img/8a37/52ef/39b4c9698ebdd73abe1a30c7aa5f90fa?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fiun2ocaSL7nPlQ~AxT4vSabgIVqZCxLDRNGf0I2lr6NI5ggYXJ11Kn8mcasUHUaBc2O8p-Laf8bbGZ7dezv~hszV8X6m4-xqcgJA~RSC0~jNjyvfw83JEn03JDFb54~dC5CiPldpOktaLG5Aikn4kWMhz~RC3EjJG7e86wQUuTdpm6uvJp7qwE7m21NMf1M8r4eVyJ1xYvQL7~vmSP5xnBOjHVP74i8yHKQqrkAh5XPjp57oyJRo~rA2Q3tHZZUFTN9LMw3WVYv65XT4kmb0Z~3Ve0Sz0W0MwmzJRGzDCkM~tTc5FfbC5Ow44K0n8Om18x1gOb7z8Yk2a2cGVFpjg__"
              alt="Sun"
              className={styles.petImage}
            />
            <p>
              <strong>Giống chó:</strong> Cỏ
            </p>
            <p>
              <strong>Độ tuổi:</strong> Trưởng thành
            </p>
            <p>
              <strong>Cân nặng:</strong> 4.5 kg
            </p>
            <p>
              <strong>Giới tính:</strong> Đực
            </p>
            <p>
              <strong>Triệt sản:</strong> Không
            </p>
            <p>
              <strong>Tiêm phòng:</strong> Có
            </p>
          </div>
          <p className={styles.note}>
            <strong>*Chú ý:</strong> Trong suốt thời gian thử, bạn sẽ chịu trách
            nhiệm chăm sóc thú cưng. Nếu bạn không thể tiếp tục nuôi, cần trả
            lại thú cưng cho trung tâm.
          </p>
          <div className={styles.actions}>
            <Button variant="outlined" color="secondary">
              Quay lại
            </Button>
            <Button variant="contained" color="primary">
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
