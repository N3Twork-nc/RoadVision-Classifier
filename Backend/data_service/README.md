# DOCUMENT DATA SERVICE
## 1. Chức năng
Dùng để thực hiện các chức liên quan dữ liệu của ứng dụng
## 2. Các API cung cấp
<details>
  <summary><strong><span style="color: blue;">ENDPOINT POST /datasvc/api/uploadRoad</strong></summary>

###  Công dụng
Upload hình ảnh đường lên để phân loại chất lượng mặt đường.

### Headers

| Key            | Value                    | Description                                         |
|----------------|--------------------------|-----------------------------------------------------|
| `accept`       | `application/json`       | Indicates the client accepts JSON responses.        |
| `Authorization`| `Bearer <token>`         | Bearer token for API authentication.                |
| `Content-Type` | `multipart/form-data`    | Specifies the type of data being sent.              |

### Request Parameters

Body in `multipart/form-data` format:

| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| `file`    | File   | Yes      | The image file to upload.                |
| `latitude`| Float  | Yes       | Latitude coordinate for the image.       |
| `longitude`| Float | Yes       | Longitude coordinate for the image.      |

## Responses

| Status Code | Message                   | Description                             |
|-------------|---------------------------|-----------------------------------------|
| `200`       | Image uploaded successfully|      upload successfully                                 |
| `400`       | Bad Request                | Missing or invalid parameters.          |
| `401`       | Unauthorized               | Invalid or missing Bearer token.       |
| `500`       | Internal Server Error      | Server encountered an error processing the request. |
</details>

<details>
  <summary><strong><span style="color: green;">ENDPOINT GET /datasvc/api/getInfoRoads</strong></summary>
 
## công dụng
Lấy thông tin đường đã upload của tất cả user

## Request Parameters

| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| `user_id` |  INT   |  No      | Lấy thông tin đường đã upload của user có id là `user_id`              |
| `id_road` | INT    |  No      | Lây thông tin đường có id là `id_road`   |

Nếu không có parameter thì sẽ lấy toàn bộ thông tin của tất cả các đường của tất cả user

## Responses

| Status Code | Message                   | Description                             |
|-------------|---------------------------|-----------------------------------------|
| `200`       | Get info road successfully| Lấy thông ảnh thành công    |            
| `500`       | Internal Server Error     |Lỗi từ server                |

Kết trả vể thành công sẽ có foramt:
```
{
  "status": "success",
  "data": [
    {
     "id":<id của đường>,
     "user_id":<id user đã upload đường>,
     "filepath":<URL của hình ảnh đường>,
     "latitude":<vĩ độ>,
     "longitude":<kinh độ>,
     "level":<chấtlượng đường>,
     "created_at":<Thời gian đường được upload>
    }
  ]
  "message": "Get info road successfully"
}
```

</details>

<details>
  <summary><strong><span style="color: red;">ENDPOINT DELETE /datasvc/api/deletedRoad</strong></summary>

## Công dụng
Dùng để xóa đường đã upload
##
### Headers

| Key            | Value                    | Description                                         |
|----------------|--------------------------|-----------------------------------------------------|
| `accept`       | `application/json`       | Chấp nhận kiểu dữ liệu trả về        |
| `Authorization`| `Bearer <token>`         | Token của user                |

## Request Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| `id_road` | INT    |  YES      | Id của đường muốn xóa   |



## Responses

| Status Code | Message                   | Description                             |
|-------------|---------------------------|-----------------------------------------|
| `200`       | Road was deleted successfully| xóa đường thành công               |
| `400`       | Bad Request             | Thiếu parameter hoặc sài format request          |
| `401`       | Unauthorized            | Token bị sai                            |
| `403`       | Not authenticated       | Thiếu token                            |
| `404`       | Road not found          | Id đường khồng tồn tạitại                            |
| `500`       | Internal Server Error      | Lỗi từ server                        | 
</details>

