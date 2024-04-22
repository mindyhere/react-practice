function Loop() {
    return (
        <div>
            <h2>상품목록</h2>
            <Item></Item>  
            {/* 컴포넌트 */}
        </div>
    );
}

function Item() {  // 컴포넌트 함수
    // 상수          array  
    const items = [
        { name: '사과', price: 5000 },
        { name: '포도', price: 4000 },
        { name: '망고', price: 3000 },
    ];

    return (
        <div>
            {items.map(item =>
                <div>
                    <h4>상품이름: {item.name}</h4>
                    <p>상품가격: {item.price}</p>
                </div>
            )}
        </div>
    );
}

export default Loop;