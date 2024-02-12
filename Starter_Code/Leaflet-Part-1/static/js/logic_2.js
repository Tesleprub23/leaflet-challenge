let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [streets]
});
streets.addTo(myMap)
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data){
    function styleInfo(feature){
        return{
            opacity: 1,
            fillOpacity: 1,
            color: chooseColor(feature.geometry.coordinates[2]),
            radius: chooseRadius(feature.properties.mag),
            fillcolor: chooseColor(feature.geometry.coordinates[2]),
            stroke: true,
            weight: 0.5,
        };
    }
    function chooseColor(depth) {
        if (depth <= 15) return "red";
        else if (depth > 15 & depth <= 35) return "pink"
        else if (depth > 35 & depth <= 55) return "yellow"
        else if (depth > 55 & depth <= 75) return "blue"
        else if (depth > 75 & depth <= 95) return "orange"
        else return "green"
    };
    function chooseRadius(magnitude) {
        if (magnitude == 0){
            return 1;
        }
        return magnitude * 4
    }
    L.geoJson (data, {
        pointToLayer: function(feature, latitude){
            return L.circleMarker(latitude);
        },
    
    style: styleInfo,
    onEachFeature: function(feature, layer) { 
        layer.bindPopup( 
            "Magnitude:"
            + feature.properties.mag
            + "<br>Depth: " 
            + feature.geometry.coordinates[2] 
            + "<br>Location: " 
            + feature.properties.place 
        );   
    }}).addTo(myMap);


// Set up the legend.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  let labels = [];
  let grades = [-10, 10, 30, 50, 70, 90];
  let colors = [
    "#98EE00",
    "#D4EE00",
    "#EECC00",
    "#EE9C00",
    "#EA822C",
    "#EA2C2C"

  ];

    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
        + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
};

      legend.addTo(myMap);

});