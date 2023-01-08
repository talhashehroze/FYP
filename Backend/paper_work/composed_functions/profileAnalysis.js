const data = require("../../Data/jsonobj.json");
// console.log(data);

const chart_data = data;
var count_tt = Object.keys(chart_data.TweetTimeline).length;

var count1_6 = 0;
var count7_12 = 0;
var count13_18 = 0;
var count19_00 = 0;

var arr_dt = [];

for (let i = 0; i < count_tt; i++) {
  const s = chart_data.TweetTimeline[i]; // reads string
  const d = new Date(s); // convert the string to datetime
  var now = d.toLocaleString();
  arr_dt.push(now); // adds that into an array
}
for (let i = 0; i < arr_dt.length; i++) {
  // console.log(arr_dt[i]);
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
for (let i = 0; i < arr_d.length; i++) {
  // console.log(arr_d[i]);
}

var arr_t = [];
var arr_thour = [];
var arr_thour2 = [];

for (let i = 0; i < count_tt; i++) {
  const s = chart_data.TweetTimeline[i]; // reads string
  var abc = s.split(" ")[1];
  var xyz = abc.split("+")[0];
  var nvm = xyz.split(":")[0];
  if (nvm)
    // const d = new Date(s); // convert the string to datetime
    // var hrName = d.toString(); //.split(",").pop()[0];
    // var now = d.toLocaleDateString();
    // arr_t.push(now); // adds that into an array
    arr_thour.push(xyz); // adds that into an array
  arr_thour2.push(nvm); // adds that into an array
}
for (let i = 0; i < arr_thour.length; i++) {
  // console.log(arr_thour[i]);
}

for (let i = 0; i < arr_thour2.length; i++) {
  // console.log(arr_thour2[i]);
}

const fs = require("fs");

const json_hname = JSON.stringify(arr_thour);
fs.writeFile("../../Data/json_hname.json", json_hname, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  // console.log("The file was saved!");
});

const json_hname2 = JSON.stringify(arr_thour2);
fs.writeFile(
  "../../Data/json_hname2.json",
  json_hname2,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    // console.log("The file was saved!");
  }
);

const json_dt = JSON.stringify(arr_dt);
fs.writeFile("../../Data/json_dt.json", json_dt, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  // console.log("The file was saved!");
});

const json_d = JSON.stringify(arr_d);
fs.writeFile("../../Data/json_d.json", json_d, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  // console.log("The file was saved!");
});

const json_dname = JSON.stringify(arr_dname);
fs.writeFile("../../Data/json_dname.json", json_dname, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }
  // console.log("The file was saved!");
});

var datetimetoday = new Date().toLocaleDateString();
// console.log("Today's Date", datetimetoday);

// var count = {};
// arr_dname.forEach(function (i) {
//   count[i] = (count[i] || 0) + 1;
// });
// console.log(count);

// var count_tt = Object.keys(count).length;
// console.log(count_tt);
let output = [];
let weekName = ["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"];
// console.log(weekName.length);
for (let i = 0; i < weekName.length; i++) {
  let count = 0;
  for (let j = 0; j < arr_dname.length; j++) {
    if (weekName[i] == arr_dname[j]) {
      count++;
    }
    // console.log(j);
  }
  tmp = { name: weekName[i], nooftweets: count };
  output.push(tmp);
}
// console.log(output);

const json_dnamecount = JSON.stringify(output);
fs.writeFile(
  "../../Data/json_dnamecount.json",
  json_dnamecount,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    // console.log("The file was saved!");
  }
);

weekNumData = chart_data.fourweeklistcount;
let output2 = [];
let weekNum = ["Week 1", "Week 2", "Week 3", "Week 4"];
// console.log(weekNum.length);
for (let i = 0; i < weekNum.length; i++) {
  tmp = { name: weekNum[i], nooftweets: weekNumData[i] };
  output2.push(tmp);
}
// console.log(output2);

const json_wnamecount = JSON.stringify(output2);
fs.writeFile(
  "../../Data/json_wnamecount.json",
  json_wnamecount,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    // console.log("The file was saved!");
  }
);

/////
///
//
//
