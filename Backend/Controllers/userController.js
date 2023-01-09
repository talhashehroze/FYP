const axios = require("axios");
// const bcrypt = require("bcryptjs");
// const userService = require("../Services/userService");
// const auth = require("../Middlewares/auth");

// const register = async (req, res) => {
//   const { name, surname, email, password } = req.body;
//   if (!(name && surname && email && password))
//     return res
//       .status("400")
//       .send({ errMessage: "Please fill all required areas!" });

//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salt);
//   req.body.password = hashedPassword;

//   await userService.register(req.body, (err, result) => {
//     if (err) return res.status(400).send(err);
//     return res.status(201).send(result);
//   });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!(email && password))
//     return res
//       .status(400)
//       .send({ errMessage: "Please fill all required areas!" });

//   await userService.login(email, (err, result) => {
//     if (err) return res.status(400).send(err);

//     const hashedPassword = result.password;
//     if (!bcrypt.compareSync(password, hashedPassword))
//       return res
//         .status(400)
//         .send({ errMessage: "Your email/password is wrong!" });

//     result.token = auth.generateToken(result._id.toString(), result.email);
//     result.password = undefined;
//     result.__v = undefined;

//     return res
//       .status(200)
//       .send({ message: "User login successful!", user: result });
//   });
// };

// const getUser = async (req, res) => {
//   const userId = req.user.id;
//   return res.status(200).send("Request OK!");
// };

// const getUserWithMail = async (req, res) => {
//   const { email } = req.body;
//   await userService.getUserWithMail(email, (err, result) => {
//     if (err) return res.status(404).send(err);

//     const dataTransferObject = {
//       name: result.name,
//       surname: result.surname,
//       color: result.color,
//       email: result.email,
//     };
//     return res.status(200).send(dataTransferObject);
//   });
// };

// let user_analysis_data = require("../Data/jsonobj.json");
const getUser = async (req, res) => {
  weekLimit = false;
  monthLimit = false;
  monthLimit = false;
  // console.log("fffff");
  let resp = await axios.get(`http://localhost:5000`, {
    params: req.query,
  });
  // console.log(resp.data);
  const chart_data = resp.data;
  var count_tt = Object.keys(chart_data.TweetTimeline).length;
  // console.log(count_tt);
  const counthr = [0, 0, 0, 0];
  // 0-6,7-12,13-18,19-24
  var del_length = count_tt;
  var arr_dt = [];

  for (let i = 0; i < count_tt; i++) {
    const s = chart_data.TweetTimeline[i]; // reads string
    const d = new Date(s); // convert the string to datetime
    var now = d.toLocaleString();
    arr_dt.push(now); // adds that into an array
  }
  // for (let i = 0; i < arr_dt.length; i++) {
  //   // console.log(arr_dt[i]);
  // }

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
  // for (let i = 0; i < arr_d.length; i++) {
  //   // console.log(arr_d[i]);
  // }
  // console.log(arr_dname);
  var arr_t = [];
  var arr_thour = [];
  var arr_thour2 = [];

  for (let i = 0; i < count_tt; i++) {
    const s = chart_data.TweetTimeline[i]; // reads string
    var abc = s.split(" ")[1];
    var xyz = abc.split("+")[0];
    var nvm = xyz.split(":")[0];

    if (nvm >= 0 && nvm < 6) counthr[0]++;
    else if (nvm >= 6 && nvm < 12) counthr[1]++;
    else if (nvm >= 12 && nvm < 18) counthr[2]++;
    else if (nvm >= 18 && nvm <= 23) counthr[3]++;

    // const d = new Date(s); // convert the string to datetime
    // var hrName = d.toString(); //.split(",").pop()[0];
    // var now = d.toLocaleDateString();
    // arr_t.push(now); // adds that into an array
    arr_thour.push(xyz); // adds that into an array
    arr_thour2.push(nvm); // adds that into an array
  }
  // for (let i = 0; i < arr_thour.length; i++) {
  //   // console.log(arr_thour[i]);
  // }
  // // console.log(counthr);
  // for (let i = 0; i < arr_thour2.length; i++) {
  //   // console.log(arr_thour2[i]);
  // }

  let output3 = [];
  let hoursc = ["Hour 0-5", "Hour 6-11", "Hour 12-17", "Hour 18-23"];
  // console.log(weekNum.length);
  for (let i = 0; i < hoursc.length; i++) {
    tmp = { name: hoursc[i], value: counthr[i] };
    output3.push(tmp);
  }

  // const fs = require("fs");

  // const json_hcount = JSON.stringify(output3);
  // fs.writeFile(
  //   "../../Data/json_hcount.json",
  //   json_hcount,
  //   "utf8",
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     // console.log("The file was saved!");
  //   }
  // );

  // const json_hname = JSON.stringify(arr_thour);
  // fs.writeFile("../../Data/json_hname.json", json_hname, "utf8", function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   // console.log("The file was saved!");
  // });

  // const json_hname2 = JSON.stringify(arr_thour2);
  // fs.writeFile(
  //   "../../Data/json_hname2.json",
  //   json_hname2,
  //   "utf8",
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     // console.log("The file was saved!");
  //   }
  // );

  // const json_dt = JSON.stringify(arr_dt);
  // fs.writeFile("../../Data/json_dt.json", json_dt, "utf8", function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   // console.log("The file was saved!");
  // });

  // const json_d = JSON.stringify(arr_d);
  // fs.writeFile("../../Data/json_d.json", json_d, "utf8", function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   // console.log("The file was saved!");
  // });

  // const json_dname = JSON.stringify(arr_dname);
  // fs.writeFile("../../Data/json_dname.json", json_dname, "utf8", function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   // console.log("The file was saved!");
  // });

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

  // const json_dnamecount = JSON.stringify(output);
  // fs.writeFile(
  //   "../../Data/json_dnamecount.json",
  //   json_dnamecount,
  //   "utf8",
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     // console.log("The file was saved!");
  //   }
  // );

  weekNumData = chart_data.fourweeklistcount;
  let output2 = [];
  let weekNum = ["Week 1", "Week 2", "Week 3", "Week 4"];
  // console.log(weekNum.length);
  for (let i = 0; i < weekNum.length; i++) {
    tmp = { name: weekNum[i], nooftweets: weekNumData[i] };
    output2.push(tmp);
  }
  // console.log(output2);

  // const json_wnamecount = JSON.stringify(output2);
  // fs.writeFile(
  //   "../../Data/json_wnamecount.json",
  //   json_wnamecount,
  //   "utf8",
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     // console.log("The file was saved!");
  //   }
  // );
  let ali = {
    tweets_times_per_hour: output3,
    tweets_times: arr_thour,
    tweets_times_hour_only: arr_thour2,
    tweets_times_day_time: arr_dt,
    tweets_times_day_only: arr_dt,
    tweets_times_day_name_only: arr_dname,
    tweets_times_tweetsperdaylastweek: output,
    tweets_times_tweetsperdaylastmonth: output2,
  };

  let finaljsonarray = {};
  finaljsonarray = chart_data;
  finaljsonarray = { ...finaljsonarray, ...ali };

  // finaljsonarray["tweets_times_per_hour"] = output3;
  // finaljsonarray["tweets_times"] = arr_thour;
  // finaljsonarray["tweets_times_hour_only"] = arr_thour2;
  // finaljsonarray["tweets_times_day_time"] = arr_dt;
  // finaljsonarray["tweets_times_day_only"] = arr_d;
  // finaljsonarray["tweets_times_day_name_only"] = arr_dname;
  // finaljsonarray["tweets_times_tweetsperdaylastweek"] = output;
  // finaljsonarray["tweets_times_tweetsperdaylastmonth"] = output2;

  // var finaljsonarray = {};
  // for (key in data) finaljsonarray[key] = data[key];
  // for (key in output3) finaljsonarray[key] = output3[key];
  // for (key in arr_thour) finaljsonarray[key] = arr_thour[key];
  // for (key in arr_thour2) finaljsonarray[key] = arr_thour2[key];
  // for (key in arr_dt) finaljsonarray[key] = arr_dt[key];
  // for (key in arr_d) finaljsonarray[key] = arr_d[key];
  // for (key in arr_dname) finaljsonarray[key] = arr_dname[key];
  // for (key in output) finaljsonarray[key] = output[key];
  // for (key in output2) finaljsonarray[key] = output2[key];

  // for (let i = 0; i < del_length; i++) {
  //   delete finaljsonarray[i];
  // }
  // console.log(finaljsonarray);
  return res.status(200).send(finaljsonarray);
};

module.exports = {
  // register,
  // login,
  getUser,
  // getUserWithMail,
};
