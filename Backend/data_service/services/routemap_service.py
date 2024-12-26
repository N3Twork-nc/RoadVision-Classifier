import numpy as np
from sklearn.cluster import DBSCAN

# Danh sách tọa độ và khu vực tương ứng
coordinates_with_areas = [
    (10.7769, 106.7009, "Area 1"),
    (10.7771, 106.7012, "Area 1"),
    (10.8204, 106.6301, "Area 2"),
    (10.7767, 106.7008, "Area 1"),
    (10.7762, 106.7004, "Area 1"),
    (10.8205, 106.6303, "Area 2"),
    (10.8154, 106.6807, "Area 3"),
    (10.8155, 106.6809, "Area 3"),
    (10.8200, 106.6900, "Area 3"),
    (11.7767, 108.7008, "Area 1"),
    (11.7768, 108.7002, "Area 1"),
]

# Gom các tọa độ theo khu vực
area_groups = {}
for coord in coordinates_with_areas:
    lat, lon, area = coord
    if area not in area_groups:
        area_groups[area] = []
    area_groups[area].append((lat, lon))

# Khởi tạo kết quả cuối cùng
final_routes = {}

# Áp dụng DBSCAN trong từng khu vực
for area, coords in area_groups.items():
    coords_np = np.array(coords)
    db = DBSCAN(eps=0.001, min_samples=2).fit(coords_np)
    labels = db.labels_
    
    # Gom các tọa độ theo cụm
    routes = {}
    for label, coord in zip(labels, coords):
        if label not in routes:
            routes[label] = []
        routes[label].append(coord)
    
    # Loại bỏ nhiễu (nếu có)
    routes = {label: route for label, route in routes.items() if label != -1}
    
    # Lưu kết quả cho từng khu vực
    final_routes[area] = routes

# Hiển thị kết quả
print("Các route theo khu vực:")
for area, routes in final_routes.items():
    print(f"Khu vực {area}:")
    for route_id, route_coords in routes.items():
        print(f"  Route {route_id}: {route_coords}")
