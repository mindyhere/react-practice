import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import GuestbookItem from "./GuestbookItem";

function ListGuestbook() {
    const navigate = useNavigate();
    const [items, setGuestbookList] = useState([]);
    const searchkey = useRef();  // useRef() → 태그 value
    const search = useRef();

    function getList(url) {
        const form = new FormData();  // 폼 객체
        form.append('searchkey', searchkey.current.value);
        //              변수        값
        // .append : 폼에 변수추가
        form.append('search', search.current.value);
        console.log(url);
        console.log(searchkey.current.value);
        console.log(search.current.value);
        fetch(url, { method: 'post', body: form })
            .then(response => { return response.json(); })  // 완료 : 텍스트 → json
            .then(data => { setGuestbookList(data); });  // state객체에 저장
    }

    useEffect(() => { getList('http://localhost/guestbook'); }, []);

    return (
        <>
            <h2>방명록</h2>
            <select ref={searchkey} defaultValue='name'>
                {/* <option value="name" selected>이름</option> */}
                <option value="name">이름</option>
                <option value="contents">내용</option>
                <option value="name_contents">이름+내용</option>
            </select>
            &nbsp;
            <input ref={search} />
            &nbsp;
            <button type="button" onClick={() => {
                getList('http://localhost/guestbook');
            }}>조회</button>
            <br /><br />
            {items.length} 개의 글이 있습니다.
            <br /><br />
            <button onClick={() => navigate('/')}>Home</button>&nbsp;
            <button onClick={() => navigate('/guestbook/write')}>글쓰기</button>&nbsp;
            <table border='1'>
                <tbody>
                    {/* 배열.map(개별객체) */}
                    {items.map(
                        ({ idx, name, email, passwd, contents, post_date }) => (
                            <GuestbookItem
                                idx={idx}
                                name={name}
                                email={email}
                                passwd={passwd}
                                contents={contents}
                                post_date={post_date}
                                key={idx}
                            />
                        )
                    )}
                </tbody>
            </table>
        </>
    );
};

export default ListGuestbook;
