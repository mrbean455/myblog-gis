import L from "leaflet"
export default {
    calDistance:(p1,p2)=>{
      console.log(L.CRS,'LLLL');
      console.log(L.CRS.project(p1.getLatLng()),'111')
      //  let p1xy= L.CRS.project(p1.getLatLng());
    //    let p2xy= L.CRS.project(p2.getLatLng());
      //  console.log(p1xy)
    }
}