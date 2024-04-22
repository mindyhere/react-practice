import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router';

function Summary() {
    //문제 정보
    const [question, setQuestion] = useState([]);

    function getQuestion(url) {
        fetch(url)
            .then(response => { return response.json(); })
            .then(data => { setQuestion(data); });
    }

    const url = 'http://localhost/survey/view/1';
    useEffect(() => { getQuestion(url); }, []);

    //설문조서 결과정보
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    function getList(url) {
        fetch(url)
            .then(response => { return response.json(); })
            .then(data => { console.log(data); setItems(data); });
    }

    useEffect(() => { getList('http://localhost/survey/summary/1'); }, []);

    return (
        <>
            <h2>{question.question}</h2>
            <table border="1">
                <tbody>
                    <tr align="center">
                        <th colSpan={2}>번호</th>
                        <th>응답횟수</th>
                        <th>응답비율</th>
                    </tr>
                    {items.map(
                        ({ num, sum_num, rate }) => (
                            <tr>
                                <td>{num}</td>
                                <td>
                                    {num === 1 ? question.ans1 : null}
                                    {num === 2 ? question.ans2 : null}
                                    {num === 3 ? question.ans3 : null}
                                    {num === 4 ? question.ans4 : null}
                                </td>
                                <td>{sum_num}</td>
                                <td>{rate}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            &nbsp;
            <a href="/survey/view">설문메인</a>
            &nbsp;
            <a href="/">Home</a>
        </>
    );
};

export default Summary;