import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import './map.css';

declare module 'leaflet' {
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
  const [searchLocation, setSearchLocation] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [10.762622, 106.660172],
      zoom: 14,
    });

    leafletMap.current = map;

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = L.latLng(latitude, longitude);
        map.setView(currentLocation, 14);
        L.marker(currentLocation).addTo(map).bindPopup('Vị trí hiện tại của bạn').openPopup();
      });
    }

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
          L.marker(center).addTo(leafletMap.current!).bindPopup(location).openPopup();
        }
      } else {
        alert('Không tìm thấy vị trí.');
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
          waypoints: [L.latLng(startCoords.lat, startCoords.lng), L.latLng(endCoords.lat, endCoords.lng)],
          routeWhileDragging: true,
        }).addTo(leafletMap.current!);

        setRoutingControl(newRoutingControl);
      });
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.header}>Tìm kiếm địa điểm</h2>
        {!isRouteInputVisible ? (
          <>
            <div style={styles.inputGroup}>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                placeholder="Nhập vị trí cần tìm"
                style={styles.input}
              />
              <ul style={styles.suggestions}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearchLocation(suggestion.name);
                      setSuggestions([]);
                      searchForLocation(suggestion.name);
                    }}
                    style={styles.suggestionItem}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
              <button onClick={() => searchForLocation(searchLocation)} style={styles.button}>
                Tìm kiếm
              </button>
            </div>
            <button onClick={() => setIsRouteInputVisible(true)} style={styles.secondaryButton}>
              Nhập điểm bắt đầu/kết thúc
            </button>
          </>
        ) : (
          <>
            <div style={styles.inputGroup}>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Điểm bắt đầu"
                style={styles.input}
              />
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="Điểm kết thúc"
                style={styles.input}
              />
              <button onClick={findRoute} style={styles.button}>
                Tìm đường đi
              </button>
            </div>
            <button
              onClick={() => {
                setIsRouteInputVisible(false);
                setStartLocation('');
                setEndLocation('');
                if (routingControl) {
                  routingControl.remove();
                  setRoutingControl(null);
                }
              }}
              style={styles.secondaryButton}
            >
              Quay lại
            </button>
          </>
        )}
      </div>
      <div ref={mapRef} style={styles.map} />
    </div>
  );
};

export default Map;



const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    width: '30%',
    padding: '20px',
    background: '#f8f9fa',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '10px',
    borderBottom: '2px solid #dee2e6',
    paddingBottom: '5px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  secondaryButton: {
    padding: '10px',
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  map: {
    flex: 1,
  },
  suggestions: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    border: '1px solid #ced4da',
    borderRadius: '5px',
    backgroundColor: '#fff',
    maxHeight: '150px',
    overflowY: 'auto',
  },
  suggestionItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #dee2e6',
  },
};
