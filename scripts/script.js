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
const margin = {top: 40, bottom: 10, left: 120, right: 20};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('section').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

  // Group used to enforce margin
  const g = svg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`);

g.append("circle").attr("r",10).attr("x",9).attr("y",3).style('fill',"blue")
g.append('rect').attr("height", 20).attr("width",20).style("fill","pink")
