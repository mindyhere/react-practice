import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

function useFetch() {
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

function ListOrder() {
  const cookies = new Cookies();
  const userid = cookies.get("userid");
  const level = cookies.get("level");
  if (userid == null || userid == "undefined") {
    window.location.href = "/member/login?msg=login";
  }
  const [data, loading] = useFetch(
    "http://localhost/api/order/list?userid=" + userid.key
  );
  const changeStatus = (status, orderIdx) => {
    const form = new FormData();
    form.append("userid", userid.key);
    form.append("orderIdx", orderIdx);
    form.append("status", status);
    fetch("http://localhost/api/order/changeStatus", {
      method: "post",
      body: form,
    }).then(() => {
      window.location.href = "/order/list";
    });
  };

  if (loading) {
    return <div>loading</div>;
  } else {
    if (data.count == 0) {
      return <h2 className="text-center">주문내역이 없습니다.</h2>;
    } else {
      return (
        <div className="container">
          <table border={1} className="table table-hover">
            <thead>
              <tr>
                <td>이름</td>
                <td>주문일시</td>
                <td>주문금액</td>
                <td>결제방식</td>
                <td>배송주소</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
              {data.list.map((item, idx) => {
                <tr>
                  <td>{item.userName}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.totalMoney}</td>
                  <td>{item.method}</td>
                  <td>
                    {item.address1} {item.address2}
                  </td>
                  <td>
                    {level.key != 10 && item.status == "주문접수" ? (
                      <Link to={`/order/detail/${item.orderIdx}`}>
                        {item.status}
                      </Link>
                    ) : level.key != 10 ? (
                      <>{item.status}</>
                    ) : (
                      ""
                    )}
                    {level.key == 10 ? (
                      <select
                        onChange={(e) => {
                          changeStatus(e.target.value, item.orderIdx);
                        }}
                      >
                        <option
                          value={주문접수}
                          selected={item.status == "주문접수"}
                        >
                          주문접수
                        </option>
                        <option
                          value={주문취소요청}
                          selected={item.status == "주문취소요청"}
                        >
                          주문취소요청
                        </option>
                        <option
                          value={주문취소완료}
                          selected={item.status == "주문취소완료"}
                        >
                          주문취소완료
                        </option>
                        <option
                          value={배송중}
                          selected={item.status == "배송중"}
                        >
                          배송중
                        </option>
                        <option
                          value={배송완료}
                          selected={item.status == "배송완료"}
                        >
                          배송완료
                        </option>
                      </select>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default ListOrder;
