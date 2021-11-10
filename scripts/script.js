// JavaScript Document
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/


// https://github.com/public-apis/public-apis
//fetch('https://www.fruityvice.com/api/fruit/all', test).then(x => x.json()).then(y => console.table(y))
// https://www.fruityvice.com/doc/index.html
/*
function getInfo() {
    fetch("https://www.fruityvice.com/api/fruit/all",{
            method:'GET',
            mode:'no-cors',
            headers:{}
    })
    .then(res => res.json())
    .then(data => console.table(y)
    );
  }

  console.log('test 3',getInfo())*/
  /*
  console.log('hello JS')
const URL = `https://www.fruityvice.com/`
const endpoint = `api/fruit/all`

function getData() {
  fetch(`${URL}${endpoint}`)
    .then(response => response.json())
    .then(data => console.table(data))
}

getData()*/

d3.json('https://www.fruityvice.com/api/fruit/all').then(x=> console.log(x))

// tutorial 
const margin = {top: 10, bottom: 10, left: 120, right: 20};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('section').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

  // Group used to enforce margin
  const g = svg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`);

//g.append("circle").attr("r",10).attr("x",9).attr("y",3).style('fill',"blue")
//g.append('rect').attr("height", 20).attr("width",20).style("fill","pink")

  // Global variable for all data
  const data = [10, 20, 30, 40, 50];

  const bar_height = 50;

    // DATA JOIN
    const bar_chart = g.selectAll('rect').data(data).join(
        // ENTER 
        // new elements
        (enter) => enter.append('rect').attr('x', 0),
        // UPDATE
        // update existing elements
        (update) => update,
        // EXIT
        // elements that aren't associated with data
        (exit) => exit.remove()
        );

          // ENTER + UPDATE
  // both old and new elements
  bar_chart
  .attr('height', bar_height)
  .attr('width', (d) => d * 7)
  .attr('y', (d, i) => i*(bar_height+5))
  .style("fill","pink");