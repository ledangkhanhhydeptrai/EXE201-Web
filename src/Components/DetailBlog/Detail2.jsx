import Header from "../../Header/Header";
import styles from "./Detail.module.scss";
import img1 from "../../assets/z6402981071997_c7ad735893c5cd7e76d253e0fb01d5fe.jpg";
import img2 from "../../assets/z6403015945439_0047129014166fd2bc23ed2a6d753e9f.jpg";
import img3 from "../../assets/z6403086217738_88d5f60636499abe1c5f5fc37e9f6846.jpg";
import img4 from "../../assets/z6403092055214_f60324e9ad3ffda9a6744818e053f0f7.jpg";
import img5 from "../../assets/z6403097667575_8eaf298c8d8e2d98d17dab08e443f061.jpg";
import img6 from "../../assets/z6403103601259_0b18d5d781683271c246cc6145171dc9.jpg";
import img7 from "../../../public/arrowleft1.svg";
import img8 from "../../../public/arrowright1.svg";
import img9 from "../../../public/building.svg";
import img10 from "../../../public/rocket.svg";
import img11 from "../../../public/statistics.svg";
import img12 from "../../../public/sale.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
// import * as cheerio from "cheerio";

export default function Detail() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch full page HTML
        const response = await axios.get(
          "https://nongtraithucung.com/blogs/kien-thuc-the-gioi-pet/dau-hieu-benh-tieu-duong-o-cho"
        );
        const htmlContent = response.data;

        // Load HTML into cheerio
        const $ = cheerio.load(htmlContent);

        const articleContent = $(".box-article-detail").html(); // Change selector if needed

        setContent(articleContent || "Không tìm thấy nội dung bài viết.");
      } catch (error) {
        console.error("Lỗi khi lấy nội dung:", error);
        setContent("Lỗi khi tải nội dung bài viết.");
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <p className={styles.goiy}>bài viết gợi ý cho bạn</p>
          <p className={styles.helper}>
            Cách Giúp Thú Cưng Làm Quen Với Ngôi Nhà Mới
          </p>
          <p className={styles.story}>
            Đăng bởi Tony l ngày 28 tháng 2 năm 2025
          </p>
          <p className={styles.environment}>
            Chuyển đến một môi trường mới có thể khiến thú cưng lo lắng. Hãy
            giúp bé thích nghi dễ dàng hơn!
          </p>
          <button className={styles.readmore}>Đọc thêm {">"}</button>
          <img src={img1} alt="" />
        </div>

        <h1
          style={{
            marginTop: "40px",
            paddingLeft: "20px",
          }}
        >
          Dấu Hiệu Bệnh Tiểu Đường Ở Chó
        </h1>

        <div
          style={{
            padding: "20px",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className={styles.choose}>
          <h1>Chọn Một Danh Mục</h1>
          <div className={styles.cardContainer}>
            <div className={styles.card} style={{ marginLeft: "30px" }}>
              <img src={img9} alt="" />
              <p>Chăm Sóc Thú Cưng 🐶🐱</p>
              <p style={{ marginLeft: "-10px", float: "left", width: "100%" }}>
                📌 Hướng dẫn vệ sinh, chế độ dinh dưỡng, mẹo chăm sóc sức khỏe
                cho chó mèo.
              </p>
            </div>
            <div className={styles.card} style={{ background: "#FFE7BA" }}>
              <img src={img10} alt="" style={{ background: "#FFE7BA" }} />
              <p>Trải Nghiệm Khách Hàng 💬</p>
              <p style={{ marginLeft: "-10px", float: "left", width: "100%" }}>
                📌 Những câu chuyện đáng yêu, cảm nhận thực tế của khách hàng sử
                dụng dịch vụ.
              </p>
            </div>
            <div className={styles.card}>
              <img src={img11} alt="" />
              <p style={{ marginTop: "80px", marginLeft: "-65px" }}>
                Góc Thú Vị 🎉
              </p>
              <p style={{ marginLeft: "1px", float: "left" }}>
                Những điều thú vị về thế giới thú cưng, các giống chó mèo đặc
                biệt, xu hướng mới.
              </p>
            </div>
            <div className={styles.card}>
              <img src={img12} alt="" />
              <p>Tin Tức & Khuyến Mãi 📰🎁</p>
              <p style={{ marginLeft: "-10px", float: "left", width: "100%" }}>
                Cập nhật các chương trình ưu đãi, sự kiện và thông tin mới nhất
                về dịch vụ.
              </p>
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
            các sen có thể chia sẻ kinh nghiệm, học hỏi mẹo chăm sóc thú cưng và
            kết nối với những người yêu động vật khác!
          </p>
          <button className={styles.joinnow} onClick={() => navigate("/blog")}>
            Tham gia ngay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
