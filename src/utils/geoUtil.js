import L from "leaflet"
export default {
    calDistance:(p1,p2)=>{
       let p1xy= L.Projection.SphericalMercator.project({lat:p1.lat,lng:p1.lng});
       let p2xy= L.Projection.SphericalMercator.project({lat:p2.lat,lng:p2.lng});
      return Math.sqrt((Math.abs(p1xy.x-p2xy.x)**2)+(Math.abs(p1xy.y-p2xy.y)**2));
    }
}