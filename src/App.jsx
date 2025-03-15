import { Route, Routes } from "react-router-dom";
import Homepage from "./Home/Homepage";
import Service from "./Components/Service/Service";
import Book from "./Components/Booking/Book";
import Request from "./Components/request/Request";
import Payment from "./Components/Payment/Payment";
import Paymentsuccess from "./Components/PaymentSuccess/Paymentsuccess";
import Introduce from "./Components/Introduction/Introduce";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import ManageUser from "./Components/Admin/ManageUser/ManageUser";
import ManagePet from "./Components/Admin/ManagePet/ManagePet";
import Matching from "./Components/Matching/Matching";
import Profilematching from "./Components/Profilematching/Profilematching";
import Feed from "./Components/FeedSupport/Feed";
import Form from "./Components/Form/Form";
import FormTest from "./Components/FormTest/FormTest";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Blog from "./Components/Blog/Blog";
import Detail from "./Components/DetailBlog/Detail";
import Detail1 from "./Components/DetailBlog/Detail1";
import Detail2 from "./Components/DetailBlog/Detail2";
import Detail3 from "./Components/DetailBlog/Detail3";
import Detail4 from "./Components/DetailBlog/Detail4";
import Post from "./Components/BlogPost/Post";
import Profile from "./Components/Profile/Profile";
import ManageBooking from "./Components/Admin/ManageBooking/ManageBooking";
import Booking from "./Components/BookingUser/Booking";
import ManageService from "./Components/Admin/ManageService/ManageService";
import BookingSuccess from "./Components/BookingSuccess/Bookingsuccess";
function App() {
  //1
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/service" element={<Service />} />
        <Route path="/booking" element={<Book />} />
        <Route path="/request" element={<Request />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Paymentsuccess />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<ManageUser />} />
        <Route path="/pet" element={<ManagePet />} />
        <Route path="/manage-service" element={<ManageService />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/profilematch" element={<Profilematching />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/form" element={<Form />} />
        <Route path="/test" element={<FormTest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/detailblog/1" element={<Detail1 />} />
        <Route path="/detailblog/2" element={<Detail2 />} />
        <Route path="/detailblog/3" element={<Detail3 />} />
        <Route path="/detailblog/4" element={<Detail4 />} />
        <Route path="/post" element={<Post />} />
        <Route path="/pet1" element={<ManagePet />} />
        <Route path="/user1" element={<ManageUser />} />
        <Route path="/dashboard1" element={<Dashboard />} />
        <Route path="/service1" element={<ManageService />} />
        <Route path="/booksuccess" element={<BookingSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/managebooking" element={<ManageBooking />} />
        <Route path="/bookinguser" element={<Booking />} />
      </Routes>
    </>
  );
}

export default App;
