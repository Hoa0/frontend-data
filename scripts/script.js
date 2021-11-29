const DATAVIZ = d3.select('body').append('div').attr('id', 'grafiek') 
const URL = 'https://www.fruityvice.com/api/fruit/all' //URL naar de API

/**
 * position bar-chart
 */
const MARGIN= {top: 40, bottom: 10, left: 120, right: 20};
const WIDTH = 800 - MARGIN.left - MARGIN.right;
const HEIGHT = 600 - MARGIN.top - MARGIN.bottom;
//const G =DATAVIZ.append('g')

// Global variable for all data
let dataFruitName;

async function getData(URL) {
  try {
    dataFruitName = await d3.json(URL)
    console.table(dataFruitName)
   // await update(dataFruitName);
    return (dataFruitName)
  } catch (error) {
    console.log(error)
  }
}

async function update(data) {
  const SVG = d3.select('#grafiek')
  .append('svg')
    .attr("height", HEIGHT + MARGIN.left + MARGIN.right)
    .attr("width", WIDTH + MARGIN.top + MARGIN.bottom)
    .style('border', '1px solid black')
  .append('g')
    .attr('class','graph')
    .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);

  const x = d3.scaleBand()
    .range([0, WIDTH])
    .domain(await data.map(d => d.name))
    .padding(0.2);

  SVG.append('g')
    .attr('class', 'x-scale')
    .attr('transform', `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', `translate(-10,0)rotate(-45)`)
    .style('text-anchor', "end")
    .style('color', 'red');  

     //update the scales
    const AANTALEN = d3.scaleLinear()
  // .domain(d3.extent(data, d => d.aantal))
  .domain([0, d3.max(data, d=> {return d.nutritions.carbohydrates})]) //Domain aan te passen om een min waarde van 0 te accepteren
  .range([HEIGHT, 0])

  SVG.append('g')
  .call(
        d3.axisLeft(AANTALEN)
          .ticks() //hardmatige aantal voor correcte aantal ticks
          .tickFormat(d3.format('.0f')) //tick formaat om de decimalen weg te halen
      )
}

update( await getData(URL))
