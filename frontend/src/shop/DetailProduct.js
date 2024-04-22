import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Cookies from "universal-cookie";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    return [data, loading];
}

function DetailProduct() {
    const cookies = new Cookies();
    const level = cookies.get('level');
    const { product_code } = useParams();
    //    파라미터(:product_code)
    // path='/product/detail/:product_code' 
    const [data, loading] = useFetch('http://localhost/product/detail/' + product_code);
    const navigate = useNavigate();
    const product_name = useRef();
    const price = useRef();
    const description = useRef();
    const img = useRef();

    if (loading) {
        return (<div>loading</div>);
    } else {
        let src = '';
        let image_url = '';

        if (data.fileName !== '-') {
            src = `http://localhost/static/images/${data.filename}`;
            // webapp/static/images
            // http://localhost → webapp까지 이동
            image_url = `<img src=${src} width='300px' height='300px' />`;
        } else {
            image_url = '';
        }
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>상품명</td>
                            <td><input ref={product_name} defaultValue={data.product_name} /></td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td><input type="number" ref={price} defaultValue={data.price} /></td>
                        </tr>
                        <tr>
                            <td>상품설명</td>
                            <td>
                                <textarea rows='5' cols='60' ref={description} defaultValue={data.description} />
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
                            <td colSpan={2} align="center">
                                <button type="button" onClick={() => {
                                    const form = new FormData();
                                    form.append('product_code', data.product_code);
                                    form.append('product_name', product_name.current.value);
                                    form.append('price', price.current.value);
                                    form.append('description', description.current.value);
                                    if (img.current.files.length > 0) {
                                        form.append('img', img.current.files[0]);
                                    }
                                    fetch('http://localhost/product/update', {
                                        method: 'post',
                                        encType: 'multipart/form-data',
                                        body: form
                                    }).then(() => {
                                        navigate('/product/list');
                                    });
                                }} className="btn btn-info">수정</button>&nbsp;&nbsp;
                                <button type="button" onClick={() => {
                                    if (window.confirm('삭제할까요?')) {
                                        fetch(`http://localhost/product/delete/${data.product_code}`)
                                            .then(() => {
                                                navigate('/product/list');
                                            });
                                    }
                                }} className="btn btn-danger">삭제</button>&nbsp;&nbsp;
                                <button onClick={() => {
                                    navigate('/product/list')
                                }} className="btn btn-info">목록</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}

export default DetailProduct;