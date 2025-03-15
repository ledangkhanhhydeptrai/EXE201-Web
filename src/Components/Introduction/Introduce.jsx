import styles from "./Introduce.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import img1 from "../../assets/z6286496460420_10ee279b91b2c682c3921f1513e0548f.jpg";
import img2 from "../../assets/z6286499654143_81a4266c39635e45e4f44daeca31bcbe.jpg";
import img3 from "../../assets/z6286506277733_d5cf5770d9cea456f9f57299fea25162.jpg";
import img4 from "../../assets/z6286510133179_89296d25e5477a66284cca1dbd65024e.jpg";
import img5 from "../../assets/z6286517729178_4ea8c89ad6cb596cedd22e1a4936e605.jpg";
const Introduce = () => {
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <Header />
        <div className={styles.homePage}>
          <section className={styles.headerSection}>
            <h1 className={styles.title}>
              Mang Đến Một Ngôi Nhà Yêu Thương Cho Thú Cưng
            </h1>
            <div className={styles.rating}>
              <img
                src="https://s3-alpha-sig.figma.com/img/0a04/a108/c1d5957ba6b6798a606ea0190f164e0d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dgrVaNpmzZAruPP2fbJqT-ykRgDzux459soxpMsj4jkhNKwU8KJ7reeb3c8NSo9c7nSh2itqhEwqNF8LmSqfX4p2SOohM4aE21zQlamxcWS5ktbIYDOmNLQGYDNuBrD4~XLI2A6eNI4gBKXuk~yTnmQqolWn18rdBdsalvkjBExDgVLBvIARZRAryPww9W4KJLpTGaylh7d3PjcxytZXJFacyNSv3dsQMhRBj-vfcnYFkXacfE4ga712TeQKHlr4ud-5ZkTeE50KyZAsbBM7-csWgfN59G-wKbvUipoAabt5Yc36UxCRP5509jspAYEkBrPmTT63FGyBc8-Pvlm99A__"
                alt=""
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/0a04/a108/c1d5957ba6b6798a606ea0190f164e0d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dgrVaNpmzZAruPP2fbJqT-ykRgDzux459soxpMsj4jkhNKwU8KJ7reeb3c8NSo9c7nSh2itqhEwqNF8LmSqfX4p2SOohM4aE21zQlamxcWS5ktbIYDOmNLQGYDNuBrD4~XLI2A6eNI4gBKXuk~yTnmQqolWn18rdBdsalvkjBExDgVLBvIARZRAryPww9W4KJLpTGaylh7d3PjcxytZXJFacyNSv3dsQMhRBj-vfcnYFkXacfE4ga712TeQKHlr4ud-5ZkTeE50KyZAsbBM7-csWgfN59G-wKbvUipoAabt5Yc36UxCRP5509jspAYEkBrPmTT63FGyBc8-Pvlm99A__"
                alt=""
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/0a04/a108/c1d5957ba6b6798a606ea0190f164e0d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dgrVaNpmzZAruPP2fbJqT-ykRgDzux459soxpMsj4jkhNKwU8KJ7reeb3c8NSo9c7nSh2itqhEwqNF8LmSqfX4p2SOohM4aE21zQlamxcWS5ktbIYDOmNLQGYDNuBrD4~XLI2A6eNI4gBKXuk~yTnmQqolWn18rdBdsalvkjBExDgVLBvIARZRAryPww9W4KJLpTGaylh7d3PjcxytZXJFacyNSv3dsQMhRBj-vfcnYFkXacfE4ga712TeQKHlr4ud-5ZkTeE50KyZAsbBM7-csWgfN59G-wKbvUipoAabt5Yc36UxCRP5509jspAYEkBrPmTT63FGyBc8-Pvlm99A__"
                alt=""
              />
              <img
                src="https://s3-alpha-sig.figma.com/img/0a04/a108/c1d5957ba6b6798a606ea0190f164e0d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dgrVaNpmzZAruPP2fbJqT-ykRgDzux459soxpMsj4jkhNKwU8KJ7reeb3c8NSo9c7nSh2itqhEwqNF8LmSqfX4p2SOohM4aE21zQlamxcWS5ktbIYDOmNLQGYDNuBrD4~XLI2A6eNI4gBKXuk~yTnmQqolWn18rdBdsalvkjBExDgVLBvIARZRAryPww9W4KJLpTGaylh7d3PjcxytZXJFacyNSv3dsQMhRBj-vfcnYFkXacfE4ga712TeQKHlr4ud-5ZkTeE50KyZAsbBM7-csWgfN59G-wKbvUipoAabt5Yc36UxCRP5509jspAYEkBrPmTT63FGyBc8-Pvlm99A__"
                alt=""
              />
            </div>
            <p className={styles.description}>
              Chúng tôi là mái ấm cho những chú chó mèo đáng yêu, mang đến nơi
              trú ẩn an toàn và cuộc sống hạnh phúc. Từ những bé bị bỏ rơi,
              chúng tôi chăm sóc, nuôi dưỡng và tìm gia đình yêu thương để các
              bé có thể bắt đầu một hành trình mới. Ngoài ra, chúng tôi còn cung
              cấp thức ăn và đồ chơi chất lượng để thú cưng luôn khỏe mạnh và
              vui vẻ. Hãy cùng chung tay xây dựng một cộng đồng yêu thương động
              vật!
            </p>
            <div className={styles.borderBottom} />
          </section>
          <section className={styles.imageSection}>
            <div className={styles.imageGrid}>
              <img
                src={img3}
                alt="Cat on couch"
                className={styles.image}
              />
            </div>
            <div className={styles.extraContent}>
              <div className={styles.extraImages}>
                <img
                  src={img4}
                  alt="Dog in hands"
                  className={styles.extraImage1}
                />
                <img
                  src={img5}
                  alt="Family with dog"
                  className={styles.extraImage2}
                />
              </div>
              <div className={styles.imageBorder} />
            </div>
            <p className={styles.imageCaption}>
              Khi mọi người có những câu hỏi về thú cưng thì chúng tôi sẽ trả
              lời những câu hỏi mà mọi người đang thắc mắc trong thời gian sớm
              nhất. Và mọi người đều tham gia tương tác với nhau về thú cưng
              trên trang web của chúng tôi.
            </p>
          </section>
          <section className={styles.infoSection}>
            <div className={styles.card}>
              <img src={img1} alt="Cat vision" className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>Sứ mệnh</h2>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Kết nối yêu thương
                  </strong>
                  : Tạo cầu nối giữa người yêu thú cưng và các chú thú cưng đáng
                  yêu.
                </p>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Cứu giúp thú cưng
                  </strong>
                  : Giải cứu các thú bị bỏ rơi, đối xử tốt, và mang lại cuộc
                  sống mới.
                </p>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Nâng cao nhận thức
                  </strong>
                  : Tăng cường ý thức cộng đồng về trách nhiệm nuôi thú, ngăn
                  chặn chó mèo hoang.
                </p>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Xây dựng cộng đồng
                  </strong>
                  : Kết nối những người yêu động vật, chia sẻ kinh nghiệm và
                  kiến thức.
                </p>
              </div>
              <img src={img2} alt="Cat vision" className={styles.cardImage1} />
              <div className={styles.cardContent1}>
                <h2 className={styles.cardTitle}>Tầm nhìn</h2>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Cam kết phát triển bền vững
                  </strong>
                  : Xây dựng tổ chức cứu hộ, chăm sóc và tìm nhà cho thú cưng
                  một cách uy tín, đáng tin cậy tại Việt Nam.
                </p>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Mở rộng quy mô quốc gia
                  </strong>
                  : Từng bước phát triển hệ thống trung tâm chăm sóc thú cưng
                  trên khắp cả nước.
                </p>
                <p className={styles.cardText}>
                  <strong className={styles.strongname}>
                    Xây dựng xã hội văn minh
                  </strong>
                  : Chung tay xây dựng một xã hội nơi mọi sinh vật đều được tôn
                  trọng và bảo vệ.
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Introduce;
