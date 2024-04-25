import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function MemberLogin() {
  const [params, setParams] = useSearchParams();
  const msg = params.get("msg");
  const navigate = useNavigate();
  const userid = useRef();
  const passwd = useRef();
  const [message, setMessage] = useState([]);

  return (
    <>
      <h2>로그인</h2>
      <table>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>
              <input ref={userid} />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="password" ref={passwd} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <button
                type="button"
                onClick={() => {
                  if (userid.current.value === "") {
                    window.alert("아이디를 입력하세요.");
                    userid.current.focus();
                    return;
                  }
                  if (passwd.current.value === "") {
                    window.alert("비밀번호를 입력하세요.");
                    passwd.current.focus();
                    return;
                  }

                  const form = new FormData();
                  form.append("userid", userid.current.value);
                  form.append("passwd", passwd.current.value);
                  fetch("http://localhost/api/member/login", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      setMessage(data);
                      if (data.message === "success") {
                        const cookies = new Cookies();
                        cookies.set(
                          "userid",
                          { key: userid.current.value },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        ); //30일
                        cookies.set(
                          "name",
                          { key: data.name },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        );
                        cookies.set(
                          "level",
                          { key: data.level },
                          { path: "/", expires: new Date(Date.now() + 2592000) }
                        );
                        window.location.href = "/";
                      } else {
                        navigate("/member/login?msg=error");
                      }
                    });
                }}
                className="btn btn-primary"
              >
                로그인
              </button>
              &nbsp;
              <button
                onClick={() => navigate("/member/join")}
                className="btn btn-info"
              >
                회원가입
              </button>
              {msg === "login" ? (
                <p style={{ color: "red" }}>로그인하신 후 사용가능합니다.</p>
              ) : null}
              {msg === "error" ? (
                <p style={{ color: "red" }}>
                  아이디 또는 비밀번호가 일치하지 않습니다.
                </p>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default MemberLogin;
