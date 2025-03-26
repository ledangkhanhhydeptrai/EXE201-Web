import Header from "../HeaderAdmin/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./ServiceOptional.module.scss";

const ServiceOptional = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid">
        <div className={styles.app}>
          
        </div>
      </div>
    </>
  );
};

export default ServiceOptional;
