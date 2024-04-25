import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return [data, loading];
}
function ListCart() {
  const cookies = new Cookies();
  const userid = cookies.get("userid");
  if (userid == null || userid == "undefined") {
    window.location.href = "/member/login?msg=login";
  }
  const amount = useRef([]);
  const [data, loading] = useFetch(
    "http://localhost/api/cart/list?userid=" + userid.key
  );
  if (loading) {
    return <div>loading</div>;
  } else {
    if (data.count == 0) {
      return <h2 className="text-center">장바구니가 비었습니다.</h2>;
    } else {
      return (
        <div className="container">
          총금액 {data.totalMoney} ( 배송료: {data.delivery} )
          <br />
          <br />
          <table className="table table-hover">
            <thead>
              <tr>
                <td>상품명</td>
                <td>단가</td>
                <td>수량</td>
                <td>금액</td>
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {data.list.map((item, idx) => (
                <tr>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    <input
                      type="number"
                      ref={(el) => (amount.current[idx] = el)}
                      defaultValue={item.amount}
                    />
                  </td>
                  <td>{item.money}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        const form = new FormData();
                        form.append("userid", userid.key);
                        form.append("cartId", item.cartId);
                        form.append("productCode", item.productCode);
                        form.append("amount", amount.current[idx].value);
                        fetch("http://localhost/api/cart/update", {
                          method: "post",
                          body: form,
                        }).then(() => {
                          window.location.href = "/cart/list";
                        });
                      }}
                      className="btn btn-info"
                    >
                      수정
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("삭제할까요?")) {
                          fetch(
                            `http://localhost/api/cart/delete/${item.cartId}`
                          ).then(() => {
                            window.location.href = "/cart/list";
                          });
                        }
                      }}
                      className="btn btn-danger"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("장바구니를 비울까요?")) {
                fetch(
                  `http://localhost/api/cart/deleteAll?userid=${userid.key}`
                ).then(() => {
                  window.location.href = "/cart/list";
                });
              }
            }}
            className="btn btn-danger"
          >
            장바구니 비우기
          </button>
          &nbsp;
          <button
            type="button"
            onClick={() => {
              window.location.href = `/order/write?userid=${userid.key}&route=cart&money=${data.money}&d
  elivery=${data.delivery}&totalMoney=${data.totalMoney}`;
            }}
            className="btn btn-primary"
          >
            주문
          </button>
        </div>
      );
    }
  }
}

export default ListCart;