import React from "react";
import Cookies from "universal-cookie";

function Header() {
  const cookies = new Cookies();
  const userid = cookies.get("userid");
  const name = cookies.get("name");
  const removeCookies = (name) => {
    const cookies = new Cookies();
    cookies.set(name, "", { path: "/", expires: new Date(Date.now()) });
  };
  return (
    <div className="container">
      <a href="/product/list" className="btn btn-info">
        상품목록
      </a>
      &nbsp;&nbsp;
      <a href="/cart/list" className="btn btn-info">
        장바구니
      </a>
      &nbsp;&nbsp;
      <a href="/order/list" className="btn btn-info">
        주문목록
      </a>
      &nbsp;&nbsp;
      {userid == null || userid == "undefined" ? (
        <>
          <a href="/member/login" className="btn btn-primary">
            로그인
          </a>
          &nbsp;&nbsp;
        </>
      ) : (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name.key}님
          환영합니다.&nbsp;&nbsp;
          <a
            onClick={() => {
              removeCookies("userid");
              removeCookies("name");
              removeCookies("level");
              window.location.href = "/product/list";
            }}
            className="btn btn-primary float-right"
          >
            로그아웃
          </a>
        </>
      )}
      <hr />
    </div>
  );
}

export default Header;
