// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");

var fillTable = (dataInput) => {
    
    dataInput.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
    });
});
}

fillTable(data);


var button = d3.select("#filter-btn");
var form = d3.select("#form");

button.on("click", runEnter);
form.on("submit", runEnter);

function runEnter() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    var filteredData = data.filter(sighting => sighting.datetime === inputValue);

    console.log(filteredData);

    tbody.html("");

    let response = {
        filteredData
    }

    if (response.filteredData.length !== 0) {
        fillTable(filteredData);
    }
        else {
            tbody.append("tr").append("td").text("No results found.");
        }
    
      
   
};

