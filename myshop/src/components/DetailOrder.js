import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

function DetailOrder() {
  const { orderIdx } = useParams();
  const [data, loading] = useFetch(
    "http://localhost/api/order/detail/" + orderIdx
  );
  const reason = useRef();
  const [cancelInput, setCancelInput] = useState(false);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="container">
        처리상태 : {data.dto.status}
        <br />
        결제방법 : {data.dto.method}
        <br />
        카드번호 : {data.dto.cardNumber}
        <br />
        배송주소 : {data.dto.address1} {data.dto.address2}(우편번호:
        {data.dto.zipcode})<br />
        전화번호 : {data.dto.tel}
        <br />
        <table className="table table-hover">
          <thead>
            <tr>
              <td>상품명</td>
              <td>가격</td>
              <td>수량</td>
              <td>금액</td>
            </tr>
          </thead>
          <tbody>
            {data.detailList.map((item, idx) => (
              <tr>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.amount}</td>
                <td>{item.money}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {cancelInput == true ? (
          <p>
            주문최소사유 :<input ref={reason} />
            <button
              onClick={() => {
                if (window.confirm("주문취소요청을 할까요?")) {
                  fetch(`http://localhost/api/order/cancel/${orderIdx}?cancelReason=${reason.current.value}`).then(
                    () => {
                      window.location.href = "/order/list";
                    }
                  );
                }
              }}
              className="btn btn-danger"
            >
              주문취소요청
            </button>
          </p>
        ) : (
          <button
            onClick={() => {
              setCancelInput(true);
            }}
            className="btn btn-danger"
          >
            주문취소
          </button>
        )}
      </div>
    );
  }
}

export default DetailOrder;
