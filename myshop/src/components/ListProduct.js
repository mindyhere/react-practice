import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import ProductItem from "./ProductItem";

function ListProduct() {
  const cookies = new Cookies();
  const level = cookies.get("level");
  const navigate = useNavigate();
  const [items, setProductList] = useState([]);
  const productName = useRef();

  function getList(url) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductList(data);
      });
  }

  useEffect(() => {
    getList("http://localhost/api/product/list");
  }, []);

  return (
    <>
      상품명: <input ref={productName} />
      &nbsp;
      <button
        type="button"
        onClick={() => {
          getList(
            `http://localhost/api/product/list?productName=${productName.current.value}`
          );
        }}
        className="btn btn-info"
      >
        조회
      </button>
      &nbsp;
      {level != null && level.key === 10 ? (
        <button
          onClick={() => 
            navigate("/product/write")}
          className="btn btn-primary"
        >
          상품등록
        </button>
      ) : (
        ""
      )}
      <hr />
      등록된 상품수: {items.length}
      <br />
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {items.map(({ productCode, productName, price, fileName }) => (
          <ProductItem
            productCode={productCode}
            productName={productName}
            price={price}
            fileName={fileName}
            key={productCode}
          />
        ))}
      </div>
    </>
  );
}

export default ListProduct;
