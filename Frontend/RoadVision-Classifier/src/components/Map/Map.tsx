import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [isRouteInputVisible, setIsRouteInputVisible] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [10.762622, 106.660172], // Tọa độ mặc định (TP.HCM)
      zoom: 14,
    });

    // Lưu tham chiếu bản đồ
    leafletMap.current = map;

    // Thêm lớp bản đồ TileLayer
    const key = '9CPtNtP8hRSOoBHJXppf';
    L.tileLayer(
      `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
          '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        crossOrigin: true,
      }
    ).addTo(map);

    // Tự động định vị vị trí hiện tại khi khởi động
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = L.latLng(latitude, longitude);
        map.setView(currentLocation, 14);
        L.marker(currentLocation).addTo(map).bindPopup('Vị trí hiện tại của bạn').openPopup();
      });
    }

    return () => {
      map.remove(); // Xóa bản đồ khi component unmount
    };
  }, []);

  const searchForLocation = () => {
    if (!searchLocation) return;

    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(searchLocation, (results: any) => {
      if (results.length > 0) {
        const { center } = results[0];
        if (leafletMap.current) {
          leafletMap.current.setView(center, 14);
          L.marker(center).addTo(leafletMap.current!).bindPopup(searchLocation).openPopup();
        }
      } else {
        alert('Không tìm thấy vị trí.');
      }
    });
  };

  const findRoute = () => {
    if (!startLocation || !endLocation) return;

    if (routingControl) {
      routingControl.remove();
    }

    const geocoder = L.Control.Geocoder.nominatim();

    geocoder.geocode(startLocation, (resultsStart: any[]) => {
      if (resultsStart.length === 0) return;

      const startCoords = resultsStart[0].center;

      geocoder.geocode(endLocation, (resultsEnd: any[]) => {
        if (resultsEnd.length === 0) return;

        const endCoords = resultsEnd[0].center;

        const newRoutingControl = L.Routing.control({
          waypoints: [L.latLng(startCoords.lat, startCoords.lng), L.latLng(endCoords.lat, endCoords.lng)],
          routeWhileDragging: true,
        }).addTo(leafletMap.current!);

        setRoutingControl(newRoutingControl);
      });
    });
  };

  return (
    <div className="map-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="controls" style={{ padding: '10px', background: '#fff', zIndex: 1000 }}>
        {!isRouteInputVisible ? (
          <>
            <div className="input-container" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Tìm kiếm địa điểm"
                style={{ flex: 1, padding: '8px' }}
              />
              <button onClick={searchForLocation} style={{ padding: '8px 12px' }}>
                Tìm kiếm
              </button>
            </div>
            <button onClick={() => setIsRouteInputVisible(true)} style={{ padding: '8px 12px' }}>
              Hiển thị nhập điểm
            </button>
          </>
        ) : (
          <>
            <div className="input-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Nhập điểm đầu"
                style={{ padding: '8px' }}
              />
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="Nhập điểm cuối"
                style={{ padding: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={findRoute} style={{ padding: '8px 12px' }}>
                Tìm đường
              </button>
              <button onClick={() => setIsRouteInputVisible(false)} style={{ padding: '8px 12px' }}>
                Quay lại tìm kiếm
              </button>
            </div>
          </>
        )}
      </div>
      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  );
};

export default Map;
