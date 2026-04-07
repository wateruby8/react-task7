import { Outlet, Link } from "react-router";

function FrontLayout() {
  return (
    <>
      <header className="d-flex gap-3">
        <Link to="/">首頁</Link>
        <Link to="/products">產品列表</Link>
        <Link to="/cart">購物車</Link>
        <Link to="/login">登入頁</Link>
         <Link to="/checkout">結帳</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default FrontLayout;
