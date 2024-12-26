from geopy.geocoders import Nominatim

def get_district_nominatim(lat, lon):
    geolocator = Nominatim(user_agent="21522613@gm.uit.edu.vn")
    location = geolocator.reverse((lat, lon), language="vi")
    print (location)
    if location:
        address = location.raw.get('address', {})
        print(address)
        district = address.get('county', address.get('city',None))')
        return district
    else:
        return "Lỗi khi lấy dữ liệu"

# Ví dụ với tọa độ Hà Nội
latitude = 10.042232
longitude =105.269112

district = get_district_nominatim(latitude, longitude)
print(f"Tọa độ ({latitude}, {longitude}) thuộc quận/huyện: {district}")