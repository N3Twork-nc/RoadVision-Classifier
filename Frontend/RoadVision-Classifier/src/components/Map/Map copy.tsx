import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import "./map.css"; // Import CSS file
import dataService from "../../services/data.service";

declare module "leaflet" {
  namespace Control {
    class Geocoder {
      static nominatim(): any;
      geocode(query: string, callback: (results: any[]) => void): void;
    }
  }
}

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [isRouteInputVisible, setIsRouteInputVisible] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routingControl, setRoutingControl] =
    useState<L.Routing.Control | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [roadsData, setRoadsData] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<string>("");
  const [path, setPath] = useState<[number, number][]>([]);

  // Determine marker color based on road level
  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [10.762622, 106.660172],
      zoom: 14,
    });

    leafletMap.current = map;

    const key = "9CPtNtP8hRSOoBHJXppf";
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = L.latLng(latitude, longitude);
        map.setView(currentLocation, 14);
        L.marker(currentLocation)
          .addTo(map)
          .bindPopup("Vị trí hiện tại của bạn")
          .openPopup();
      });
    }
    const fetchRoadsData = async () => {
      try {
        const data = await dataService.getInfoRoads({});

        if (Array.isArray(data)) {
          if (data.length > 0) {
            const roads = data.map((item: string) => JSON.parse(item));
            console.log("Dữ liệu đường:", roads);

            setRoadsData(roads);

            roads.forEach(async (road: any) => {
              const { latitude, longitude, filepath, level } = road;
              let markerColor;
              switch (road.level) {
                case "Good":
                  markerColor = "green";
                  break;
                case "Poor":
                  markerColor = "yellow";
                  break;
                case "Very poor":
                  markerColor = "red";
                  break;
                case "Satisfactory":
                  markerColor = "blue";
                  break;
                default:
                  markerColor = "gray";
              }
              const customIcon = L.divIcon({
                className: "",
                html: `
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="${markerColor}">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>
              `,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
              });
              const fullImageUrl = `http://192.168.120.26/${filepath}`;
              try {
                const marker = L.marker([latitude, longitude], {
                  icon: customIcon,
                }).addTo(leafletMap.current!);
                marker.bindPopup(`
                  <div>
                    <p><b>Road status:</b> ${level}</p>
                    <p><b>Lat:</b> ${latitude}</p>
                    <p><b>Long:</b> ${longitude}</p>
                    <img src="${fullImageUrl}" alt="Ảnh đường" style="width: 100px; height: auto;" />
                  </div>
                `);
              } catch (error) {
                console.error(
                  `Lỗi khi lấy thông tin tên đường tại tọa độ (${latitude}, ${longitude}):`,
                  error
                );
              }
            });
          } else {
            console.error("Dữ liệu không hợp lệ, mảng rỗng:", data);
          }
        } else {
          console.error("Dữ liệu không phải mảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đường:", error);
      }
    };

    fetchRoadsData();

    return () => {
      map.remove();
    };
  }, []);

  const searchForLocation = (location: string) => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(location, (results: any) => {
      if (results.length > 0) {
        const { center } = results[0];
        if (leafletMap.current) {
          leafletMap.current.setView(center, 14);
          L.marker(center)
            .addTo(leafletMap.current!)
            .bindPopup(location)
            .openPopup();
        }
      } else {
        alert("Không tìm thấy vị trí.");
      }
    });
  };

  const fetchSuggestions = (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(query, (results: any[]) => {
      setSuggestions(results);
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
          waypoints: [
            L.latLng(startCoords.lat, startCoords.lng),
            L.latLng(endCoords.lat, endCoords.lng),
          ],
          routeWhileDragging: true,
        }).addTo(leafletMap.current!);

        setRoutingControl(newRoutingControl);
      });
    });
  };
  // Cập nhật hàm để hiển thị tuyến đường qua tọa độ
  // Cập nhật hàm để hiển thị tuyến đường qua tọa độ
  // Cập nhật hàm để hiển thị tuyến đường qua tọa độ
  useEffect(() => {
    if (path.length === 0 || !leafletMap.current) return;

    if (routingControl) {
      routingControl.remove();
    }

    const waypoints = path.map(([lat, lng]) => L.latLng(lat, lng));
    const newRoutingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: true,
    }).addTo(leafletMap.current!);

    setRoutingControl(newRoutingControl);
  }, [path]);

  // Hàm cập nhật mảng tọa độ
  const updatePath = () => {
    try {
      const parsedCoordinates = JSON.parse(coordinates);
      if (
        Array.isArray(parsedCoordinates) &&
        parsedCoordinates.every(
          (item) => Array.isArray(item) && item.length === 2
        )
      ) {
        setPath(parsedCoordinates);
      } else {
        alert(
          "Dữ liệu không hợp lệ. Đảm bảo mảng chứa các cặp [latitude, longitude]."
        );
      }
    } catch (error) {
      alert("Lỗi khi phân tích JSON. Vui lòng nhập đúng định dạng.");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Tìm kiếm địa điểm</h2>
        {!isRouteInputVisible ? (
          <>
            <div className="inputGroup">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                placeholder="Nhập vị trí cần tìm"
                className="input"
              />
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchLocation(suggestion.name);
                      setSuggestions([]);
                      searchForLocation(suggestion.name);
                    }}
                    className="suggestionItem"
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => searchForLocation(searchLocation)}
                className="button"
              >
                Tìm kiếm
              </button>
            </div>
            <button
              onClick={() => setIsRouteInputVisible(true)}
              className="secondaryButton"
            >
              Tìm tuyến đường
            </button>
          </>
        ) : (
          <>
            <div className="inputGroup">
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Vị trí bắt đầu"
                className="input"
              />
            </div>
            <div className="inputGroup">
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="Vị trí kết thúc"
                className="input"
              />
            </div>
            <button onClick={findRoute} className="button">
              Tìm đường
            </button>
            <button
              onClick={() => setIsRouteInputVisible(false)}
              className="secondaryButton"
            >
              Hủy
            </button>
          </>
        )}
      </div>
      <div className="inputGroup">
        <textarea
          value={coordinates}
          onChange={(e) => setCoordinates(e.target.value)}
          placeholder="Nhập mảng tọa độ dạng: [[10.762622, 106.660172], [10.773832, 106.660989]]"
          className="textarea"
        ></textarea>
        <button onClick={updatePath} className="button">
          Vẽ đường đi
        </button>
      </div>

      <div ref={mapRef} className="map"></div>
    </div>
  );
};

export default Map;
