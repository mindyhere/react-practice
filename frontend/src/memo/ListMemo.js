import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import MemoItem from './MemoItem';

function ListMemo() {
    const naviagte = useNavigate();
    const [items, setMemoList] = useState([]);
    const writer = useRef();
    const memo = useRef();
    const search_memo = useRef();

    function getList(url) {
        fetch(url)
            .then(response => { return response.json(); })
            .then(data => { setMemoList(data); });
    }

    useEffect(() => { getList('http://localhost/memo'); }, []);

    return (
        <>
            <h2>메모장</h2>
            이름: <input name="writer" ref={writer} size='10' />&nbsp;
            메모: <input name="memo" ref={memo} />&nbsp;
            <button type="button" onClick={() => {
                const form = new FormData();
                form.append('writer', writer.current.value);
                form.append('memo', memo.current.value);
                fetch('http://localhost/memo/insert', {
                    method: 'post',
                    body: form
                }).then(() => {  // 처리성공
                    getList('http://localhost/memo');  // 목록갱신
                    writer.current.value = '';
                    memo.current.value = '';
                });
            }}>확인</button>
            <br /><br />
            메모: <input name="memo" ref={search_memo} size='10' />&nbsp;
            <button type="button" onClick={() => {
                getList(`http://localhost/memo?memo=${search_memo.current.value}`)
            }}>조회</button>
            <br /><br />
            {items.length}개의 메모가 있습니다.
            <br /><br />
            <button onClick={() => naviagte('/')}>Home</button>&nbsp;
            <table border='1'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>메모</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(
                        ({ idx, writer, memo, post_date }) => (
                            <MemoItem
                                idx={idx}
                                writer={writer}
                                memo={memo}
                                post_date={post_date}
                                key={idx}  // PK전달
                            />
                        )
                    )}
                </tbody>
            </table>
        </>
    );
};

export default ListMemo;