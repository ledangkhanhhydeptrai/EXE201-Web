import styles from "./Register.module.scss";
import img1 from "../../assets/z6314227807368_af67c8d227cb6907dc0782d924a25272.jpg";
import img2 from "../../assets/z6313248080550_e24e0e2ac08e0ca8b0601d6979fe26c2.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
export default function Register() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Wrong email format").required("Required"),
    phone: Yup.string()
      .matches(/^\d{10,11}$/, "Phone Number is required")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    address: Yup.string().required("Required")
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      imageUserfile: null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("userName", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("address", values.address);
      if (values.imageUserfile) {
        formData.append("imageUserfile", values.imageUserfile);
      }
      try {
        const response = await axios.post(
          `https://bookingpetservice.onrender.com/api/user/v1/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            timeout: 10000
          }
        );
        console.log("Response data", response.data);
        if (response.status >= 200 && response.status < 300) {
          setOpen(true);
        }
      } catch (error) {
        console.error("Registration failed", error);
        alert("Registration failed. Please try again.");
      }
    }
  });
  return (
    <div className="container-fluid">
      <div className={styles.app}>
        <div className={styles.title}>
          <div className={styles.firstImage}>
            <img src={img1} alt="" />
          </div>
          <div className={styles.secondImage}>
            <img src={img2} alt="" onClick={() => navigate("/")} />
          </div>
          <div className={styles.mainTitle}>
            <p>Create Account</p>
            <form className={styles.inputall} onSubmit={formik.handleSubmit}>
              <div className={styles.column}>
                <input
                  type="text"
                  placeholder="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className={styles.error}>{formik.errors.name}</div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className={styles.error}>{formik.errors.email}</div>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className={styles.error}>{formik.errors.password}</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imageUserfile}
                />
                {formik.touched.imageUserfile &&
                  formik.errors.imageUserfile && (
                    <div className={styles.error}>
                      {formik.errors.imageUserfile}
                    </div>
                  )}
              </div>
              <div className={styles.column}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className={styles.error}>{formik.errors.phone}</div>
                )}

                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className={styles.error}>{formik.errors.address}</div>
                )}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                />
                {formik.touched.confirmpassword &&
                  formik.errors.confirmpassword && (
                    <div className={styles.error}>
                      {formik.errors.confirmpassword}
                    </div>
                  )}
              </div>
              <div className={styles.buttonall}>
                <button>Create Account</button>
              </div>
            </form>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>🎉 Registration Successful</DialogTitle>
              <DialogContent>
                <p>Welcome! You have registered successfully.</p>
                <Button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                  variant="contained"
                  color="primary"
                >
                  Go to Login
                </Button>
              </DialogContent>
            </Dialog>
            <div className={styles.foot}>
              <p>
                Already have an account?{" "}
                <Link to="/login" className={styles.loginlink}>
                  Login
                </Link>
              </p>
            </div>
            <div className={styles.conditions}>
              <Link to="/">
                <p>Adopt Pet Terms & Conditions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
