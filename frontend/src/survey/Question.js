import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Question() {
    //      변수  setter
    const [item, setItem] = useState([]);
    const [rdo, setRdo] = useState();
    const navigate = useNavigate();  // 서버호출

    function handelOptionChange(e) {
        setRdo(e.target.value);
    }

    function getItem(url) {
        // 백그라운드 서버호출
        fetch(url)
            .then(response => { return response.json(); }) // 응답텍스트 → json변환
            .then(data => { setItem(data); });  // 콜백함수
    }

    const url = 'http://localhost/survey/view/1';
    useEffect(() => { getItem(url); }, []);
    //        input =>   return

    return (
        <>
            <h2>{item.question}</h2>
            <label>
                <input type="radio" value="1" checked={rdo === "1"} onChange={handelOptionChange} />
                {item.ans1}
            </label>
            <label>
                <input type="radio" value="2" checked={rdo === "2"} onChange={handelOptionChange} />
                {item.ans2}
            </label>
            <label>
                <input type="radio" value="3" checked={rdo === "3"} onChange={handelOptionChange} />
                {item.ans3}
            </label>
            <label>
                <input type="radio" value="4" checked={rdo === "4"} onChange={handelOptionChange} />
                {item.ans4}
            </label>
            <button type="button" onClick={() => {
                const form = new FormData();   
                form.append('survey_idx', item.survey_idx);
                form.append('num', rdo);

                // 백그라운드 서버호출
                fetch('http://localhost/survey/insert', {
                    method: 'post',
                    body: form
                }).then(() => {
                    navigate('/survey/summary');  // 리액트 url 이동
                });
            }
            }>확인</button>
        </>
    );
};

export default Question;