import React from "react";
import { Link } from "react-router-dom";

function MemoItem({ idx, writer, memo, post_date }) {
    let loading = false;
    if (loading) {  // 로딩중
        return (
            <div>loading</div>
        )
    } else {  // 로딩완료
        return (
            <tr>
                <td>{idx}</td>
                <td>{writer}</td>
                <td><Link to={`/memo/detail/${idx}`}>{memo}</Link></td>
                <td>{post_date}</td>
            </tr>
        )
    }
}

export default MemoItem;