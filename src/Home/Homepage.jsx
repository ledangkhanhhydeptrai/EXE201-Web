import styles from "./Homepage.module.scss";
import img2 from "../assets/dog1.jpg";
import img3 from "../assets/cat1.jpg";
import img4 from "../assets/dog2.jpg";
import img5 from "../assets/cat2.jpg";
import img6 from "../assets/dog3.jpg";
import img7 from "../assets/8e1aa9a0522d0cebb4144a5ceda0344a.png";
import img8 from "../assets/z6223687344903_c71910ddd101e37266f270370b52edcf.jpg";
import img9 from "../assets/z6223711393810_f64abfc486f1fda0120864d4d531010f.jpg";
import img10 from "../assets/z6223763294902_ac2e4ac40c8bc97ac325e3685231ad94.jpg";
import img11 from "../assets/1.jpg";
import img12 from "../assets/2.jpg";
import img13 from "../assets/3.jpg";
import img14 from "../assets/z6225766121691_d5e2bac46561153e6a610a5c5892d167.jpg";
import img15 from "../assets/z6225778394749_a3f2625702f7e638b97568db9f43fd52.jpg";
import { FaHotel, FaPhone, FaShoppingBag } from "react-icons/fa";
import img16 from "../assets/z6225781106760_ef44a93971929810b8fa49a7de8d16fb.jpg";
import img17 from "../assets/z6225783218250_68855d882c0ada78c15ed3996abd2093.jpg";
import img18 from "../assets/z6225784962116_c2a6ef383a2e2990a1a6939c35c35a4b.jpg";
import img19 from "../assets/z6286130694900_63fa2fe2bff597ea10f51dcbd728ce9a.jpg";
import img21 from "../assets/z6286229819438_a507a9ede0612fcff7323291952c6e4b.jpg";
import img22 from "../assets/z6286238817714_22b773654830b930a1172bcee85aa526.jpg";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
export default function Homepage() {
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);

  const handleClearAll = () => {
    navigate(location.pathname, {replace: true})
  }
  // Extract parameters
  const params = {
    code: queryParams.get("code"),
    id: queryParams.get("id"),
    cancel: queryParams.get("cancel"),
    status: queryParams.get("status"),
    orderCode: queryParams.get("orderCode")
  };

  let isPaymentProccessed = false;

  useEffect(() => {
    if (isPaymentProccessed === true) return;
    isPaymentProccessed = true;
    const handlePayment = async () => {

      
      console.log(params?.status);
      if (params?.status !== null && params?.status !== undefined) {
        if (params.status == "PAID") {
                
      console.log(params?.status );
          // alert("Thanh toán thành công")
           await axios.get(
            `https://bookingpetservice.onrender.com/api/payment/order?orderCode=${params.orderCode}`
          );
          message.success("Thanh toán thành công");
          handleClearAll()
        } else {
          await axios.get(
            `https://bookingpetservice.onrender.com/api/payment/cancel?orderCode=${params.orderCode}`
          );
          message.error("Thanh toán không thành công");

          handleClearAll()
        }
      }
    };
    handlePayment();
  }, []);
  return (
    <div>
      <div className={styles.app}>
        <Header />
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h2>Kết Nối Yêu Thương</h2>
            <h3>Thêm Ngàn Điều Vui</h3>
            <p>
              Có một con thú cưng đồng nghĩa với việc bạn có thêm niềm vui, có
              thêm một người bạn mới, một người vui vẻ luôn ở bên bạn vui chơi.
              Chúng tôi có thể đáp ứng nhu cầu của bạn!
            </p>
            <div className={styles.divider} />
          </div>
          <div className={styles.heroImages}>
            <div className={styles.imageGallery}>
              <img src={img2} alt="Dog 1" />
              <img src={img3} alt="Cat 1" />
              <img src={img4} alt="Dog 2" />
              <img src={img5} alt="Cat 2" />
            </div>
          </div>
        </section>
        <div className={styles.mainImage}>
          <img src={img6} alt="" className={styles.image1} />
          <img src={img7} alt="" className={styles.image2} />
          <img src={img8} alt="" className={styles.image3} />
          <img src={img9} alt="" className={styles.image4} />
          <img src={img10} alt="" className={styles.image5} />
          <img src={img19} alt="" className={styles.image6} />
          <img src={img21} alt="" className={styles.image7} />
          <img src={img22} alt="" className={styles.image8} />
        </div>
        <div className={styles.headborder} />
        <div className={styles.petservices}>
          <div className={styles.topsection}>
            <img
              src={img11}
              alt="Dog being hugged"
              className={styles.imageleft}
            />
            <img
              src={img12}
              alt="Happy family with dog"
              className={styles.imageright}
            />
          </div>
          <div className={styles.middlesection}>
            <div className={styles.servicecard}>
              <i>
                <FaHotel />
                <p>Khách sạn thú cưng</p>
              </i>
            </div>
            <div className={styles.servicecard}>
              <i>
                <FaShoppingBag />
                <p>Pet Shop</p>
              </i>
            </div>
            <div className={styles.servicecard}>
              <i>
                <FaPhone />
                <p>Liên hệ</p>
              </i>
            </div>
          </div>
          <div className={styles.bottomsection}>
            <div className={styles.images}>
              <img src={img13} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.homepage}>
          <h1 className={styles.homepagetitle}>Dịch vụ bổ sung</h1>
          <section className={styles.services}>
            <div className={styles.serviceCard}>
              <img src={img14} alt="Walk Icon" />
              <h3>Dắt chó đi dạo hằng ngày</h3>
              <p>Giúp pet được thoải mái hoạt động</p>
            </div>
            <div className={styles.serviceCard}>
              <img src={img15} alt="Night Care Icon" />
              <h3>Chăm sóc qua đêm</h3>
              <p>Pet được chăm sóc bởi các bảo mẫu giàu kinh nghiệm</p>
            </div>

            <div className={styles.serviceCard}>
              <img src={img16} alt="Daily Care Icon" />
              <h3>Chăm sóc ngày lẻ</h3>
              <p>Ăn uống ngủ nghỉ như ở nhà</p>
            </div>
          </section>
          <section className={styles.petImages}>
            <img src={img17} alt="Dog" className={styles.imageLeft} />
            <img src={img18} alt="Cat" className={styles.imageRight} />
          </section>
        </div>
        {/* <ChatBot /> */}
        <div style={{ marginLeft: "12px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
