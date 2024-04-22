import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(response => { return response.json(); })  // 응답 → json변환
            .then(data => {
                setData(data);
                setLoading(false);
            })
    }, []);
    return [data, loading];
}

function DetailGuestbook() {
    const paths = window.location.href.split('/');
    //            요청한주소 →ex. http://localhost/guestbook/detail/{글번호}
    //                             0        1        2       3(-2)   4(-1)
    const url = 'http://localhost/guestbook/' + paths[paths.length - 2] + '/' + paths[paths.length - 1];
    const [data, loading] = useFetch(url);
    const navigate = useNavigate();
    const name = useRef();
    const email = useRef();
    const passwd = useRef();
    const contents = useRef();
    const [message, setMessage] = useState();

    if (loading) {
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
                            <td><input ref={name} defaultValue={data.name} /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input ref={email} defaultValue={data.email} /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <input type="password" ref={passwd} />
                                &nbsp;
                                <span style={{ color: 'red' }}>{ message }</span>
                            </td>
                        </tr>
                        <tr>
                            <td>본문</td>
                            <td>
                                <textarea rows='5' cols='60' ref={contents} defaultValue={data.contents} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' align="center">
                                <button type="button" onClick={() => {
                                    const form = new FormData();
                                    form.append('idx', data.idx);
                                    form.append('name', name.current.value);
                                    form.append('email', email.current.value);
                                    form.append('passwd', passwd.current.value);
                                    form.append('contents', contents.current.value);
                                    fetch('http://localhost/guestbook/update', {
                                        method: 'post',
                                        body: form
                                    }).then(response => {
                                        return response.json();
                                        /* response → {result:success 또는 fail} → json변환 */
                                    }).then(data => {
                                        if (data.result == 'success') {
                                            navigate('/guestbook');
                                        } else {
                                            setMessage('비밀번호가 일치하지 않습니다.');
                                        }
                                    }
                                    )
                                }
                                }>수정</button>
                                &nbsp;
                                <button type="button" onClick={() => {
                                    if (window.confirm('삭제할까요?')) {
                                        const form = new FormData();
                                        form.append('idx', data.idx);
                                        form.append('passwd', passwd.current.value);
                                        fetch('http://localhost/guestbook/delete', {
                                            method: 'post',
                                            body: form
                                        }).then(response => {
                                            return response.json();
                                        }).then(data => {
                                            if (data.result == 'success') {
                                                navigate('/guestbook');
                                            } else {
                                                setMessage('비밀번호가 일치하지 않습니다.');
                                            }
                                        })
                                    }
                                }}>삭제</button>
                                &nbsp;
                                <button onClick={() => navigate('/guestbook')}>목록</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
};

export default DetailGuestbook;