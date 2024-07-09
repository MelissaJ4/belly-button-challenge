// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    console.log(metadata);
  

    // Filter the metadata for the object with the desired sample number
    let array = metadata.filter(sampleObject => sampleObject.id == sample);
    let result = array[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
  
    for (id in result) {
        panel.append("h6").text(`${id}: ${result[id]}`);
    };
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleField = data.samples;

    // Filter the samples for the object with the desired sample number
    let array = sampleField.filter(sampleObject => sampleObject.id == sample);
    let result = array[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
        // https://plotly.com/javascript/bubble-charts/

        var trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
            color: otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: sample_values
          }
        };
        
        var data = [trace1];
        
        var layout = {
          title: 'Bacteria Cultures Per Sample',
          showlegend: false,
          height: 600,
          width: 800,
          xaxis: {'title': "OTU ID"},
          yaxis: {'title': "Number of Bacteria"}
        };
    // Render the Bubble Chart
    Plotly.newPlot("bubble", data, layout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
   

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
  let xticks = sample_values.slice(0,10).reverse();
  let yticks = otu_ids.slice(0,10).map(id=> `OTU ${id}`).reverse();
  let labels = otu_labels.slice(0,10).reverse();

  let trace2 = {
      x : xticks,
      y : yticks,
      text : labels,
      type: "bar",
      orientation: "h"
    }

    let data2 = [trace2]

    let layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {'title': "Number of bacteria"},

    }
    // Render the Bar Chart
    Plotly.newPlot("bar", data2, layout2);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

  // Get the names field
  let namesField = data.names;

  // Use d3 to select the dropdown with id of `#selDataset`
  let selectNames = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name
    
  for (let id = 0; id < namesField.length; id++) {
    selectNames.append("option").text(namesField[id]).property("value", namesField[id])};

    // Build charts and metadata panel with the first sample
    buildMetadata(namesField[0]);
    buildCharts(namesField[0]);
});
}
// Function for event listener
function optionChanged(array) {
  buildMetadata(array);
  buildChart(array);

};


// Initialize the dashboard

init();
