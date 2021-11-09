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
  console.log('hello JS')
const URL = `https://www.fruityvice.com/`
const endpoint = `api/fruit/all`

function getData() {
  fetch(`${URL}${endpoint}`)
    .then(response => response.json())
    .then(data => console.table(data))
}

getData()