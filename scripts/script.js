// JavaScript Document
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

import { findOcc } from "./modules/utilities.js"

const dataviz = d3.select('body').append('div').attr('id', 'grafiek') //element toevoegen aan body voor de grafiek
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
    .style('text-anchor', "end");

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
    .style('fill', '#ffcc00')

  
}

render(await getFamilies(URL))