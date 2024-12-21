# DOCUMENT DATA SERVICE
## 1. Chức năng
Dùng để thực hiện các chức liên quan dữ liệu của ứng dụng
## 2. Các API cung cấp
<details>
  <summary><strong>ENDPOINT POST /datasvc/api/uploadImage</strong></summary>

## 2.1 Công dụng
Upload hình ảnh đường lên để phân loại chất lượng mặt đường.

## 2.2 Cách sử dụng

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

### Responses

| Status Code | Message                   | Description                             |
|-------------|---------------------------|-----------------------------------------|
| `200`       | Image uploaded successfully|      upload successfully                                 |
| `400`       | Bad Request                | Missing or invalid parameters.          |
| `401`       | Unauthorized               | Invalid or missing Bearer token.       |
| `500`       | Internal Server Error      | Server encountered an error processing the request. |

</details>

