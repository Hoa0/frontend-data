const DATAVIZ = d3.select("body").append("div").attr("id", "grafiek");
const URL = "https://www.fruityvice.com/api/fruit/all"; //URL naar de API

/**
 * position bar-chart
 */
const MARGIN = { top: 40, bottom: 10, left: 40, right: 40 };
const WIDTH = 800 - MARGIN.left - MARGIN.right;
const HEIGHT = 600 - MARGIN.top - MARGIN.bottom;
//const G =DATAVIZ.append('g')

// Global variable for all data
let dataFruitName;

async function getData(URL) {
  try {
    dataFruitName = await d3.json(URL);
    console.table(dataFruitName);
    // await update(dataFruitName);
    return dataFruitName;
  } catch (error) {
    console.log(error);
  }
}

const SVG = d3
  .select("#grafiek")
  .append("svg")
  .attr("height", HEIGHT + MARGIN.left + MARGIN.right)
  .attr("width", WIDTH + MARGIN.top + MARGIN.bottom)
  .style("border", "1px solid black")
  .append("g")
  .attr("class", "graph")
  .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top - 15})`);

const x = d3
  .scaleBand()
  .range([0, WIDTH])
  .padding(0.2);

const AANTALEN = d3
  .scaleLinear()
  .range([HEIGHT, 0]);

// //setup axis
// const xaxis = d3.axisBottom(xscale)
// const group_xaxis = SVG.append('g').attr('class', 'x axis')
//   group_xaxis.attr('transform', `translate(0, ${dimensions.height})`)
const xas = d3.axisBottom(x)
const X_SCHAAL = SVG.append('g').attr("class", "x-scale").attr("transform", `translate(0, ${HEIGHT})`)

const yas = d3.axisLeft(AANTALEN)
const AANTALEN_SCHAAL = SVG.append('g').attr('class', 'y-as')
// const yaxis = d3.axisLeft(yscale)
// const group_yaxis = SVG.append('g').attr('class', 'y axis')


async function update(data) {
  x.domain(await data.map((d) => d.name))
  AANTALEN.domain([0, d3.max(data, (d) => { return d.nutritions.carbohydrates})])

  X_SCHAAL.transition().call(xas)
    .selectAll("text")
    .attr("transform", `translate(-10,0)rotate(-45)`)
    .style("text-anchor", "end")
    .style("color", "red")

  AANTALEN_SCHAAL.transition().call(yas)
    // .ticks() //hardmatige aantal voor correcte aantal ticks
    // .tickFormat(d3.format(".0f")) //tick formaat om de decimalen weg te halen

  const bars = SVG.selectAll("rect")
    .data(data)
    .join(
      enter => enter.append('rect'),
      update => update.style('fill','#DC5A41'),
      exit => exit.remove()
    );

  bars
    .transition()
    .attr("x", (d) => {
      return x(d.name);
    })
    .attr("width", x.bandwidth())
    .attr("y", (d) => {
      return AANTALEN(d.nutritions.carbohydrates);
    })
    .style("fill", "pink")
    .attr("height", (d) => {
      return HEIGHT - AANTALEN(d.nutritions.carbohydrates);
    });
}

//interactivity
d3.select("#show-animate").on("click", function () {
  // This will be triggered when the user selects or unselects the checkbox
  const checked = d3.select(this).property("checked");
  if (checked === true) {
    // Checkbox was just checked

    // fruit weergeven van de family rosaceae
    const filtered_data = dataFruitName.filter((d) => d.family === "Rosaceae");

    console.log(filtered_data, "updated");
    
    update(filtered_data); // Update the chart with the filtered data
  } else {
    // Checkbox was just unchecked
    update(dataFruitName); // Update the chart with all the data we have
  }
});

update(await getData(URL));
