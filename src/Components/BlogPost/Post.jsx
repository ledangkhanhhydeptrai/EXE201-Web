import styles from "./Post.module.scss";
import Header from "../../Header/Header";
import img1 from "../../assets/z6403205951464_9233db62b9639ba0c2fbecca7864e796.jpg";
import img2 from "../../../public/rocket2.svg";
import img3 from "../../assets/z6403276817348_4d1d1573e3e634c9a807053ecbe0227f.jpg";
import img4 from "../../assets/z6403363545643_804bfc11df7934249a415b4d26389449.jpg";
import img5 from "../../assets/z6403420010949_dd98d13387b7daf12393117c8e9e204e.jpg";
import img6 from "../../assets/z6403421763819_f68970ce0cdfc0eae83447bd7e90110f.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
const Post = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <div className={styles.imagesmall}>
            <img src={img1} alt="" />
            <p className={styles.names}>Andrew Thanh</p>
            <p className={styles.namespost}>
              Đăng vào ngày 28 tháng 2 năm 2025
            </p>
            <p className={styles.goods}>
              Một Ngày Làm Việc Của Nhân Viên Grooming Diễn Ra Như Thế Nào? 🐾✂️
            </p>
          </div>
          <div className={styles.icongoods}>
            <img src={img2} alt="" />
            <p>góc thú vị</p>
          </div>
          <div className={styles.mainImage}>
            <img src={img3} alt="" />
            <p className={styles.ready}>
              🌞 8:00 AM – Chuẩn Bị Bắt Đầu Ngày Mới
            </p>
            <p className={styles.oneday}>
              Mỗi ngày làm việc bắt đầu bằng việc vệ sinh không gian làm việc và
              kiểm tra danh sách thú cưng đã đặt lịch. Các dụng cụ như kéo cắt
              lông, bàn chải, máy sấy, dầu gội chuyên dụng đều được sắp xếp sẵn
              sàng.
            </p>
            <p className={styles.space}>
              📌Không gian sạch sẽ, thoải mái giúp các bé cưng cảm thấy an toàn
              và thư giãn hơn – Chia sẻ từ chị Trang, một groomer có kinh nghiệm
              3 năm.
            </p>
            <p className={styles.ready}>
              🐶 9:00 AM – Đón Những Vị Khách Đầu Tiên
            </p>
            <p className={styles.oneday}>
              Các bé thú cưng bắt đầu đến tiệm cùng chủ nhân của mình. Một số bé
              háo hức, nhưng cũng có những bé e dè, lo lắng. Vì vậy, nhân viên
              grooming sẽ nhẹ nhàng trò chuyện và vuốt ve để bé cảm thấy yên tâm
              hơn.
            </p>
            <p className={styles.space}>
              📌Mình luôn tạo cảm giác thân thiện với các bé bằng cách để chúng
              làm quen với không gian trước khi bắt đầu – Anh Hoàng, groomer tại
              cửa hàng.
            </p>
            <p className={styles.ready}>🛁 10:00 AM – Tắm Rửa Sạch Sẽ</p>
            <p className={styles.oneday}>
              Giai đoạn tắm gội bắt đầu! Mỗi bé sẽ được dùng dầu gội phù hợp với
              loại lông và tình trạng da. Quá trình này bao gồm:
            </p>
            <ul>
              <li>✔️ Chải sơ lông để gỡ rối</li>
              <li>✔️ Massage nhẹ nhàng để kích thích tuần hoàn máu</li>
              <li>✔️ Xả sạch và sấy khô bằng máy sấy công suất phù hợp</li>
            </ul>
            <p className={styles.space}>
              📌Một số bé sợ nước, nên mình luôn nhẹ nhàng và kiên nhẫn để giúp
              bé cảm thấy an toàn– Groomer Minh Anh.
            </p>
            <p className={styles.ready}>✂️ 11:30 AM – Cắt Tỉa Lông, Làm Đẹp</p>
            <p className={styles.oneday}>
              Sau khi tắm xong, các bé sẽ được tạo kiểu theo yêu cầu. Mỗi kiểu
              cắt sẽ được điều chỉnh để phù hợp với giống loài và sở thích của
              chủ nhân.
            </p>
            <p className={styles.oneday}>
              📌 Những công việc quan trọng trong bước này:
            </p>
            <ul>
              <li>✔️ Cắt móng – tránh để móng quá dài gây khó chịu</li>
              <li>
                ✔️ Vệ sinh tai – làm sạch và kiểm tra tai để phát hiện viêm
                nhiễm
              </li>
              <li>
                ✔️ Cắt lông – tạo kiểu theo yêu cầu hoặc phong cách đặc trưng
                của từng giống
              </li>
            </ul>
            <p className={styles.space}>
              📢Mình thích nhất lúc hoàn thành kiểu cắt, nhìn bé cưng biến hình
              từ một cục bông rối thành một em thú siêu dễ thương – Groomer Bảo
              Trân chia sẻ.
            </p>
          </div>
          <div className={styles.next}>
            <p className={styles.titlenext}>Đọc tiếp theo</p>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <img src={img4} alt="" />
                <p className={styles.findday}>
                  By <span style={{ color: "#592EA9" }}>John Doe</span> l Aug
                  23, 2021
                </p>
                <p className={styles.findday1}>
                  Top 5 Giống Chó Phù Hợp Cho Người Ở Căn Hộ Chung Cư
                </p>
              </div>
              <div className={styles.card}>
                <img src={img5} alt="" />
                <p className={styles.findday}>
                  By <span style={{ color: "#592EA9" }}>John Doe</span> l Aug
                  23, 2021
                </p>
                <p className={styles.findday1}>
                  Làm Sao Để Thú Cưng Không Bị Căng Thẳng Khi Đi Grooming?
                </p>
              </div>
              <div className={styles.card}>
                <img src={img6} alt="" />
                <p className={styles.findday}>
                  By <span style={{ color: "#592EA9" }}>John Doe</span> l Aug
                  23, 2021
                </p>
                <p className={styles.findday1}>Chuyện Của Bố Cún Đậu</p>
              </div>
            </div>
          </div>
          <div className={styles.join}>
            <p className={styles.joinus}>
              Hãy tham gia cùng chúng tôi để trở thành một phần trong câu chuyện
              của chúng tôi
            </p>
            <p className={styles.believeus}>
              Chúng tôi tin rằng mỗi bé thú cưng đều có một câu chuyện đáng yêu,
              và mỗi khách hàng đến với chúng tôi đều góp phần tạo nên một hành
              trình đầy ý nghĩa. Hãy cùng tham gia cộng đồng của chúng tôi – nơi
              các sen có thể chia sẻ kinh nghiệm, học hỏi mẹo chăm sóc thú cưng
              và kết nối với những người yêu động vật khác!
            </p>
            <button
              className={styles.joinnow}
              onClick={() => navigate("/detailblog")}
            >
              Tham gia ngay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
