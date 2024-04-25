import { useRef } from "react";
import { useNavigate } from "react-router";

function WriteProduct() {
  const navigate = useNavigate();
  const product_name = useRef();
  const price = useRef();
  const description = useRef();
  const img = useRef();

  return (
    <>
      <h2>상품정보 등록</h2>
      <table>
        <tbody>
          <tr>
            <td>상품명</td>
            <td>
              <input ref={product_name} />
            </td>
          </tr>
          <tr>
            <td>가격</td>
            <td>
              <input type="number" ref={price} />
            </td>
          </tr>
          <tr>
            <td>상품설명</td>
            <td>
              <textarea rows={5} cols={60} ref={description} />
            </td>
          </tr>
          <tr>
            <td>상품이미지</td>
            <td>
              <input type="file" ref={img} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <button
                type="button"
                onClick={() => {
                  const form = new FormData();
                  form.append("productName", product_name.current.value);
                  form.append("price", price.current.value);
                  form.append("description", description.current.value);
                  if (img.current.files.length > 0) {
                    form.append("img", img.current.files[0]);
                  }
                  fetch("http://localhost/api/product/insert", {
                    method: "post",
                    encType: "multipart/form-data",
                    body: form,
                  }).then(() => {
                    navigate("/product/list");
                  });
                }}
                className="btn btn-primary"
              >
                확인
              </button>
              &nbsp;
              <button onClick={() => navigate("/")} className="btn btn-info">
                목록
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WriteProduct;
