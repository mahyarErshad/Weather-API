'use strict';


export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function async (position){
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // console.log(lat, lng);
            return {lat, lon};
        });
    } else {
        alert("Geolocation is not available");
    }
}
