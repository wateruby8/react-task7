import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Checkout() {
  const [cart, setCart] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
        setCart(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getCart();
  }, []);

  const updateCart = async (cartId, productId, qty = 1) => {
    try {
      const data = {
        product_id: productId,
        qty,
      };
      const response = await axios.put(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
        { data },
      );
      const response2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCart(response2.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const delCart = async (cartId) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
      );
      const response2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCart(response2.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const delAllCart = async () => {
    try {
      const response = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      const response2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCart(response2.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit=(formData)=>{
    console.log(formData);

  }

  return (
    <div className="container">
      <h2>購物車列表</h2>
      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={(e) => delAllCart()}
        >
          清空購物車
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">品名</th>
            <th scope="col">數量/單位</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          {cart?.carts?.map((cartItem) => (
            <tr key={cartItem.id}>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => delCart(cartItem.id)}
                >
                  刪除
                </button>
              </td>
              <th scope="row">{cartItem.product.title}</th>

              <td>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    defaultValue={cartItem.qty}
                    onChange={(e) =>
                      updateCart(
                        cartItem.id,
                        cartItem.product_id,
                        Number(e.target.value),
                      )
                    }
                  />
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    {cartItem.product.unit}
                  </span>
                </div>
              </td>

              <td className="text-end">{cartItem.final_total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan="3">
              總計
            </td>
            <td className="text-end">{cart.final_total}</td>
          </tr>
        </tfoot>
      </table>

      <div className="my-5 row justify-content-center">
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              defaultValue="test@gmail.com"
              {...register("email", {
                required: "請輸入 Email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email 格式不正確",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger m-2">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              收件人姓名
            </label>
            <input
              id="name"
              name="姓名"
              type="text"
              className="form-control"
              placeholder="請輸入姓名"
              defaultValue="小名"
              {...register("name", {
                required: "請輸入姓名",
                minLength: {
                  value: 2,
                  message: "姓名至少為2字元",
                },
              })}
            />
            {errors.name && (
              <p className="text-danger m-2">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              收件人電話
            </label>
            <input
              id="tel"
              name="電話"
              type="tel"
              className="form-control"
              placeholder="請輸入電話"
              defaultValue="0912345678"
              {...register("phone", {
                required: "請輸入電話",
                pattern: {
                  value: /^\d+$/,
                  message: "電話僅能輸入數字",
                },
                minLength: {
                  value: 8,
                  message: "電話最少為 8 碼",
                },
              })}
            />
            {errors.phone && (
              <p className="text-danger m-2">{errors.phone.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              收件人地址
            </label>
            <input
              id="address"
              name="地址"
              type="text"
              className="form-control"
              placeholder="請輸入地址"
              defaultValue="台北市信義區信義路100號"
              {...register("address", {
                required: "請輸入地址",               
              })}
            />
            {errors.address && (
              <p className="text-danger m-2">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              留言
            </label>
            <textarea
              id="message"
              className="form-control"
              cols="30"
              rows="10"
               {...register("message")}
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-danger">
              送出訂單
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
