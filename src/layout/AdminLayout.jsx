import { Outlet, Link } from "react-router";

function AdminLayout() {
  return (
    <>
      <header className="d-flex gap-3">      
        <Link to="/admin/order">後台訂單</Link>
        <Link to="/admin/product">後台產品列表</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default AdminLayout;
