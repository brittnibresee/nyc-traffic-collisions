
// Create our map
var myMap = L.map("map", {
    center: [40.730610, -73.935242],
    zoom: 10
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors'
}).addTo(myMap);


// Fetch from SQL database
// d3.json('http://127.0.0.1:5000/data').then(function(data) {
d3.json('/data').then(function(data) {
    d3.json('/boroughs').then(function(boroughs){
    
        console.log(data);
        console.log(boroughs);

        // Create a layer for the boroughs polygons
        function boroughPolygons(){
            let features = boroughs['features'];
            let geojsonLayer = L.geoJSON(features,{
            'style': {'color': 'gold'}
            })
            geojsonLayer.addTo(myMap)
        }
        boroughPolygons()

        // Create a new marker cluster group.
        function createMarkers(){
            let markerClusters = L.markerClusterGroup();
            data.forEach((collision) => {
                if (collision.latitude != null){
                    var markers = L.marker([collision.latitude, collision.longitude], {
                        draggable: false,
                    });

                    markers.bindPopup(`No. of Persons Injuried: ${collision.number_of_persons_injured} <br> 
                                    No. of Persons Killed: ${collision.number_of_persons_killed} <br> 
                                    Crash Date: ${moment(collision.crash_date).format("dddd, MMMM Do YYYY")} <br> 
                                    Crash Time: ${collision.crash_time}`)
                    markerClusters.addLayer(markers)
                }
            })
            myMap.addLayer(markerClusters);
        }
        createMarkers()

        // Create bar chart
        let borough_names = ['STATEN ISLAND', 'BROOKLYN', 'QUEENS', 'BRONX', 'MANHATTAN'];

        function boroughCount(borough_name){
            let count = 0;

            data.forEach((collision) => {
                if (collision.borough == borough_name){
                    count += 1;
                };
            });
            return count;
        };

        let countStaten = boroughCount("STATEN ISLAND");
        let countBrooklyn = boroughCount("BROOKLYN");
        let countQueens = boroughCount("QUEENS");
        let countBronx = boroughCount("BRONX");
        let countManhattan = boroughCount("MANHATTAN");

        let countArray = [countStaten, countBrooklyn, countQueens, countBronx, countManhattan]

        console.log(countArray)

        var barData = [{
            type: 'bar',
            x: borough_names,
            y: countArray
        }];
        var barLayout = {
            title: "Borough Collisions- Feb. 2023",
            yaxis: {title: "Number of Collisions", showgrid: false}, 
            font: {
                color: "white"
            },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)'
        };
        Plotly.newPlot("bar", barData, barLayout);

        // Create line chart
        function injuryCount(data, hour) {
            var ppl_i = 0;
            var ppl_k = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].crash_time == hour) {
                    ppl_i += data[i].number_of_persons_injured;
                    ppl_k += data[i].number_of_persons_killed;
                }
            }
            return [ppl_i, ppl_k];
        };

        var sum_i = []
        var sum_k = []
        for (var i = 0; i < 24; i++) {
            sum_i[i] = injuryCount(data, i)[0];
            sum_k[i] =injuryCount(data, i)[1]
        }

        var trace_i = {
            x: [...Array(24).keys()],
            y: sum_i,
            type: 'line', 
            name: 'Persons injured', 
            marker: {
                color: "orange"
            }      
        }

        var trace_k = {
            x: [...Array(24).keys()],
            y: sum_k,
            type: 'line', 
            name: 'Persons killed', 
            marker: {
                color: "red"
            }
        }
        data = [trace_i, trace_k]

        var line_layout = {
            title: "Injuries/Kills at Each Hour of the Day - Feb. 2023",
            xaxis: {
                title: "Hour", 
                range: [0, 24],
                showgrid: false,
                zeroline: false
            }, 
            yaxis: {
                title: "Number of Persons", 
                autorange: true,
                showgrid: false
            },
            font: {
                color: "white"
            },
            paper_bgcolor:'rgba(0,0,0,0)',
            plot_bgcolor:'rgba(0,0,0,0)'
        };
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("line", data, line_layout);  
    });
});

function zoomMap(event, userInput) {
    console.log(userInput);
    // update map configuration object with new center and zoom values
    let latLng=userInput.split(', ')
    myMap.setView([parseFloat(latLng[0]), parseFloat(latLng[1])], 20);

    // toggle "active" class on element that triggered event
    event.currentTarget.classList.add("active");
}
