import React from "react";
import { Link } from "react-router-dom";

function GuestbookItem({ idx, name, email, passwd, contents, post_date }) { // 모듈화
    let loading = false;
    if (loading) { // 로딩중
        return (
            <div>loading</div>
        )
    } else { // 로딩완료
        //contents 줄바꿈처리
        contents = contents.replaceAll('\n', '<br/>');

        return (
            <tr>
                <td>
                    이름 : {name}&nbsp; ({email})<br />
                    날짜 : {post_date}<hr />
                    <Link to={`/guestbook/detail/${idx}`}>
                        <span dangerouslySetInnerHTML={{ __html: contents }} />
                    </Link>
                </td>
            </tr>
        )
    }
}

export default GuestbookItem;