function Variable() {
    let name = '김철수';
    let message = '안녕하세요';

    return (
        <>
            <div>
                {name}님
            </div>
            <div>
                {message}
            </div>
        </>
    );
}

export default Variable;