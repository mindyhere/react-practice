import React, { useRef } from "react";
import { useNavigate } from "react-router";

function WriteGuestbook() {
    const navigate = useNavigate();  // url을 이동(링크기능)
    const name = useRef();  // 폼 태그값 참조 기능
    const email = useRef();
    const passwd = useRef();
    const contents = useRef();

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>이름</td>
                        <td><input ref={name} /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input ref={email} /></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" ref={passwd} /></td>
                    </tr>
                    <tr>
                        <td>본문</td>
                        <td><textarea rows='5' cols='60' ref={contents} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">
                            <button type="button" onClick={() => {
                                const form = new FormData();
                                form.append('name', name.current.value);
                                form.append('email', email.current.value);
                                form.append('passwd', passwd.current.value);
                                form.append('contents', contents.current.value);

                                fetch('http://localhost/guestbook/insert', {
                                    method: 'post',
                                    body: form
                                }).then(() => {
                                    navigate('/guestbook');
                                });
                            }}>확인</button>
                            <button onClick={() => navigate('/guestbook')}>목록</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default WriteGuestbook;