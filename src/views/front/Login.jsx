import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {};
    // 帳號驗證
    if (!formData.username) {
      newErrors.username = "帳號為必填";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.username)) {
      newErrors.username = "Email 格式錯誤";
    }
    // 密碼驗證
    if (!formData.password) {
      newErrors.password = "密碼為必填";
    }

    setErrors(newErrors);

    // 有錯誤回傳 false
    return Object.keys(newErrors).length === 0;
  };

  // 頁面初始化
  useEffect(() => {
    // 取得token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("loginToken="))
      ?.split("=")[1];

    // 如果沒有 token，直接結束
    if (!token) {
      return;
    }

    // 設定 axios header
    axios.defaults.headers.common.Authorization = token;
    // 驗證身分
    const checkAdmin = async () => {
      try {
        // 驗證 token
        const res = await axios.post(`${API_BASE}/api/user/check`);
        console.log("Token 驗證成功：", res.data);
        navigate("/products");
      } catch (error) {
        console.log("Token 驗證失敗：", error.response?.data);
      }
    };

    checkAdmin();
  }, []);

  // 表單資料內容處理， 更新setFormData
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // 表單提交，向 API 發送登入請求並處理登入結果
  const handleSubmit = async (e) => {
    // 停用預設事件
    e.preventDefault();

    // 查看表單資料 格式是否正確
    if (!validate()) return;

    try {
      // 做連線
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      // 設定 cookie
      const { token, expired } = response.data;
      document.cookie = `loginToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = token;
      // 登入成功
      navigate("/admin/product");
    } catch (error) {
      // 登入失敗
      console.log("登入失敗：", error.response?.data);
    }
  };

  return (
    <>
      <div className="container login">
        <div className="row justify-content-center">
          <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
          <div className="col-8">
            <form id="form" className="form-signin" onSubmit={handleSubmit} noValidate>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  id="username"
                  placeholder="name@example.com"
                  value={formData.username}
                  onChange={handleInputChange}                  
                  autoFocus
                />
                <div className="invalid-feedback">{errors.username}</div>
                <label htmlFor="username">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}                  
                />
                <div className="invalid-feedback">{errors.password}</div>
                <label htmlFor="password">Password</label>
              </div>
              <button
                className="btn btn-lg btn-primary w-100 mt-3"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
