
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
  "username": "string",
  "fullname": "string",
  "birthday": date, 
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
    "state": "string",
    "email": "string",
    "created": "string"
  },
  "message": "Profile getting successfully"
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

API không yêu cầu body trong request. Username xác thực danh tính người dùng sẽ được gửi trong header.

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
- API yêu cầu username hợp lệ trong header để xác thực danh tính người dùng.
- Đường dẫn file hình ảnh avatar là một đường dẫn tương đối lưu trữ trong cơ sở dữ liệu. Hệ thống sẽ tìm đường dẫn tới file từ server để phục vụ request.

## 5. API thống kê danh sách thông tin user và technical (chỉ dành cho admin)
### 5.1 Mục đích
API cung cấp tính năng thống kê danh sách thông tin của tất cả user và technical. Chỉ các tài khoản có quyền admin mới được phép sử dụng API này.

### 4.2 Endpoint
```
GET /api/getUserStatistics
GET /api/getTechnicalStatistics
```

#### 5.2.1 Định dạng dữ liệu yêu cầu (Request)

API không yêu cầu body trong request. Token xác thực danh tính người dùng sẽ được gửi trong header.

#### 5.2.2. Định dạng dữ liệu phản hồi (Response)
##### 5.2.2.1 Yêu cầu thành công
Phản hồi sẽ trả về các thông tin của tất cả user và technical.
- Định dạng phản hồi nếu lấy thông tin user:
```json
{
  "status": "Success",
  "data": {
    "data": [
      {
        "user_id": 97,
        "fullname": null,
        "username": "hehehe",
        "created": "2024-12-30 15:20:53",
        "avatar": "/user/api/getAvatar?username=hehehe",
        "contribution": 0
      },
      {
        "user_id": 98,
        "fullname": null,
        "username": "1234",
        "created": "2024-12-30 16:20:56",
        "avatar": "/user/api/getAvatar?username=1234",
        "contribution": 0
      },
      {
        "user_id": 69,
        "fullname": "Le Huynh Anh Thu",
        "username": "baongan123",
        "created": "2024-11-09 16:13:14",
        "avatar": "/user/api/getAvatar?username=baongan123",
        "contribution": 17
      },
      {
        "user_id": 96,
        "fullname": null,
        "username": "hehe",
        "created": "2024-12-30 14:44:26",
        "avatar": "/user/api/getAvatar?username=hehe",
        "contribution": 0
      }
    ]
  },
  "message": "User statistics retrieved successfully"
}
```
- Định dạng phản hồi nếu lấy thông tin technical: 
```json
{
  "status": "Success",
  "data": {
    "data": [
      {
        "user_id": 87,
        "fullname": null,
        "username": "thule",
        "avatar": "/user/api/getAvatar?username=thule",
        "created": "2024-12-29 00:42:57",
        "tasks": [
          {
            "deadline": "2024-02-25 07:12:28",
            "status": null,
            "ward_name": "Phường Đa Kao",
            "district_name": "Quận 1",
            "province_name": "Thành phố Hồ Chí Minh"
          },
          {
            "deadline": "2024-03-02 07:19:37",
            "status": null,
            "ward_name": "Phường 5",
            "district_name": "Quận Phú Nhuận",
            "province_name": "Thành phố Hồ Chí Minh"
          },
          {
            "deadline": "2024-01-03 07:55:02",
            "status": null,
            "ward_name": "Phường Linh Trung",
            "district_name": "Thành phố Thủ Đức",
            "province_name": "Thành phố Hồ Chí Minh"
          },
          {
            "deadline": "2024-03-02 07:19:37",
            "status": null,
            "ward_name": "Phường 9",
            "district_name": "Quận Phú Nhuận",
            "province_name": "Thành phố Hồ Chí Minh"
          },
          {
            "deadline": "2024-12-30 15:00:47",
            "status": "Not start",
            "ward_name": "Phường An Bình",
            "district_name": "Thành phố Dĩ An",
            "province_name": "Bình Dương"
          },
          {
            "deadline": "2024-12-30 15:00:47",
            "status": "Not start",
            "ward_name": "Phường Dĩ An",
            "district_name": "Thành phố Dĩ An",
            "province_name": "Bình Dương"
          },
          {
            "deadline": "2025-12-01 16:00:00",
            "status": "Done",
            "ward_name": "Phường Tăng Nhơn Phú A",
            "district_name": "Thành phố Thủ Đức",
            "province_name": "Thành phố Hồ Chí Minh"
          }
        ]
      }
    ]
  },
  "message": "Technical statistics retrieved successfully"
}
```

##### 5.2.2.2 Yêu cầu không thành công
###### 5.2.2.2.1 Tài khoản không có quyền admin
```json
{
    "status": "Failed",
    "message": "Permission denied: Admin role required",
    "status_code": 403
}
```
###### 5.2.2.2.2 Không tìm thấy dữ liệu
```json
{
    "status": "Error",
    "message": "No technical statistics found",
    "status_code": 404
}
```
***Trong đó:***
- `status`: Trạng thái của yêu cầu.
- `message`: Thông điệp mô tả kết quả của yêu cầu.

### 5.3 Lưu ý
- API yêu cầu token hợp lệ trong header để xác thực danh tính người dùng.
- Cần phải là tài khoản có quyền admin thì mới xem được các thông tin trả về từ API này.

