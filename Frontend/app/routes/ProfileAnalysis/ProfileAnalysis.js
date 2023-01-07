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
import { DlRowContacts } from "../components/Profile/DlRowContacts";
import { DlRowAddress } from "../components/Profile/DlRowAddress";
import { ChatLeft } from "../components/Chat/ChatLeft";
import { ChatRight } from "../components/Chat/ChatRight";
import { ChatCardFooter } from "../components/Chat/ChatCardFooter";
import { TrTableMessages } from "../Apps/ProfileDetails/components/TrTableMessages";
import { TimelineDefault } from "../components/Timeline/TimelineDefault";
import { PieChartWithCustomizedLabel } from "../Graphs/ReCharts/components/PieChartWithCustomizedLabel";
import { SimpleAreaChart } from "../Graphs/ReCharts/components/SimpleAreaChart";
import { Progress } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileAnalysis = () => {
const [data,setdata]=useState('')
  useEffect(() => {
    
   axios
      .get("http://localhost:3001/user/get-user")
      .then(function (response) {
        // handle success
        setdata(response.data)
        console.log('work ',data.username);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    
},[]);
  return(
  <React.Fragment>
    <Container>
      <HeaderMain title="Profile Analysis" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={4}>
          <Card>
            <CardBody>
                <Profile data={data} />
              <div className="text-center pb-1">
                <ul className="list-inline">
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">{data.friendsCount}</h2>
                    <span>Following</span>
                  </li>
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">{data.followersCount}</h2>
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
                  {data.renderedDescription}
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

          <Card className="mt-3">
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
          </Card>
        </Col>
        <Col lg={8}>
          <UncontrolledTabs initialActiveTabId="overview">
            {/* START Pills Nav */}

            {/* END Pills Nav */}
            <UncontrolledTabs.TabContent>
              <TabPane tabId="overview">
                <CardGroup className="mb-5">
                  <Card body>
                    <ProfileOverviewCard title="Total Tweets/Retweets" value={data.statusesCount} />
                  </Card>
                  <Card body>
                    <ProfileOverviewCard title="Tweets Liked made" value={data.favouritesCount} />
                  </Card>
                  <Card body>
                    <ProfileOverviewCard title="Verification Status" value={data.verified} />
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
      {/* END Content */}
    </Container>
    </React.Fragment>
  )
}

export default ProfileAnalysis;
