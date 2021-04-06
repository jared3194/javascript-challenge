// assign the data.js in the data folder to a variable 
var tableData = data;

// get the tebody html element and store in a variable
var tbody = d3.select("tbody");

// create a function that will populate our html table with data from the data.js file
var fillTable = (dataInput) => {

    dataInput.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

// Use the fillTable function to populate our page with complete dataset from data.js
fillTable(tableData);

// create variables for filter button, reset button, and the form
var button = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");
var form = d3.select("#form");

// set up event listeners to run specific function when a button is click or a form is submitted
button.on("click", runEnter);
resetButton.on("click", resetTable)
form.on("submit", runEnter);

// Create funtion to filter by each category date, city, state, country, and shape

function runEnter() {
    d3.event.preventDefault();
    var dateInput = d3.select("#datetime");
    var cityInput = d3.select("#city");
    var stateInput = d3.select("#state");
    var countryInput = d3.select("#country");
    var shapeInput = d3.select("#shape");
    var filteredData = tableData.filter(sighting => {
        return (sighting.datetime === dateInput.property("value") || !dateInput.property("value")) &&
            (sighting.city === cityInput.property("value") || !cityInput.property("value")) &&
            (sighting.state === stateInput.property("value") || !stateInput.property("value")) &&
            (sighting.country === countryInput.property("value") || !countryInput.property("value")) &&
            (sighting.shape === shapeInput.property("value") || !shapeInput.property("value"))
    });

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

// Create function to reset our table with original unfiltered data.
function resetTable() {
    tbody.html("");
    fillTable(tableData);
}




