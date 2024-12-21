
# DOCUMENT USER SERVICE

## 1. API chỉnh sửa thông tin cá nhân
### 1.1 Mục đích
Cho phép người dùng chỉnh sửa thông tin cá nhân của mình trong hệ thống sau khi xác thực danh tính qua token.

### 1.2 Endpoint
```
POST api/editProfile
```

#### 1.2.1 Định dạng dữ liệu yêu cầu (Request)

Gửi một JSON object với định dạng sau trong body:

```json
{
    "fullname": "string",
    "birthday": "string",
    "gender": "string",
    "phonenumber": "string",
    "location": "string",
    "state": "string"
}
```
**Các trường:**
- `fullname`: Tên đầy đủ của người dùng (không bắt buộc).
- `birthday`: Ngày sinh của người dùng, định dạng YYYY-MM-DD (không bắt buộc).
- `gender`: Giới tính (không bắt buộc).
- `phonenumber`: Số điện thoại (không bắt buộc).
- `location`: Địa điểm sinh sống (không bắt buộc).
- `state`: Trạng thái cá nhân (không bắt buộc).

#### 1.2.2. Định dạng dữ liệu phản hồi (Response)
##### 1.2.2.1 Yêu cầu thành công
```json
{
  "status": "Success",
  "data": null,
  "message": "Profile updated successfully"
}
```
##### 1.2.2.2 Yêu cầu không thành công
```json
{
  "status": "Error",
  "data": null,
  "message": "Failed to update profile"
}
```
***Trong đó:***
- `status`: Trạng thái của yêu cầu.
- `message`: Thông điệp mô tả kết quả của yêu cầu.

### 1.3 Lưu ý
- API yêu cầu token hợp lệ để xác thực danh tính người dùng.
- Chỉ các trường được cung cấp mới được cập nhật, các trường không gửi sẽ giữ nguyên.

## 2. API lấy thông tin cá nhân
### 2.1 Mục đích
API cho phép lấy thông tin cá nhân của họ trong hệ thống.

### 2.2 Endpoint
```
GET api/getProfile
```

#### 2.2.1 Định dạng dữ liệu yêu cầu (Request)

API không yêu cầu body trong request. Token xác thực danh tính người dùng sẽ được gửi trong header.

#### 2.2.2. Định dạng dữ liệu phản hồi (Response)
##### 2.2.2.1 Yêu cầu thành công
```json
{
  "status": "Success",
  "data": {
    "user_id": "integer",
    "fullname": "string",
    "birthday": "string",
    "gender": "string",
    "phonenumber": "string",
    "location": "string",
    "state": "string"
  },
  "message": "Profile retrieved successfully"
}
```

***Trong đó:***
- `user_id`: ID người dùng.
- `fullname`: Họ tên đầy đủ.
- `birthday`: Ngày sinh (định dạng YYYY-MM-DD).
- `gender`: Giới tính (“Male”, “Female” hoặc khác).
- `phonenumber`: Số điện thoại.
- `location`: Địa chỉ hiện tại.
- `state`: Quốc gia sinh sống.

##### 2.2.2.2 Yêu cầu không thành công
```json
{
  "status": "Error",
  "data": null,
  "message": "Profile not found"
}
```
***Trong đó:***
- `status`: Trạng thái của yêu cầu.
- `message`: Thông điệp mô tả kết quả của yêu cầu.

### 2.3 Lưu ý
- API yêu cầu token hợp lệ trong header để xác thực danh tính người dùng.
- Trường `birthday` được trả về theo định dạng chuỗi `YYYY-MM-DD`.

## 3. API upload avatar người dùng
### 3.1 Mục đích
API cho phép người dùng tải lên và cập nhật avatar cho tài khoản cá nhân.

### 3.2 Endpoint
```
POST api/uploadAvatar
```

#### 3.2.1 Định dạng dữ liệu yêu cầu (Request)

- Token xác thực danh tính người dùng.

- File hình ảnh có các định dạng jpg, jpeg hoặc png (bắt buộc).

#### 3.2.2. Định dạng dữ liệu phản hồi (Response)
##### 3.2.2.1 Yêu cầu thành công
```json
{
  "status": "Success",
  "data": null,
  "message": "Avatar uploaded successfully"
}
```
##### 3.2.2.2 Yêu cầu không thành công
###### 3.2.2.2.1 Token không hợp lệ hoặc thiếu xác thực
```json
{
  "status": "Error",
  "data": null,
  "message": "Invalid token or unauthorized"
}
```
###### 3.2.2.2.2 Lỗi cập nhật avatar
```json
{
  "status": "Error",
  "data": null,
  "message": "Failed to update avatar"
}
```
###### 3.2.2.2.3 Định dạng file không hợp lệ
```json
{
  "status": "Error",
  "data": null,
  "message": "Invalid file format"
}
```
***Trong đó:***
- `status`: Trạng thái của yêu cầu.
- `message`: Thông điệp mô tả kết quả của yêu cầu.

### 3.3 Lưu ý
- File avatar chỉ hỗ trợ các định dạng hình ảnh: `jpg, jpeg, png`.
- Đường dẫn file được lưu trong thư mục `Backend/user_service/avatar/`.
- API yêu cầu token hợp lệ trong header để xác thực danh tính người dùng.

## 4. API lấy ảnh avatar người dùng
### 4.1 Mục đích
API cho phép người dùng lấy ảnh avatar cá nhân.

### 4.2 Endpoint
```
GET api/getAvatar

```

#### 4.2.1 Định dạng dữ liệu yêu cầu (Request)

API không yêu cầu body trong request. Token xác thực danh tính người dùng sẽ được gửi trong header.

#### 4.2.2. Định dạng dữ liệu phản hồi (Response)
##### 4.2.2.1 Yêu cầu thành công
Phản hồi sẽ trả về file hình ảnh đã lưu.

##### 4.2.2.2 Yêu cầu không thành công
###### 4.2.2.2.1 Avatar không tìm thấy trong cơ sở dữ liệu
```json
{
  "status": "Error",
  "data": null,
  "message": "Avatar not found in database"
}
```
###### 4.2.2.2.2 File hình ảnh không tồn tại trên server
```json
{
  "status": "Error",
  "data": null,
  "message": "Image file not found on server"
}
```
***Trong đó:***
- `status`: Trạng thái của yêu cầu.
- `message`: Thông điệp mô tả kết quả của yêu cầu.

### 4.3 Lưu ý
- API yêu cầu token hợp lệ trong header để xác thực danh tính người dùng.
- Đường dẫn file hình ảnh avatar là một đường dẫn tương đối lưu trữ trong cơ sở dữ liệu. Hệ thống sẽ tìm đường dẫn tới file từ server để phục vụ request.