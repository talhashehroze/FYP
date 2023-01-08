import React from "react";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  CardHeader,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledButtonDropdown,
  Card,
  ButtonGroup,
  Button,
  CardBody,
  CardFooter,
  CardTitle,
  CardGroup,
  Table,
  TabPane,
  Badge,
  Nav,
  NavItem,
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

const [Twitterdata,setdata]=useState('')
  useEffect(() => {
    
   axios
      .get("http://localhost:3001/user/get-user")
      .then(function (response) {
        // handle success
        let abc  =  setdata(response.data);

        setdata(response.data)
        console.log('first',Twitterdata.mostInteractedLastWeek.Text)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function (response) {
        // always executed
        setdata(response.data)

      });

  }, []);
          console.log('second',Twitterdata.mostInteractedLastWeek)

                console.log('worknnnnnnnnnnnnnn ',Twitterdata.mostInteractedLastWeek);

  return(
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
              {/* <Row className="mt-3">
                                <Col sm={ 6 } md={ 6 }>
                                    <Button color="primary" block tag={ Link } to="/apps/new-email" className="mb-3 mb-lg-0">
                                        Message
                                    </Button> 
                                </Col>
                                <Col sm={ 6 } md={ 6 }>
                                    <Button color="secondary" outline block tag={ Link } to="/apps/profile-edit">
                                        Edit
                                    </Button> 
                                </Col>
                            </Row> */}
              <div className="mt-4 mb-2">
                <span className="small">Description</span>
              </div>
                <p className="text-left">
                  {Twitterdata.renderedDescription}
                </p>
            </CardBody>
          </Card>

          <Card className="mt-3">
            <CardBody>
              <div className="d-flex">
                <div>
                  <h6 className="card-title mb-1">
                    Tweet in last 7,14,21,28 days
                    <span className="small ml-1 text-muted">#4.05</span>
                  </h6>
                  <p>Pie Charts</p>
                </div>
              </div>
              <div className="pt-3 mb-3">
                <PieChartWithCustomizedLabel />
              </div>
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
          <UncontrolledTabs initialActiveTabId="overview">
            {/* START Pills Nav */}

            {/* END Pills Nav */}
            <UncontrolledTabs.TabContent>
              <TabPane tabId="overview">
                <CardGroup className="mb-5">
                  <Card body>
                    <ProfileOverviewCard title="Total Tweets/Retweets" value={Twitterdata.statusesCount} />
                  </Card>
                  <Card body>
                    <ProfileOverviewCard title="Tweets Liked made" value={Twitterdata.favouritesCount} />
                  </Card>
                  <Card body>
                    <ProfileOverviewCard title="Verification Status" value={Twitterdata.verified} />
                  </Card>
                </CardGroup>

                <Card className="mb-3">
                  <CardBody>
                    <div className="d-flex">
                      <div>
                        <h6 className="card-title mb-1">
                          Tweets in Last 7 Days
                        </h6>
                      </div>
                    </div>
                    <SimpleAreaChart />
                  </CardBody>
                </Card>

                <Card className="mb-3">
                  <CardBody>
                    <div className="d-flex">
                        <div>
                  <Button onClick={handleClick} style={{ backgroundColor: "red", height: 50, width: 100,marginTop:20}} class="btn btn-primary" type="button" tag={ Link }>
                                 return back
                  </Button>
                        <h6 className="card-title mb-1">
                          Tweets in Last 30 Days
                        </h6>
                        <p>Area Charts</p>
                      </div>
                    </div>
                    <SimpleAreaChart />
                  </CardBody>
                </Card>
              </TabPane>
            </UncontrolledTabs.TabContent>
          </UncontrolledTabs>
        </Col>
        </Row>
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
              <TrTableRecentFundings data={Twitterdata.mostInteractedLastWeek} />
            </tbody>
          </Table>
        </Card>
          </Col>
          <Col lg={6}>
            <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Most Liked Tweets</h6>
              
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <tbody>
              <TrTableRecentFundings data={Twitterdata.mostInteractedLastWeek} />
            </tbody>
          </Table>
        </Card>
          </Col>
        </Row>
      {/* END Content */}
    </Container>
    </React.Fragment>
  )
}

export default ProfileAnalysis;
