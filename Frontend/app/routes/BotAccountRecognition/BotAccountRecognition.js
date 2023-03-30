import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from 'reactstrap';
import axios from "axios";
// import omg from '../../images/avatars/omg.png'
const omg = require('../../images/avatars/omg.png') 
const relife =require('../../images/avatars/reilfe.png') 

// import { faker } from '@faker-js/faker';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,

} from "../../components/recharts";

import colors from "../../colors";


import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardDeck,
  Progress,
  CardTitle,
  Button,
  Table,
    Input,
} from "../../components";
import { HeaderMain } from "../components/HeaderMain";

import { ProfileOverviewCard } from "../components/Profile/ProfileOverviewCard";
import { StackedAreaChart } from "../components/Financial/StackedAreaChart";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
import { Typography } from "@mui/material";
import { result } from "lodash";

const COLORS = [
  colors["primary"],
  colors["red"],
  colors["success"],
  colors["yellow"],
];


function temperatureColor(temp) {
   if (temp <= 1) {
    return "grey";
  }
  else if (temp <= 5) {
    return "blue";
  } else if (temp <= 10) {
    return "green";
  } else if (temp <= 25) {
    return "yellow";
  } else if (temp <= 35) {
    return "orange";
  } else {
    return "red";
  }
}

function followersTemperatureColor(temp) {
   if (temp <= 25) {
    return "red";
  } else if (temp <= 100) {
    return "yellow";
  } else if (temp <= 500) {
    return "blue";
   }
   else {
     return "green";
  }
}




export const BotAccountRecognition = () => {
    const elementRef = useRef(null);
const [Keyword, setkeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [Result , setUser]= useState(undefined)
  const [arr,setData]= useState([
  { value: 192473 },
  {  value: 141173 },
]
)
  const [ratio, setRatio] = useState({
    "followers_count": 111733,
    "friends_count": 363,
  })
  
   const handleKeywordChange = (event) => {
    setkeyword(event.target.value);

    if (!event.target.value.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };
  
  async function handleClick() {
    console.log(Keyword);
    setLoading(true);
    let resp = await axios.get(`http://localhost:3001/user/predict-user/`, {
      params: { name: Keyword },
    }).then((resp)=>{
    const Resulti =  resp.data;
     setUser(Resulti)



    console.log(resp.data.result)
    if (resp.data.result != -1) {
      

      let followers_count,friends_count=0
      let maxValue = Math.max(Result.followers_count, Result.friends_count);
console.log(  Result.followers_count,  Result.friends_count)
      if (maxValue === Result.followers_count) {
        
        friends_count= (Result.friends_count / maxValue * 100);
        followers_count = 100-friends_count;
        
      }
      else {
         followers_count = (Result.followers_count / maxValue * 100);
        friends_count = 100-followers_count;
      }
      
       setRatio({
    "followers_count": followers_count,
    "friends_count": friends_count,
  })
     console.log( ratio)

      setData([
        { value: resp.data.favourites_count },
        { value: resp.data.statuses_count },
      ])
    }
     
    setLoading(false);
    })

    elementRef.current.classList.toggle(Result.created_at);
    // history.replace("/dashboards/projects");
  }

  
  return (
  <Container>
      <HeaderMain title="Bot Account Recognition" className="mb-5 mt-4" />

 <Row className="mb-5">
          <Col lg={12}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle tag="h6" className="mb-3">
                  <p style={{ fontSize: 20, fontWeight: "bold" }}>
                    Enter Keyword to Perform Operation
                  </p>
                </CardTitle>

                <Row className="mt-3">
                  <Col sm={9} md={9}>
                    <Input
                      type="text"
                      id="Keyword"
                      name="Keyword"
                      onChange={handleKeywordChange}
                      value={Keyword}
                      placeholder="Enter  Keyword..."
                    />
                  </Col>
                  <Col sm={3} md={3}>
                    <Button
                      disabled={isDisabled}
                      onClick={handleClick}
                      style={{
                        backgroundColor: "#006A6D",
                        height: 40,
                        width: 100,
                        // marginRight: 20,
                      }}
                      class="btn btn-primary"
                      type="button"
                      // tag={Link}
                    >
                      Search
                    </Button>{" "}
                  </Col>
                </Row>

                {/* </InputGroup> */}
              </CardBody>
              {/* <DraggableProjects /> */}
            </Card>
          </Col>
        </Row>
      {Result&&((Result.result === -1) ? (
        <Alert color="danger" style={{
        backgroundColor: 'rgba(248, 215, 218, 0.5)',paddingTop:'20px'
      }}>
          {/* <img src={omg} style={{paddingRight:'7px', paddingBottom:'10px'}} /> */}
          <Typography style={{fontSize:'25px',color:'#792046' ,display:'inline'}} > Invalid User Name </Typography>  
        {/* </span> */}
        </Alert>)
        :  
        (<div>
      {Result&& (Result?.result) ? (
         <Alert color="danger" style={{
        backgroundColor: 'rgba(248, 215, 218, 0.5)',paddingTop:'20px'
      }}>
          <img src={omg} style={{paddingRight:'7px', paddingBottom:'10px'}} />
          <Typography style={{fontSize:'25px',color:'#792046' ,display:'inline'}} > BOT Alert!! </Typography>  
        {/* </span> */}
      </Alert>

      ) :( <Alert color="success" style={{
        backgroundColor: 'rgba(212, 237, 218, 0.8)',paddingTop:'20px'
      }}>
          <img src={relife} style={{width:'60px', paddingRight:'7px', paddingBottom:'10px'}} />
          <Typography style={{fontSize:'25px',color:'#376e37' ,display:'inline'}} > Not a Bot </Typography>  
        {/* </span> */}
      </Alert>)
    }
     
    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
            title="User Name"
            // badgeTitle="Monthly"
            // badgeColor="primary"
            value={Result?.screen_name}
            // valueTitle="vs 4.891 prev."
            // footerTitle="Prev"
            // footerTitleClassName="text-success"
            // footerValue="23%"
            // footerIcon="caret-up"
          />
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Followers" value={Result?.followers_count} />
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
            <ProfileOverviewCard title="Age of Account" value={`${Math.ceil(Result?.account_age_days / 365)} years`} />
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Total Tweets" value={Result?.statuses_count}/>
        </CardBody>
      </Card>
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Account Status" value={Result?.result ? "Bot" : "Human"} />
        </CardBody>
      </Card>
    </CardDeck>

    {/* START Card deck Widget */}

    <Row>
      <Col lg={6}>
        <Card className="mb-3">
          <CardTitle className="bb-0 pt-3 pl-3 pb-0 bg-none" tag="h6">
            Follower to Following Ratio
          </CardTitle>
          <CardBody className="d-flex flex-column">
            <div>
              <Row>
                <Col lg={6}>
                  <h6> Follower </h6>
                </Col>
                <Col lg={6}>
                  <h6> Following </h6>
                </Col>
              </Row>
            </div>
            <Progress multi style={{ height: "5px" }}>
              <Progress
                bar
                color="purple"
                value={ratio?.followers_count}
                style={{ height: "5px" }}
                />
                
              <Progress
                bar
                color="primary"
                value={ratio?.friends_count}
                style={{ height: "5px" }}
              />
              {/* <Progress bar color="success" value="45" style={{height: "5px"}} /> */}
            </Progress>
          </CardBody>
          </Card>
           <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-2 d-flex">
              <h6>Average tweets per day</h6>
              </CardTitle>
              <h3
                style={{
                  color:'black'
                }}
              >
          {Result?.average_tweets_per_day?.toFixed(2)}
              </h3>
            <div className="d-flex ">
              <Progress
                bar
                color={temperatureColor(Result?.average_tweets_per_day)}
                value={(Result?.average_tweets_per_day)}
                style={{ height: "5px" }}
              />
              {/* <Progress bar color="success" value="45" style={{height: "5px"}} /> */}
            {/* </Progress> */}
            </div>
          </CardBody>
        </Card>
       
      </Col>
            <Col lg={6}>
               <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-2 d-flex">
              <h6>Following </h6>
              </CardTitle>
              <h3
                style={{
                  color:'black'
                }}
              >
          {Result?.friends_count}
              </h3>
            <div className="d-flex ">
              <Progress
                bar
                color={followersTemperatureColor(Result?.friends_count)}
                value={(Result?.friends_count)}
                style={{ height: "5px" }}
              />
              {/* <Progress bar color="success" value="45" style={{height: "5px"}} /> */}
            {/* </Progress> */}
            </div>
          </CardBody>
              </Card>
               <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-2 d-flex">
              <h6>Followers</h6>
              </CardTitle>
              <h3
                style={{
                  color:'black'
                }}
              >
          {Result?.followers_count}
              </h3>
            <div className="d-flex ">
              <Progress
                bar
                color={followersTemperatureColor(Result?.followers_count)}
                value={(Result?.followers_count)}
                style={{ height: "5px" }}
              />
              {/* <Progress bar color="success" value="45" style={{height: "5px"}} /> */}
            {/* </Progress> */}
            </div>
          </CardBody>
        </Card>
      
      </Col>
          </Row>
            <Card className="mb-3">
         <CardBody>
            <CardTitle className="mb-4 d-flex">
              <h6 style={{fontWeight:'bold', color:'#646464'}}>Tweets to <h6 style={{fontWeight:'bold',color:'red',display:'inline'}}> favourite ratio</h6></h6>
            </CardTitle>
            <div className="d-flex justify-content-center">
           <ResponsiveContainer width="100%" aspect={6.0 / 3.4}>
    <PieChart>
                        <Pie
                          
                          ref={elementRef}
        data={arr}
        dataKey="value"
        // stroke={colors["white"]}
        innerRadius={200}
        outerRadius={280}
        fill="#8884d8"
        paddingAngle={1}
                label={{ fill: colors["800"], fontSize: "25px" }}
      >
                      {arr.map((entry, index) => (                
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
         </div>))}
    </Container>
   
);}

export default BotAccountRecognition;

