import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function MemberJoin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const userid = useRef();
  const passwd = useRef();
  const name = useRef();
  const zipcode = useRef();
  const address1 = useRef();
  const address2 = useRef();
  const tel = useRef();

  return (
    <>
      <h2>회원가입</h2>
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
            <td>이름</td>
            <td>
              <input ref={name} />
            </td>
          </tr>
          <tr>
            <td>우편번호</td>
            <td>
              <input ref={zipcode} />
            </td>
          </tr>
          <tr>
            <td>주소</td>
            <td>
              <input ref={address1} />
            </td>
          </tr>
          <tr>
            <td>상세주소</td>
            <td>
              <input ref={address2} />
            </td>
          </tr>
          <tr>
            <td>전화</td>
            <td>
              <input ref={tel} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center">
              <button
                type="button"
                onClick={() => {
                  const form = new FormData();
                  form.append("userid", userid.current.value);
                  form.append("passwd", passwd.current.value);
                  form.append("name", name.current.value);
                  form.append("zipcode", zipcode.current.value);
                  form.append("address1", address1.current.value);
                  form.append("address2", address2.current.value);
                  form.append("tel", tel.current.value);
                  fetch("http://localhost/api/member/join", {
                    method: "post",
                    body: form,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      setMessage(data);
                      if (data.message === "success") {
                        navigate("/member/login");
                      }
                    });
                }}
                className="btn btn-primary"
              >
                확인
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default MemberJoin;
