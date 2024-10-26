
# DOCUMENT API ĐĂNG NHẬP

## 1. Mục đích

API này được sử dụng để xác thực người dùng bằng cách kiểm tra thông tin đăng nhập (tên người dùng và mật khẩu). Nếu thông tin đăng nhập hợp lệ, API sẽ trả về thông tin người dùng và mã thông báo JWT (token) để sử dụng cho các yêu cầu bảo mật sau này.

## 2. Endpoint

```
POST /APIsignin
```

## 3. Định dạng Dữ liệu

### 3.1. Yêu cầu (Request)

Để thực hiện yêu cầu đăng nhập, gửi một JSON object với định dạng sau:

```json
{
    "username": "string",
    "password": "string",
    "email": "string",
    "OTP": "string"
}
```

**Các trường:**
- `username`: Tên người dùng của tài khoản (bắt buộc).
- `password`: Mật khẩu của tài khoản (bắt buộc).
- `email`: Địa chỉ email của tài khoản (không bắt buộc).
- `OTP`: Mã OTP nếu có (không bắt buộc).

### 3.2. Phản hồi (Response)

API sẽ trả về một JSON object với định dạng như sau:

#### 3.2.1. Thành công

```json
{
    "status": "success",
    "data": {
        "info": {
            "id": "int",          
            "email": "string",     
            "username": "string"  
        },
        "token": "string"        
    },
    "message": "Login successful"
}
```

**Giải thích:**
- `status`: Trạng thái của request (yêu cầu)
- `data`: Dữ liệu trả về từ request (yêu cầu). Bao gồm:
    - `info`: Thông tin chi tiết về tài khoản người dùng (ID, email, username).
    - `token`: Mã thông báo JWT dùng để xác thực các yêu cầu tiếp theo.
- `message`: Thông điệp mô tả kết quả của yêu cầu (thành công hoặc lỗi).

#### 3.2.2. Thất bại

```json
{
    "status": "error",
    "data": null,
    "message": "User not found",
}
```

## 4. Mô tả Chi tiết

- **`signin_service(account: Account)`**:
  - Hàm này nhận một đối tượng `Account`, kết nối đến cơ sở dữ liệu và kiểm tra thông tin đăng nhập của người dùng.
  - Nếu thông tin hợp lệ, hàm sẽ tạo một mã thông báo JWT (token) và lấy thông tin của người dùng, sau đó trả về phản hồi thành công.
  - Nếu thông tin không hợp lệ, hàm sẽ trả về phản hồi thất bại.

- **`checkAccount(self, cursor)`**:
  - Kiểm tra xem tài khoản có tồn tại và mật khẩu có đúng hay không bằng cách truy vấn cơ sở dữ liệu.

- **`getInfoAccount(self, cursor)`**:
  - Lấy thông tin chi tiết của người dùng từ cơ sở dữ liệu nếu tài khoản hợp lệ.

## 5. Ví dụ

### Yêu cầu

```json
{
  "username": "test11",
  "password": "123456",
  "email": "string",
  "OTP": "string"
}
```

### Phản hồi

```json
{
    "status": "success",
    "data": {
        "info": {
            "id": 1,
            "email": "testuser@example.com",
            "username": "test11"
        },
        "token": "yegwudbwi13244ej..."
    },
    "message": "Login successful"
}
```
