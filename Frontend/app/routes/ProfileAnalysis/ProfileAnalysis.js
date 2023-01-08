import React from "react";

const tweetdaydatacount = require("../../../../Backend/Data/json_dnamecount.json");
const tweetweekdatacount = require("../../../../Backend/Data/json_wnamecount.json");

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardGroup,
  Table,
  TabPane,
  UncontrolledTabs,
} from "../../components";
// } from './../../../components';
import { HeaderMain } from "../components/HeaderMain";
import { Profile } from "../components/Profile";
import { ProfileOverviewCard } from "../components/Profile/ProfileOverviewCard";

import { PieChartWithCustomizedLabel } from "../Graphs/ReCharts/components/PieChartWithCustomizedLabel";
import { SimpleAreaChart } from "../Graphs/ReCharts/components/SimpleAreaChart";
import { Progress } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
const ProfileAnalysis = () => {
  let history = useHistory();
  function handleClick() {
    history.replace("/dashboards/projects");
  }
  const fun = () => {
   
      console.log('i reached here')
      axios
        .get("http://localhost:3001/user/get-user")
        .then(function (response) {
          // handle success
           setdata(response.data);

          setdata(response.data);
          // this code is for me start
          if (response.data.verified == true)
          {
            setcheck('true')
          }
          else {
              setcheck('false')
          }
          // this code is for me end
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function (response) {
          // always executed
          setdata(response.data);
        });
    
  }
   useEffect(() => {
     setTimeout(() => {
       fun()
      
    }, 5000);
  }, []);
  const [Twitterdata, setdata] = useState("");
  const[check,setcheck]=useState('')
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/user/get-user")
  //     .then(function (response) {
  //       // handle success
  //       let abc = setdata(response.data);

  //       setdata(response.data);
  //       console.log("first", Twitterdata.mostInteractedLastWeek.Text);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function (response) {
  //       // always executed
  //       setdata(response.data);
  //     });
  // }, []);

  

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Profile Analysis" className="mb-5 mt-4" />
        {/* START Content */}
        <Row>
          <Col lg={4}>
            <Card>
              <CardBody>
                <Profile data={Twitterdata} />
                <div className="text-center pb-1">
                  <ul className="list-inline">
                    <li className="list-inline-item text-center">
                      <h2 className="mb-1">{Twitterdata.friendsCount}</h2>
                      <span>Following</span>
                    </li>
                    <li className="list-inline-item text-center">
                      <h2 className="mb-1">{Twitterdata.followersCount}</h2>
                      <span>Follower</span>
                    </li>
                  </ul>
                </div>
              
                <div className="mt-4 mb-2">
                  <span className="small">Description</span>
                </div>
                <p className="text-left">{Twitterdata.renderedDescription}</p>
              </CardBody>
            </Card>

            {/* <Card className="mt-3">
            <CardBody>
              <div className="mb-4">
                <div>
                  <h6 className="mb-1">Following Follower Ratio</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="d-flex align-items-center mr-2">
                    Follower
                  </span>
                  <Progress
                    value="44"
                    className="mt-2 w-50"
                    style={{ height: "5px" }}
                  />
                  <span className="ml-2 text-inverse">86%</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="d-flex align-items-center mr-2">
                    Following
                  </span>
                  <Progress
                    value="74"
                    className="mt-2 w-50"
                    style={{ height: "5px" }}
                  />
                  <span className="ml-2 text-inverse">40%</span>
                </div>
              </div>
            </CardBody>
          </Card> */}
          </Col>
          <Col lg={8}>
             <Card className="mt-0">
              <CardBody>
                <div className="d-flex">
                  <div>
                    <h6 className="card-title mb-1">
                     At which Hours User mostly Tweet
                    </h6>
                   
                  </div>
                </div>
                <div className="pt-3 mb-3">
                  <PieChartWithCustomizedLabel />
                </div>
              </CardBody>
            </Card>

           
          </Col>
      
        </Row>
              <UncontrolledTabs initialActiveTabId="overview">
            {/* START Pills Nav */}

            {/* END Pills Nav */}
            <UncontrolledTabs.TabContent>
              <TabPane tabId="overview">
                <CardGroup className="mb-5 mt-3">
                  <Card  className="mr-3" body>
                    <ProfileOverviewCard title="Total Tweets/Retweets" value={Twitterdata.statusesCount} />
                  </Card>
                  <Card className="mr-3" body>
                    <ProfileOverviewCard title="Tweets Liked made" value={Twitterdata.favouritesCount} />
                  </Card>
                  <Card className="mr-3" body>
                    <ProfileOverviewCard title="Verification Status" value={check} />
                </Card>
                  <Card body>
                    <ProfileOverviewCard title="Verification Status" value={Twitterdata.verified} />
                  </Card>
              </CardGroup>
            </TabPane>
          </UncontrolledTabs.TabContent>
          </UncontrolledTabs>
        {/* Row 2 start from here  */}
        <Row>
          <Col lg={6}>
                 <Card className="mb-3">
                    <CardBody>
                      <div className="d-flex">
                        <div>
                          <h6 className="card-title mb-1">
                            Tweets in Last 7 Days
                          </h6>
                        </div>
                      </div>
                      <SimpleAreaChart data={tweetdaydatacount} />
                    </CardBody>
                  </Card>
          </Col>
          <Col lg={6}>
               <Card className="mb-3">
                    <CardBody>
                      <div className="d-flex">
                        <div>
                         
                          <h6 className="card-title mb-1">
                            Tweets in Last 30 Days
                          </h6>
                        
                        </div>
                      </div>
                      <SimpleAreaChart data={tweetweekdatacount} />
                    </CardBody>
                  </Card>
          </Col>

        </Row>
        {/* Row 3 start from Here */}
        <Row>
          <Col lg={6}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle className="mb-1 d-flex">
                  <h6>Most Interacted Tweet of Last Week</h6>
                </CardTitle>
              </CardBody>
              <Table responsive striped className="mb-0">
                <tbody>
                  <TrTableRecentFundings
                    data={Twitterdata.mostInteractedLastWeek}
                  />
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="mb-3">
              <CardBody>
                <CardTitle className="mb-1 d-flex">
                  <h6>Most Interactive Tweet of Last Month</h6>
                </CardTitle>
              </CardBody>
              <Table responsive striped className="mb-0">
                <tbody>
                  <TrTableRecentFundings
                    data={Twitterdata.mostInteractedLastMonth}
                  />
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        {/* END Content */}
      </Container>
    </React.Fragment>
  );
};

export default ProfileAnalysis;
