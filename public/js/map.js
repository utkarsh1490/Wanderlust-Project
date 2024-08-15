mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25,closeButton:false}).setHTML("<p style='margin : 0;'>Exact location will be provided after booking"))
    .addTo(map);

const markerElement = marker.getElement();
markerElement.addEventListener('mouseenter', () => {
    marker.getPopup().addTo(map);
});
markerElement.addEventListener('mouseleave', () => {
    marker.getPopup().remove();
});