// JavaScript Document
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

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

// add cirlce and rect in the group
//g.append("circle").attr("r",10).attr("x",9).attr("y",3).style('fill',"blue")
//g.append('rect').attr("height", 20).attr("width",20).style("fill","pink")

  // Global variable for all data
  /*
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
  .style("fill","pink"); */

  // loading data and scale
  let data;
  const bar_height = 50;

  d3.json('https://rawgit.com/sgratzl/d3tutorial/master/examples/weather.json').then((json) => {
    data = json;
  
    update(data);
  });  


function update(new_data) {
    // Render the chart with new data
  
    // DATA JOIN
    const rect = g.selectAll('rect').data(new_data).join(
      // ENTER 
      // new elements
      (enter) => {
        const rect_enter = enter.append('rect').attr('x', 0);
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
  
    // ENTER + UPDATE
    // both old and new elements
    rect
      .attr('height', bar_height)
      .attr('width', (d) => d.temperature * 7)
      .attr('y', (d, i) => i*(bar_height+5));
  
    rect.select('title').text((d) => d.location.city);
  }

  const body = d3.select('body')
body.append('div').attr('id','thuan')
const elem = d3.select('#thuan')
elem.append('svg').append('g').selectAll('rect').data(data).join(
  (enter) => {
    const r = enter.append('rect')
    r.append('title')
    return r
  },
  (update) => update,
  (exit) => exit.remove()
)