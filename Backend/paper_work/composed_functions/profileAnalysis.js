const data = require("./json_obj/jsonobj.json");
// console.log(data);

const chart_data = data;
var count_tt = Object.keys(chart_data.TweetTimeline).length;

var arr_dt = [];

for (let i = 0; i < count_tt; i++) {
  const s = chart_data.TweetTimeline[i]; // reads string
  const d = new Date(s); // convert the string to datetime
  var now = d.toLocaleString();
  arr_dt.push(now); // adds that into an array
}
for (let i = 0; i < arr_dt.length; i++) {
  console.log(arr_dt[i]);
}

var arr_d = [];
var arr_dname = [];

for (let i = 0; i < count_tt; i++) {
  const s = chart_data.TweetTimeline[i]; // reads string
  const d = new Date(s); // convert the string to datetime
  var dayName = d.toString().split(" ")[0];
  var now = d.toLocaleDateString();
  arr_d.push(now); // adds that into an array
  arr_dname.push(dayName); // adds that into an array
}
for (let i = 0; i < arr_dt.length; i++) {
  console.log(arr_d[i]);
}

const fs = require("fs");

const json_dt = JSON.stringify(arr_dt);
fs.writeFile("./json_obj/json_dt.json", json_dt, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

const json_d = JSON.stringify(arr_d);
fs.writeFile("./json_obj/json_d.json", json_d, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

const json_dname = JSON.stringify(arr_dname);
fs.writeFile("./json_obj/json_dname.json", json_dname, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

var datetimetoday = new Date().toLocaleDateString();
console.log("Today's Date", datetimetoday);

var count = {};
arr_dname.forEach(function (i) {
  count[i] = (count[i] || 0) + 1;
});
// console.log(count);

// var count_tt = Object.keys(count).length;
// console.log(count_tt);
let output = [];

for(let i=0;i<7;i++)
{
    let count=0;
    for(let j=0;j<arr_dname.length;j++)
    {
        
        if(arr_dname[i]==arr_dname[j])
        {
         count++;   
        }
    }
    tmp = { "name": arr_dname[i], "nooftweets": count };
  output.push(tmp);
}


const json_dnamecount = JSON.stringify(output);
fs.writeFile(
  "./json_obj/json_dnamecount.json",
  json_dnamecount,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);

/////
///
//
