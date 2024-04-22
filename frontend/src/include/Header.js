import React from "react";

function Header() {
    return (
        <div className="container">
            <a href="/">Home</a>&nbsp;&nbsp;
            <a href="/test">기초문법</a>&nbsp;&nbsp;
            <a href="/survey/view">설문조사</a>&nbsp;&nbsp;
            <a href="/memo">한줄메모장</a>&nbsp;&nbsp;
            <a href="/guestbook">방명록</a>&nbsp;&nbsp;
            <a href="/product/list">상품관리</a>&nbsp;&nbsp;
            <hr />
        </div>
    );
}

export default Header;