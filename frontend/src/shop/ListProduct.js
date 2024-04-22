import React, { useEffect, useRef, useState } from "react";
import '../include/main.css';
import { useNavigate } from "react-router";
import ProductItem from "./ProductItem";

function ListProduct() {
    const navigate = useNavigate();
    const [items, setProductList] = useState([]);
    const product_name = useRef();

    function getList(url) {
        fetch(url)
            .then(response => { return response.json(); })
            .then(data => { setProductList(data); });
    }

    useEffect(() => { getList('http://localhost/product/list') }, []);

    return (
        <>
            <h2>상품목록</h2>
            상품명: <input name="product_name" ref={product_name} />&nbsp;
            <button type="button" onClick={() => {
                getList(`http://localhost/product/list?product_name=${product_name.current.value}`)
            }}>조회</button>
            <br /><br />
            <button onClick={() => { navigate('/product/write') }}>상품등록</button>
            <hr />
            등록된 상품수 : {items.length} 개
            <br /><br />
            <div style={{
                display: 'grid',
                gridTemplateRows: '1fr',  /* 1개 행 */
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',  /* 한 줄에 5개씩 */
            }}>
                {items.map(
                    ({ product_code, product_name, price, filename }) => (
                        <ProductItem
                            product_code={product_code}
                            product_name={product_name}
                            price={price}
                            filename={filename}
                            key={product_code} />
                    )
                )}
            </div>
        </>
    );
};

export default ListProduct;