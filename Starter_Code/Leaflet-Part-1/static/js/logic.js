let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Fetch data and log to console
d3.json(url).then(function (leaflet) {
    console.log(leaflet);
});

//Map that plots all the earthquake from dataset based on their longitude and latitude
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [streets]
});

let baseMaps = {
    "streets": streets
};

let earthquake_data = newL.LayerGroup();
let tectonics = newL.LayerGroup();

let overlays = {
    "Earthquakes": earthquake_data,
    "Tectonic Plates": tectonics   
};

L.control.layers(baseMaps, overlays).addTo(myMap);

function styleInfo(feature) {
    return {
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: chooseRadius(feature.properties.mag),
        fillcolor: chooseColor(feature.geometry.coordinates[2])
    }
};

function chooseColor(depth) {
    if (depth <= 15) return "red";
    else if (depth > 15 & depth <= 35) return "pink"
    else if (depth > 35 & depth <= 55) return "yellow"
    else if (depth > 55 & depth <= 75) return "blue"
    else if (depth > 75 & depth <= 95) return "orange"
    else return "green"
};

function chooseRadius(magnitude) {
    return magnitude+5;
};



