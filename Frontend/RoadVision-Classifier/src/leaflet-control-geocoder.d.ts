declare module 'leaflet-control-geocoder' {
    import 'leaflet';
  
    export interface GeocoderOptions {
      defaultMarkGeocode?: boolean;
    }
  
    export interface Geocoder {
      new (options?: GeocoderOptions): any;
    }
  
    export function geocoder(options?: GeocoderOptions): Geocoder;
  }
  