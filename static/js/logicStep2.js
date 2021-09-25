// Add console.log to see if our code is working on Chrome
console.log("working");

// Create the map object with a center and zoom level.
// Method 1
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // other mapbox id: mapbox/outdoors-v11, mapbox/light-v10, mapbox/dark-v10, 
    // mapbox/satellite-v9, mapbox/satellite-streets-v11
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// We create the DARK tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps. 
let baseMaps = {
    "Streets": streets,
    "SatelliteStreets": satelliteStreets
};
// // Then we add our 'streets' tile layer to the map.
// streets.addTo(map);

//  Method 2
// Create the map object with a center, zoom level and default layer to Toronto.
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
// let torontoHoods = "https://raw.githubusercontent.com/fmohiudd/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
// let myStyle = {
//     color: "#ffaaff", 
//     weight: 1
// };
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
//     // console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data).addTo(map);
// });

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calcualte the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(),
        stroke: true,
        weight: 0.5
    };
}
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Createing a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    //We turn each feature into a circleMaker on the map.

pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.circleMarker(latlng);

},
style: styleInfo

}).addTo(map);
});



