import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import MemberLogin from "./components/MemberLogin";
import MemberJoin from "./components/MemberJoin";
import ListProduct from "./components/ListProduct";
import WriteProduct from "./components/WriteProduct";
import DetailProduct from "./components/DetailProduct";
import ListCart from "./components/ListCart";
import WriteOrder from "./components/WriteOrder";
import ListOrder from "./components/ListOrder";
import DetailOrder from "./components/DetailOrder";

function App() {
  console.warn = function no_console() {}; //경고문 제거

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/member/login" element={<MemberLogin />} />
          <Route path="/member/join" element={<MemberJoin />} />
          <Route path="/product/list" element={<ListProduct />} />
          <Route path="/product/write" element={<WriteProduct />} />
          <Route
            path="/product/detail/:productCode"
            element={<DetailProduct />}
          />
          <Route path="/cart/list" element={<ListCart />} />
          <Route path="/order/write" element={<WriteOrder />} />
          <Route path="/order/list" element={<ListOrder />} />
          <Route path="/order/detail" element={<DetailOrder />} />

          <Route path="*" element={<ListProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
