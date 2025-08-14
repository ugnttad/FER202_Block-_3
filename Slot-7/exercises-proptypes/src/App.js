import React from "react";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "./components/MyForm";
import ValidatedForm from "./components/ValidatedForm";

const App = () => {
  const handleFormSubmit2 = (formData) => {
    console.log("UserProfile2 submit:", formData);
  };

  const handleMyFormSubmit = (formState) => {
    console.log("MyForm submit:", formState);
  };

  const handleValidatedSubmit = (data) => {
    console.log("ValidatedForm submit:", data);
    alert("Gửi thành công! Xem console để thấy dữ liệu.");
  };

  return (
    <div className="App" style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Ứng Dụng React – PropTypes & Validation</h1>

      <hr />
      <h2>Ví dụ 1: UserProfile (kiểm tra props + PropTypes)</h2>
      {/* Hợp lệ */}
      <UserProfile name="Nguyễn Văn A" age={25} />
      {/* name rỗng */}
      <UserProfile name="" age={25} />
      {/* tuổi không hợp lệ */}
      <UserProfile name="Nguyễn Văn B" age="twenty five" />
      {/* không nhập tuổi */}
      <UserProfile name="Nguyễn Văn C" age={null} />

      <hr />
      <h2>Ví dụ 2: UserProfile2 (Form + react-bootstrap + PropTypes)</h2>
      <UserProfile2 name="Nguyễn Văn A" age={25} onSubmit={handleFormSubmit2} />
      <UserProfile2 name="Nguyễn Văn B" age="twenty five" onSubmit={handleFormSubmit2} />
      <UserProfile2 name="" age={30} onSubmit={handleFormSubmit2} />

      <hr />
      <h2>Ví dụ 3: MyForm (useReducer + Alert + PropTypes)</h2>
      <MyForm title="Đăng Ký Người Dùng" onSubmit={handleMyFormSubmit} />

      <hr />
      <h2>Ví dụ 4: ValidatedForm (ràng buộc dữ liệu đầy đủ)</h2>
      <p>
        Yêu cầu:
        <br />– Tên 3-50 ký tự • Tuổi 18-100 • Email đúng định dạng •
        Điện thoại 10-15 chữ số • Phải đồng ý điều khoản
      </p>
      <ValidatedForm onSubmit={handleValidatedSubmit} />
    </div>
  );
};

export default App;
