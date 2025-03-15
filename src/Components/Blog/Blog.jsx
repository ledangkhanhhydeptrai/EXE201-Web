import Header from "../../Header/Header";
import styles from "./Blog.module.scss";
import img1 from "../../assets/z6399142452081_3518c95dcbc2333b238febf56f6ab22e.jpg";
import img2 from "../../assets/z6400224322590_e07a618387f3dfbfabcab23a3e694eee.jpg";
import img3 from "../../../public/building.svg";
import img4 from "../../../public/rocket.svg";
import img5 from "../../../public/statistics.svg";
import img6 from "../../../public/sale.svg";
import img7 from "../../assets/z6401079257323_7bdeadf8f941d2a1f0ff5e0360292fe7.jpg";
import img8 from "../../assets/z6401537019128_47ff4ff752f6ad8b20aea7f66947bc0a.jpg";
import img9 from "../../../public/facebook.svg";
import img10 from "../../../public/twitter.svg";
import img11 from "../../../public/instagram.svg";
import img12 from "../../../public/linkedin.svg";
import img13 from "../../assets/z6401640114434_791404cfc2b178543f009bc24d473332.jpg";
import img14 from "../../assets/z6401645903390_f28d597929768c14e48a215ce37c2958.jpg";
import img15 from "../../assets/z6401651779642_3b9cbb8a896aa0c96cca7ab850b3d311.jpg";
import img16 from "../../../public/logo1.svg";
import img17 from "../../../public/logo2.svg";
import img18 from "../../../public/logo3.svg";
import img19 from "../../../public/logo4.svg";
import img20 from "../../../public/logo5.svg";
import img21 from "../../../public/divider.svg";
import img22 from "../../assets/z6402215175515_a9ef290200924ed0ab68cd5ac956e752.jpg";
import img23 from "../../../public/cat1.svg";
import img24 from "../../../public/arrowleft.svg";
import img25 from "../../../public/arrowright.svg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
const Blog = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.main}>
          <div className={styles.mainImage}>
            <img src={img1} alt="Family Pets" />
            <p className={styles.blogtitle}>
              Blog trên <strong>adopt pet</strong>
            </p>
            <p className={styles.customer}>
              Khách Hàng Nói Gì Về Chúng Tôi?
              <br /> Những Lời Chia Sẻ Đáng Yêu
            </p>
            <p className={styles.post}>
              Đăng bởi Tony | ngày 23 tháng 2 năm 2025
            </p>
            <p className={styles.ours}>
              Chúng tôi luôn tin rằng mỗi bé thú cưng khi đến với dịch vụ của
              mình không chỉ là khách hàng, mà còn là những người bạn nhỏ đáng
              yêu mà chúng tôi có cơ hội được chăm sóc. Và không gì hạnh phúc
              hơn khi nhận được những phản hồi tích cực từ các sen sau mỗi lần
              trải nghiệm dịch vụ tại đây!
            </p>
            <button
              className={styles.dochieu}
              onClick={() => navigate("/detailblog")}
            >
              Đọc Thêm {">"}
            </button>
          </div>
        </div>
        <div className={styles.mainTitle}>
          <p className={styles.postman}>Bài viết nổi bật</p>
          <div className={styles.mainTitles}>
            <div className={styles.imagetitle}>
              <img src={img2} alt="" />
            </div>
            <div className={styles.title}>
              <p>
                Đăng bởi{" "}
                <p
                  style={{
                    marginTop: "-24px",
                    marginLeft: "73px",
                    color: "#886750",
                  }}
                >
                  Himi
                </p>
                <p style={{ marginTop: "-41px", marginLeft: "115px" }}>
                  | ngày 23 tháng 2 năm 2025
                </p>
              </p>
              <p className={styles.mainDay}>
                Một Ngày Làm Việc Của Nhân Viên Grooming Diễn Ra Như Thế Nào?
              </p>
              <p className={styles.maingroom}>
                Chia sẻ công việc hàng ngày của nhân viên grooming để khách hàng
                hiểu hơn về quy trình chăm sóc thú cưng.
              </p>
              <button
                className={styles.readmore}
                onClick={() => navigate("/post")}
              >
                Đọc thêm {">"}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.mainWriting}>
          <p className={styles.postman}>Tất cả bài viết</p>
          <div className={styles.mainTitles}>
            <div className={styles.title}>
              <p>
                Đăng bởi{" "}
                <p
                  style={{
                    marginTop: "-24px",
                    marginLeft: "73px",
                    color: "#886750",
                  }}
                >
                  Bao Khanh
                </p>
                <p style={{ marginTop: "-41px", marginLeft: "160px" }}>
                  | ngày 9 tháng 1 năm 2025
                </p>
              </p>
              <a href="/detailBlog/1" className={styles.mainDay}>
                Nên Nuôi Mèo Đực Hay Mèo Cái: Tư Vấn Cho Người Mới Nuôi Mèo
              </a>
            </div>
            <div className={styles.titles}>
              <p className={styles.postmans}>
                Đăng bởi{" "}
                <p
                  style={{
                    marginTop: "-24px",
                    marginLeft: "73px",
                    color: "#886750",
                  }}
                >
                  Phuc Hung
                </p>
                <p style={{ marginTop: "-41px", marginLeft: "160px" }}>
                  | ngày 4 tháng 2 năm 2025
                </p>
              </p>
              <a href="/detailBlog/2" className={styles.mainDay}>
                Dấu Hiệu Bệnh Tiểu Đường Ở Chó
              </a>
            </div>
            <div className={styles.titles1}>
              <p className={styles.postmans}>
                Đăng bởi{" "}
                <p
                  style={{
                    marginTop: "-24px",
                    marginLeft: "73px",
                    color: "#886750",
                  }}
                >
                  Bao Khanh
                </p>
                <p style={{ marginTop: "-41px", marginLeft: "160px" }}>
                  | ngày 9 tháng 1 năm 2025
                </p>
              </p>
              <a href="/detailBlog/3" className={styles.mainDay}>
                Những Cách Khắc Phục Chó Lười Ăn
              </a>
            </div>
            <div className={styles.titles1}>
              <p className={styles.postmans}>
                Đăng bởi{" "}
                <p
                  style={{
                    marginTop: "-24px",
                    marginLeft: "73px",
                    color: "#886750",
                  }}
                >
                  Khanh Hung
                </p>
                <p style={{ marginTop: "-41px", marginLeft: "170px" }}>
                  | ngày 9 tháng 1 năm 2025
                </p>
              </p>
              <a href="/detailBlog/4" className={styles.mainDay}>
                So sánh mèo Anh lông ngắn và mèo Anh lông dài: Bạn nên chọn nuôi
                giống nào?
              </a>
            </div>
          </div>
        </div>
        <Link to="/detailblog" className={styles.viewall}>
          View all
        </Link>
        <div className={styles.divider} />
        <div className={styles.aboutus}>
          <p className={styles.aboutusus}>Về chúng tôi</p>
          <p className={styles.community}>
            Chúng tôi là một cộng đồng những người viết nội dung chia sẻ những
            kiến thức
          </p>
          <p className={styles.french}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className={styles.abouts}>
            <p className={styles.aboutusus1}>Nhiệm vụ của chúng tôi</p>
            <p className={styles.community1}>
              Tạo nội dung có giá trị cho những người nuôi pet trên toàn thế
              giới
            </p>
            <p className={styles.french1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className={styles.choose}>
          <h1>Chọn Một Danh Mục</h1>
          <div className={styles.cardContainer}>
            <div className={styles.card} style={{ marginLeft: "30px" }}>
              <img src={img3} alt="" />
              <p>Chăm Sóc Thú Cưng 🐶🐱</p>
              <p style={{ marginLeft: "-10px", float: "left", width: "100%" }}>
                📌 Hướng dẫn vệ sinh, chế độ dinh dưỡng, mẹo chăm sóc sức khỏe
                cho chó mèo.
              </p>
            </div>
            <div className={styles.card} style={{ background: "#FFE7BA" }}>
              <img src={img4} alt="" style={{ background: "#FFE7BA" }} />
              <p>Trải Nghiệm Khách Hàng 💬</p>
              <p style={{ marginLeft: "-10px", float: "left", width: "100%" }}>
                📌 Những câu chuyện đáng yêu, cảm nhận thực tế của khách hàng sử
                dụng dịch vụ.
              </p>
            </div>
            <div className={styles.card}>
              <img src={img5} alt="" />
              <p style={{ marginTop: "80px", marginLeft: "-65px" }}>
                Góc Thú Vị 🎉
              </p>
              <p style={{ marginLeft: "1px", float: "left" }}>
                Những điều thú vị về thế giới thú cưng, các giống chó mèo đặc
                biệt, xu hướng mới.
              </p>
            </div>
            <div className={styles.card}>
              <img src={img6} alt="" />
              <p>Tin Tức & Khuyến Mãi 📰🎁</p>
              <p style={{ marginLeft: "-10px", float: "left", width: "100%" }}>
                Cập nhật các chương trình ưu đãi, sự kiện và thông tin mới nhất
                về dịch vụ.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.useful}>
          <img src={img7} alt="" />
          <div className={styles.usefull}>
            <p className={styles.longla}>Chăm sóc những bạn lông lá</p>
            <p className={styles.loiich}>
              Những Lợi Ích Khi Đưa Thú Cưng Đi Grooming Định Kỳ
            </p>
            <p className={styles.grooming}>
              Grooming không chỉ giúp thú cưng trông đẹp hơn mà còn mang lại
              nhiều lợi ích về sức khỏe.
            </p>
            <button onClick={() => navigate("/detailblog")}>
              Khám phá ngay {">"}
            </button>
          </div>
        </div>
        <div className={styles.danhsach}>
          <p>Danh sách tác giả</p>
          <div className={styles.cardContainer}>
            <div
              className={styles.card}
              style={{ background: "#F4F4F4", width: "20%" }}
            >
              <img src={img8} alt="" style={{ paddingTop: "20px" }} />
              <p className={styles.names}>Tony</p>
              <p className={styles.namecompany}>Content Writer @Company</p>
              <div className={styles.imageicon} style={{ marginLeft: "88px" }}>
                <img src={img9} alt="" />
                <img src={img10} alt="" />
                <img src={img11} alt="" />
                <img src={img12} alt="" />
              </div>
            </div>
            <div
              className={styles.card}
              style={{ background: "#FBF6EA", width: "20%" }}
            >
              <img src={img13} alt="" style={{ paddingTop: "20px" }} />
              <p className={styles.names}>Phung Hung</p>
              <p className={styles.namecompany}>Content Writer @Company</p>
              <div className={styles.imageicon} style={{ marginLeft: "88px" }}>
                <img src={img9} alt="" />
                <img src={img10} alt="" />
                <img src={img11} alt="" />
                <img src={img12} alt="" />
              </div>
            </div>
            <div
              className={styles.card}
              style={{ background: "#F4F4F4", width: "20%" }}
            >
              <img src={img14} alt="" style={{ paddingTop: "20px" }} />
              <p className={styles.names}>Bao Wilson</p>
              <p className={styles.namecompany}>Content Writer @Company</p>
              <div className={styles.imageicon} style={{ marginLeft: "88px" }}>
                <img src={img9} alt="" />
                <img src={img10} alt="" />
                <img src={img11} alt="" />
                <img src={img12} alt="" />
              </div>
            </div>
            <div
              className={styles.card}
              style={{ background: "#F4F4F4", width: "20%" }}
            >
              <img src={img15} alt="" style={{ paddingTop: "20px" }} />
              <p className={styles.names}>Khanh Hung</p>
              <p className={styles.namecompany}>Content Writer @Company</p>
              <div className={styles.imageicon} style={{ marginLeft: "88px" }}>
                <img src={img9} alt="" />
                <img src={img10} alt="" />
                <img src={img11} alt="" />
                <img src={img12} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.feature}>
          <p className={styles.features}>
            We are
            <br /> <span>Featured in</span>
          </p>
          <div className={styles.iconcontainer}>
            <img src={img16} alt="" />
            <img
              src={img17}
              alt=""
              style={{ marginLeft: "80px", marginTop: "-10px" }}
            />
            <img
              src={img18}
              alt=""
              style={{ marginLeft: "80px", marginTop: "-10px" }}
            />
            <img
              src={img19}
              alt=""
              style={{ marginLeft: "80px", marginTop: "-10px" }}
            />
            <img
              src={img20}
              alt=""
              style={{ marginLeft: "80px", marginTop: "-10px" }}
            />
          </div>
          <div className={styles.testimonials}>
            <p className={styles.testimonials1}>TESTIMONIALs</p>
            <p className={styles.aboutus1}>
              Mọi Người Nói Gì Về Chúng Tôi? 🐾💬
            </p>
            <p className={styles.satisfy}>
              Sự hài lòng của khách hàng luôn là động lực lớn nhất để chúng tôi
              không ngừng hoàn thiện dịch vụ. Dưới đây là một số lời chia sẻ
              chân thật từ những sen đã tin tưởng và đồng hành cùng chúng tôi
              trong hành trình chăm sóc các bé cưng!
            </p>
            <img src={img21} alt="" className={styles.divider1} />
            <div className={styles.bought}>
              <p>
                Mun là một bé mèo hơi khó tính, nhưng khi đến đây, bé lại khá
                thoải mái và không còn căng thẳng như trước. Dịch vụ chuyên
                nghiệp, không gian sạch sẽ, giá cả hợp lý – chắc chắn mình sẽ
                còn quay lại
              </p>
              <img src={img22} alt="" className={styles.small} />
              <p className={styles.names1}>Anh Đức</p>
              <p className={styles.father}>Ba của bé mèo Mun</p>
              <img src={img23} alt="" className={styles.imgsmall} />
              <img src={img24} alt="" className={styles.imgleft} />
              <img src={img25} alt="" className={styles.imgright} />
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
          <button
            className={styles.joinnow}
            onClick={() => navigate("/detailblog")}
          >
            Tham gia ngay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
