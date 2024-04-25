import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import queryString from "query-string";

function WriteOrder() {
  const cookies = new Cookies();
  const userid = cookies.get("userid");
  if (userid == null) {
    window.location.href = "/member/login";
  }
  const params = window.location.search;
  const query = queryString.parse(params); //get방식으로 전달된 쿼리 스트링
  const route = query.route;

  //console.log("query : " + query);
  let productCode = 0;
  let price = 0;
  let amount = 0;
  let money = 0;
  let delivery = 0;
  let totalMoney = 0;

  if (route == "product") {
    productCode = query.productCode;
    price = query.price;
    amount = query.amount;
    money = price * amount;
    delivery = money >= 3000 ? 0 : 2500;
    totalMoney = parseInt(money) + parseInt(delivery);
  } else if (route == "cart") {
    money = query.money;
    delivery = query.delivery;
    totalMoney = query.totalMoney;
  }
  const navigate = useNavigate();
  const cardNumber = useRef();
  const zipcode = useRef();
  const address1 = useRef();
  const address2 = useRef();
  const tel = useRef();

  const [method, setMethod] = useState("card");
  const [disableCard, setDisableCard] = useState(false);
  const changeMethod = (e) => {
    setMethod(e.target.value);
    if (e.target.value == "account") {
      setDisableCard(true);
    } else {
      setDisableCard(false);
    }
  };

  return (
    <>
      <h2>주문서 작성</h2>
      금액:{money}, 배송료: {delivery}, 총금액: {totalMoney}
      <br />
      <table>
        <tbody>
          <tr>
            <td>결제수단</td>
            <td>
              <input
                value="card"
                name="method"
                type="radio"
                checked={(method = "card")}
                onChange={changeMethod}
              />
              카드
              <input
                value="account"
                name="method"
                type="radio"
                checked={(method = "account")}
                onChange={changeMethod}
              />
              계좌이체
            </td>
          </tr>
          <tr>
            <td>카드번호</td>
            <td>
              <input ref={cardNumber} disabled={disableCard} />
            </td>
          </tr>
          <tr>
            <td>우편번호</td>
            <td>
              <input ref={zipcode} />
            </td>
          </tr>
          <tr>
            <td>주소</td>
            <td>
              <input ref={address1} />
            </td>
          </tr>
          <tr>
            <td>상세주소</td>
            <td>
              <input ref={address2} />
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <input ref={tel} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <button
                type="button"
                onClick={() => {
                  if (method == "card" && cardNumber.current.value == "") {
                    window.alert("카드번호를 입력하세요.");
                    cardNumber.current.focus();
                    return;
                  }
                  if (zipcode.current.value == "") {
                    window.alert("우편번호를 입력하세요.");
                    zipcode.current.focus();
                    return;
                  }
                  if (address1.current.value == "") {
                    window.alert("주소를 입력하세요.");
                    address1.current.focus();
                    return;
                  }
                  if (address2.current.value == "") {
                    window.alert("상세주소를 입력하세요.");
                    address2.current.focus();
                    return;
                  }
                  if (tel.current.value == "") {
                    window.alert("전화번호를 입력하세요.");
                    tel.current.focus();
                    return;
                  }
                  const form = new FormData();
                  form.append("userid", userid.key);
                  form.append("productCode", productCode);
                  form.append("amount", amount);
                  form.append("money", money);
                  form.append("delivery", delivery);
                  form.append("totalMoney", totalMoney);
                  if (method == "card") {
                    form.append("method", "card");
                  } else {
                    form.append("method", "account");
                  }
                  form.append("cardNumber", cardNumber.current.value);
                  form.append("zipcode", zipcode.current.value);
                  form.append("address1", address1.current.value);
                  form.append("address2", address2.current.value);
                  form.append("tel", tel.current.value);
                  fetch("http://localhost/aip/order/insert", {
                    method: "post",
                    body: form,
                  }).then(() => {
                    navigate("/order/list");
                  });
                }}
                className="btn btn-primary"
              >
                주문
              </button>
              &nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WriteOrder;
