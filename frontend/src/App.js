import React from 'react';
import { Routes, Route } from 'react-router';
//        함수이름              패키지
import { BrowserRouter } from 'react-router-dom';

import Main from './Main';
//     참조이름    파일경로
import Header from './include/Header';
import './include/main.css'; //스타일적용

//js test
import Syntax from './test/Syntax';
import Variable from './test/Variable';
import State from './test/State';
import Count from './test/Count';
import Loop from './test/Loop';

//survey
import Question from './survey/Question';
import Summary from './survey/Summary';

//memo
import ListMemo from './memo/ListMemo';
import DetailMemo from './memo/DetailMemo';

//guestbook
import ListGuestbook from './guestbook/ListGuestbook';
import WriteGuestbook from './guestbook/WriteGuestbook';
import DetailGuestbook from './guestbook/DetailGuestbook';

//product
import ListProduct from './shop/ListProduct';
import WriteProduct from './shop/WriteProduct';
import DetailProduct from './shop/DetailProduct';


function App() {
  console.warn = function no_console() { };
  return (
    <> {/* 루트노드 1개 */}
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/test' element={<Syntax />} />
          <Route path='/test/variable' element={<Variable />} />
          <Route path='/test/state' element={<State />} />
          <Route path='/test/count' element={<Count />} />
          <Route path='/test/loop' element={<Loop />} />

          <Route path='/survey/view' element={<Question />} />
          <Route path='/survey/summary' element={<Summary />} />

          <Route path='/memo' element={<ListMemo />} />
          <Route path='/memo/detail/:product_code' element={<DetailMemo />} />

          <Route path='/guestbook' element={<ListGuestbook />} />
          <Route path='/guestbook/write' element={<WriteGuestbook />} />
          <Route path='/guestbook/detail/:product_code' element={<DetailGuestbook />} />

          <Route path='/product' element={<ListProduct />} />
          <Route path='/product/list' element={<ListProduct />} />
          <Route path='/product/write' element={<WriteProduct />} />
          <Route path='/product/detail/:product_code' element={<DetailProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
