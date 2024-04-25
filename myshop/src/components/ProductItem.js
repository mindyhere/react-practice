import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function ProductItem({ productCode, productName, price, fileName }) {
  let loading = false;
  const cookies = new Cookies();
  const userid = cookies.get("userid");
  const url = `http://localhost/images/${fileName}`;
  const navigate = useNavigate();
  const amount = useRef();

  if (loading) {
    return <div>loading</div>;
  } else {
    let img = "";

    if (fileName !== "-") {
      img = `<img src=${url} width='100px' height='100px' /><br/>`;
    } else {
      img = "[이미지미등록]<br/>";
    }

    return (
      <div style={{ margin: "5px" }}>
        <span dangerouslySetInnerHTML={{ __html: img }}></span>
        <Link to={`/product/detail/${productCode}`}>
          상품명: {productName}
          <br />
          가격: {price}원
        </Link>
        <br />
        <input type="number" ref={amount} defaultValue={1} />
        &nbsp;
        <button
          type="button"
          onClick={() => {
            if (userid == null || userid === "undefined") {
              window.location.href = "/member/login?msg=login";
            } else {
              fetch(
                `http://localhost/api/cart/insert?userid=${userid.key}&productCode=${productCode}&amount=${amount.current.value}`
              ).then(() => {
                navigate("/cart/list");
              });
            }
          }}
          className="btn btn-info"
        >
          장바구니
        </button>
        &nbsp;
        <button
          type="button"
          onClick={() => {
            window.location.href = `/order/write?route=product&productCode=${productCode}&price=${price}&amount=${amount.current.value}`;
          }}
          className="btn btn-primary"
        >
          주문
        </button>
        <br />
        <br />
      </div>
    );
  }
}

export default ProductItem;
