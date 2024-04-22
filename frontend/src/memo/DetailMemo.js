import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function useFetch(url) {
    const [data, setData] = useState(null);
    //     데이터 setter
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 서버호출
        fetch(url)
            .then(response => {
                return response.json();
            })  // 스트링 → json
            .then(data => {
                setData(data);
                setLoading(false);
            })
    }, []);
    return [data, loading];
}

function DetailMemo() {
    const paths = window.location.href.split('/');
    const url = 'http://localhost/memo/' + paths[paths.length - 2] + '/' + paths[paths.length - 1];
    //  http://localhost:3000/memo/detail/2
    //    0			1			2	 3	  4
    const [data, loading] = useFetch(url);
    const naviagte = useNavigate();
    const writer = useRef();
    const memo = useRef();

    if (loading) {  // 로딩중
        return (
            <div>loading</div>
        )
    } else {  // 로딩완료
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>날짜</td>
                            <td>{data.post_date}</td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td><input ref={writer} defaultValue={data.writer} /></td>
                        </tr>
                        <tr>
                            <td>메모</td>
                            <td><input ref={memo} defaultValue={data.memo} /></td>
                        </tr>
                        <tr>
                            <td colSpan='2' align="center">
                                <button type="button" onClick={() => {
                                    const form = new FormData();
                                    form.append('idx', data.idx);
                                    form.append('writer', writer.current.value);
                                    form.append('memo', memo.current.value);
                                    fetch('http://localhost/memo/update', {
                                        method: 'post',
                                        body: form
                                    }).then(() => {
                                        naviagte('/memo');
                                    });
                                }
                                }>수정</button>&nbsp;
                                <button type="button" onClick={() => {
                                    if (window.confirm('삭제할까요?')) {
                                        fetch(`http://localhost/memo/delete?idx=${data.idx}`, { method: 'delete' })
                                            .then(() => {
                                                naviagte('/memo');
                                            });
                                    }
                                }
                                }>삭제</button>&nbsp;
                                <button onClick={() => naviagte('/memo')}>목록</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
};

export default DetailMemo;