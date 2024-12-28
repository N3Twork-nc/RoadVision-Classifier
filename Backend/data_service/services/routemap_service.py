import numpy as np
from sklearn.cluster import DBSCAN
from Database import Postgresql,MongoDB
import os
import inspect
current_file_path = os.path.abspath(__file__)


class RouteMap():
    def __init__(self, area):
        self.area=area
        self.coordinates=[]
        self.final_routes = {}
        self.getCoor()
        self.apply_dbscan()
        
    def getCoor(self):
        try:
            postgres=Postgresql()
            data=postgres.execute(f"SELECT latitude,longitude FROM road WHERE ward_id={self.area}",fetch='all')
            self.coordinates=data
        except Exception as e:
            print(current_file_path, e)
    
    def apply_dbscan(self):
        try:
            coords_np = np.array(self.coordinates)
            coords_np =np.unique(coords_np, axis=0)
            db = DBSCAN(eps=0.00045, min_samples=2).fit(coords_np)
            labels = db.labels_
            routes = {}
            for label, coord in zip(labels, coords_np.tolist()):
                if label not in routes:
                    routes[label] = []
                routes[label].append(coord)
            routes = {label: route for label, route in routes.items() if label != -1}
            routes={str(key): value for key, value in routes.items()}
            mongo=MongoDB()
            mongo.update('route_map', {'_id': self.area},{'$set': {'routes': routes}})
            self.final_routes = routes
        except Exception as e:
            print(current_file_path,inspect.currentframe().f_code.co_name, e)