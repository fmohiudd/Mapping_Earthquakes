// Add console.log to see if our code is working on Chrome
console.log("working");

// Create the map object with a center and zoom level.
// Method 1
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // other mapbox id: mapbox/outdoors-v11, mapbox/light-v10, mapbox/dark-v10, 
    // mapbox/satellite-v9, mapbox/satellite-streets-v11
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// We create the DARK tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps. 
let baseMaps = {
    Street: light,
    Dark: dark,
};
// // Then we add our 'streets' tile layer to the map.
// streets.addTo(map);

//  Method 2
// Create the map object with a center, zoom level and default layer to Toronto.
let map = L.map("mapid", {
    center: [40, -80],
    zoom: 2,
    layers: [dark]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/fmohiudd/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1", 
    weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        // color: "#ffffa1",
        // weight: 2,
        onEachFeature:function(feature, layer) {
            console.log(layer);
            layer
            .bindPopup("<h2>Airline: " + feature.properties.airline + "</h2> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
        // },

        },
    }).addTo(map);
});



// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data, {
//         onEachFeature:function(feature, layer) {
//             console.log(layer);
//             layer
//             .bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");
//         },
//     }).addTo(map);
// });


// // Grabbing our GeoJASON data.
// d3.json(airportData).then(function(data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data).addTo(map);
// });



// To add multiple markers:the lat and log are nested in an array
// We need to iterate through the array and add each lat & long.

//Get data from cities.js
// let cityData = cities;


// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     // L.marker(city.location)
//     // .bindPopup("<h2>" + city.city + ", " + city.state +  "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     // .addTo(map)

//     // Add a circle marker with city population as the circle size.
//     L.circleMarker(city.location, {
//         radius: city.population/100000
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state +  "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map)
// });

