import { findOcc } from "./modules/utilities.js"

const dataviz = d3.select('body').append('div').attr('id', 'grafiek') //element toevoegen aan body voor de grafiek
const datavizFruit = d3.select('body').append('div').attr('id', 'grafiekFruit')
const URL = 'https://www.fruityvice.com/api/fruit/all' //URL naar de API

/**
 * @description Ophalen van de data met d3.json
 * @param {*} URL Link naar de API
 * @returns JSON object van de API
 */
async function getFamilies(URL) {
  try {
    const data = await d3.json(URL)
    console.table(data)
    console.log(findOcc(data, 'family'))
    return findOcc(data, 'family')
  } catch (error) {
    console.log(error)
  }
}

// Defineren van variabelen voor de margin, hoogte en breedte
const margin = {t: 30, r: 30, b: 70, l:60}
const width = 460 - margin.l - margin.r
const height = 400 - margin.t - margin.b

//grafiek margin
const MARGIN_FRUIT = {top: 30, bottom: 70, left: 60, right: 30};
const WIDTH_NAME = 560 - MARGIN_FRUIT.left - MARGIN_FRUIT.right;
const HEIGHT_VALUE = 400 - MARGIN_FRUIT.top - MARGIN_FRUIT.bottom;

// Creates sources <svg> element
const SVG_ELEMENT = d3.select('body').append('svg')
.attr('width', WIDTH_NAME+MARGIN_FRUIT.left+MARGIN_FRUIT.right)
.attr('height', HEIGHT_VALUE+MARGIN_FRUIT.top+MARGIN_FRUIT.bottom);

// Group used to enforce margin
const g = SVG_ELEMENT.append('g')
.attr('transform', `translate(${MARGIN_FRUIT.left},${MARGIN_FRUIT.top})`);

// Global variable for all data
let dataFruitName;

async function getData(URL) {
  try {
    dataFruitName = await d3.json(URL)
    console.table(dataFruitName)
    await update(dataFruitName);
    return (dataFruitName)
  } catch (error) {
    console.log(error)
  }
}

async function render(data) {
//SVG defineren zodat we deze kunnen aanroepen, vervolgens maken we een groep aan met een transform
const SVG = dataviz
.append('svg')
  .attr("height", height + margin.l + margin.r)
  .attr("width", width + margin.t + margin.b)
  .style('border', '1px solid black')
.append('g')
  .attr('transform', `translate(${margin.l}, ${margin.t})`);


const x = d3.scaleBand()
  .range([0, width])
  .domain(await data.map(d => d.family))
  .padding(0.2);
SVG.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll('text')
    .attr('transform', `translate(-10,0)rotate(-45)`)
    .style('text-anchor', "end")
    .style('color', 'red');

const AANTALEN = d3.scaleLinear()
  // .domain(d3.extent(data, d => d.aantal))
  .domain([0, d3.max(data, d=> {return d.aantal})]) //Domain aan te passen om een min waarde van 0 te accepteren
  .range([height, 0])
  
SVG.append('g')
      .call(
        d3.axisLeft(AANTALEN)
          .ticks(7) //hardmatige aantal voor correcte aantal ticks
          .tickFormat(d3.format('.0f')) //tick formaat om de decimalen weg te halen
          
      );

SVG.selectAll('rect')
  .data(await data)
  .join('rect')
    .attr('x', d => x(d.family))
    .attr('y', d => AANTALEN(d.aantal))
    .attr('width', x.bandwidth())
    .attr('height', d => height - AANTALEN(d.aantal))
    .style('fill', 'purple')
.transition()
    .duration(4000)
    .style("fill", "red")
    .transition()
    .duration(4000)
    .style("fill", "red")
}
//

/**
 * second chart with enter, update and exit
 */

 async function update(new_data) {
 // const SVG = SVG_ELEMENT
dataviz
.select('id', 'grafiek-fruitnames')
  .attr("height", HEIGHT_VALUE + MARGIN_FRUIT.left + MARGIN_FRUIT.right)
  .attr("width", WIDTH_NAME + MARGIN_FRUIT.top + MARGIN_FRUIT.bottom)
  .style('border', '1px solid red')
//g.append('g')
  .attr('transform', `translate(${MARGIN_FRUIT.left}, ${MARGIN_FRUIT.top})`);

  const x = d3.scaleBand()
  .range([0, WIDTH_NAME])
  .domain(await new_data.map(d => d.name))
  .padding(0.2);
//g.append('g')
  SVG_ELEMENT.attr('transform', `translate(0, ${HEIGHT_VALUE})`)
  .call(d3.axisBottom(x))
  .selectAll('text')
    .attr('transform', `translate(-10,0)rotate(-45)`)
    .style('text-anchor', "end")
    .style('color', '#058D18');


    //update the scales
    const AANTALEN = d3.scaleLinear()
  // .domain(d3.extent(data, d => d.aantal))
  .domain([0, d3.max(new_data, d=> {return d.nutritions.carbohydrates})]) //Domain aan te passen om een min waarde van 0 te accepteren
  .range([HEIGHT_VALUE, 0])
//SVG.append('g')
//g.append('g')
     g .call(
        d3.axisLeft(AANTALEN)
          .ticks() //hardmatige aantal voor correcte aantal ticks
          .tickFormat(d3.format('.0f')) //tick formaat om de decimalen weg te halen
      );
  

  // Render the chart with new data
      const rect = g.selectAll('rect').data(new_data, (d) => d.name).join(

    // ENTER 
    // new elements
    (enter) => {
      const rect_enter = enter.append('rect').attr('y', 0);
      rect_enter.append('title');
      return rect_enter;
    },
    // UPDATE
    // update existing elements
    (update) => update,
    // EXIT
    // elements that aren't associated with data
    (exit) => exit.remove()
  );

  rect
    .attr('x', d => x(d.name))
    .attr('y', d => AANTALEN(d.nutritions.carbohydrates))
    .attr('width', x.bandwidth())
    .attr('height', d => HEIGHT_VALUE - AANTALEN(d.nutritions.carbohydrates))
    .style('fill', '#ffcc00')

    rect.selectAll('text').text((d) => d.name);
}

//interactivity
d3.select('#show-animate').on('click', async function() {
  // This will be triggered when the user selects or unselects the checkbox
  const checked = d3.select(this).property('checked');
  if (checked === true) {
    // Checkbox was just checked

// fruit weergeven van de family rosaceae 
  const filtered_data = dataFruitName.filter((d) => d.family === 'Rosaceae');

    console.log(filtered_data,'hi')

    update(filtered_data);  // Update the chart with the filtered data
  } else {
    // Checkbox was just unchecked
    update(dataFruitName);  // Update the chart with all the data we have
  }
});

update(await getData(URL))

render(await getFamilies(URL))