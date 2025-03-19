import Header from "../../Header/Header";
import styles from "./ManageBooking.module.scss";
/**
  Giống như manage pet user nhưng không có nút bấm chỉ xem danh sách booking và booking chi tiết
        thằng admin username phone với lại trạng thái hoạt động có nút bấm detail ban với unban
        Manage Staff Account có thêm nút create: để sau chưa làm
 */
const ManageBookingUser = () => {
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        
      </div>
    </div>
  );
};

export default ManageBookingUser;
