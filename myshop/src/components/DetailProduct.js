import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
function DetailProduct() {
  const cookies = new Cookies();
  const level = cookies.get("level");
  const { productCode } = useParams(); //App.js에서 전달한 파라미터
  const [data, loading] = useFetch(
    "http://localhost/api/product/detail/" + productCode
  );
  const navigate = useNavigate();
  const productName = useRef();
  const price = useRef();
  const description = useRef();
  const img = useRef();
  if (loading) {
    return <div>loading</div>;
  } else {
    let src = "";
    let image_url = "";
    if (data.fileName !== "-") {
      src = `http://localhost/images/${data.dto.fileName}`;
      image_url = `<img src=${src} width='300px' height='300px' />`;
    } else {
      image_url = "";
    }
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>상품명</td>
              <td>
                <input ref={productName} defaultValue={data.dto.productName} />
              </td>
            </tr>
            <tr>
              <td>가격</td>
              <td>
                <input
                  type="number"
                  ref={price}
                  defaultValue={data.dto.price}
                />
              </td>
            </tr>
            <tr>
              <td>상품설명</td>
              <td>
                <textarea
                  rows="5"
                  cols="60"
                  ref={description}
                  defaultValue={data.dto.description}
                />
              </td>
            </tr>
            <tr>
              <td>상품이미지</td>
              <td>
                <span dangerouslySetInnerHTML={{ __html: image_url }}></span>
                <br />
                <input type="file" ref={img} />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                {level != null && level.key == 10 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const form = new FormData();
                        form.append("productCode", data.dto.productCode);
                        form.append("productName", productName.current.value);
                        form.append("price", price.current.value);
                        form.append("description", description.current.value);
                        if (img.current.files.length > 0) {
                          form.append("img", img.current.files[0]);
                        }
                        fetch("http://localhost/api/product/update", {
                          method: "post",
                          encType: "multipart/form-data",
                          body: form,
                        }).then(() => {
                          navigate("/product/list");
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
                            `http://localhost/api/product/delete/${data.dto.productCode}`
                          ).then(() => {
                            navigate("/product/list");
                          });
                        }
                      }}
                      className="btn btn-danger"
                    >
                      삭제
                    </button>
                    &nbsp;
                  </>
                ) : (
                  ""
                )}
                <button
                  onClick={() => navigate("/product/list")}
                  className="btn btn-info"
                >
                  목록
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default DetailProduct;
