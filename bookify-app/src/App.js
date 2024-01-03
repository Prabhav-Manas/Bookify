import "./App.css";
import { Routes, Route } from "react-router-dom";

// Components
import MyNavBar from "./Components/NavBar";

// Pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Listing from "./Pages/List";
import BookDetailsPage from "./Pages/Details";
import OrdersPage from "./Pages/ViewOrders";
import Cart from "./Pages/Cart";

function App() {
  return (
    <div className="">
      <MyNavBar />
      <div className="">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books/listing" element={<Listing />} />
          <Route path="/book/view/:bookId" element={<BookDetailsPage />} />
          <Route path="/book/orders" element={<OrdersPage />} />
          <Route path="/book/orders/book/orders/:bookId" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
