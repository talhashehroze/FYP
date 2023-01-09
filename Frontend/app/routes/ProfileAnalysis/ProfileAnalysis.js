import React from "react";

// const tweetdaydatacount = require("../../../../Backend/Data/json_dnamecount.json");
// const tweetweekdatacount = require("../../../../Backend/Data/json_wnamecount.json");
// const hourtweetdatacount = require("../../../../Backend/Data/json_hcount.json");

// const tweetdaydatacount = require("../../../../Backend/Data/final_json.json");
// const tweetweekdatacount = require("../../../../Backend/Data/final_json.json");
// const hourtweetdatacount = require("../../../../Backend/Data/final_json.json");
// tweetdaydatacount.tweets_times_tweetsperdaylastweek;
// tweetweekdatacount.tweets_times_tweetsperdaylastmonth;
// hourtweetdatacount.tweets_times_per_hour;

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardGroup,
  Table,
  Input,
  TabPane,
  UncontrolledTabs,
} from "../../components";
// } from './../../../components';
import { HeaderMain } from "../components/HeaderMain";
import { Profile } from "../components/Profile";
import { ProfileOverviewCard } from "../components/Profile/ProfileOverviewCard";

import { InfinitySpin } from "react-loader-spinner";
import { PieChartWithCustomizedLabel } from "../Graphs/ReCharts/components/PieChartWithCustomizedLabel";
import { SimpleAreaChart } from "../Graphs/ReCharts/components/SimpleAreaChart";
import { Progress } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
const ProfileAnalysis = () => {
  const [Keyword, setkeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleKeywordChange = (event) => {
    setkeyword(event.target.value);

    if (!event.target.value.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  let history = useHistory();
  async function handleClick() {
    console.log(Keyword);
    setLoading(true);
    let data = await axios.get(`http://localhost:3001/user/get-user/`, {
      params: { name: Keyword },
    });

    setdata(data.data);
    setLoading(false);
    console.log(Twitterdata?.tweets_times_per_hour);
    // history.replace("/dashboards/projects");
  }
  // const fun = () => {
  //   console.log("i reached here");
  //   axios
  //     .get("http://localhost:3001/user/get-user")
  //     .then(function (response) {
  //       // handle success
  //       setdata(response.data);

  //       setdata(response.data);
  //       // this code is for me start
  //       if (response.data.verified == true) {
  //         setcheck("true");
  //       } else {
  //         setcheck("false");
  //       }
  //       // this code is for me end
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function (response) {
  //       // always executed
  //       setdata(response.data);
  //     });
  // };
  //
  const [Twitterdata, setdata] = useState("");
  const [check, setcheck] = useState("");
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/user/get-user")
  //     .then(function (response) {
  //       // handle succesuseEffect(() => {
  //   setTimeout(() => {
  //     fun();
  //   }, 5000);
  // }, []);s
  //       let abc = setdata(response.data);

  //       setdata(response.data);
  //       console.log("first", Twitterdata?.mostInteractedLastWeek.Text);
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

        <Container>
          {loading && (
            <Row>
              <InfinitySpin
                width="200"
                color="#4fa94d"
                // style={{ marginRight: "auto", marginLeft: "auto" }}
              />
            </Row>
          )}
          {!loading && (
            <Container>
              <Row>
                {/* <Row className="mt-3"> */}
                <Col lg={4}>
                  <Card>
                    <CardBody>
                      <Profile data={Twitterdata} />
                      <div className="text-center pb-1">
                        <ul className="list-inline">
                          <li className="list-inline-item text-center">
                            <h2 className="mb-1">
                              {Twitterdata?.friendsCount}
                            </h2>
                            <span>Following</span>
                          </li>
                          <li className="list-inline-item text-center">
                            <h2 className="mb-1">
                              {Twitterdata?.followersCount}
                            </h2>
                            <span>Follower</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 mb-2">
                        <span className="small">Description</span>
                      </div>
                      <p className="text-left">
                        {Twitterdata?.renderedDescription}
                      </p>
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
                        <PieChartWithCustomizedLabel
                          data={Twitterdata?.tweets_times_per_hour}
                        />
                      </div>
                      <h6 className="card-title mb-1">
                        Red:- 00:00-05:59 Indigo:- 06:00-11:59 Green:-
                        12:00-17:59 Yellow:- 18:00-23:59
                      </h6>
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
                      <Card className="mr-3" body>
                        <ProfileOverviewCard
                          title="Total Tweets/Retweets"
                          value={Twitterdata?.statusesCount}
                        />
                      </Card>
                      <Card className="mr-3" body>
                        <ProfileOverviewCard
                          title="Tweets Liked made"
                          value={Twitterdata?.favouritesCount}
                        />
                      </Card>
                      <Card className="mr-3" body>
                        <ProfileOverviewCard
                          title="Verification Status"
                          value={check}
                        />
                      </Card>
                      <Card body>
                        <ProfileOverviewCard
                          title="Verification Status"
                          value={Twitterdata?.verified}
                        />
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
                      <SimpleAreaChart
                        data={Twitterdata?.tweets_times_tweetsperdaylastweek}
                      />
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
                      <SimpleAreaChart
                        data={Twitterdata?.tweets_times_tweetsperdaylastmonth}
                      />
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
                          data={Twitterdata?.mostInteractedLastWeek}
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
                          data={Twitterdata?.mostInteractedLastMonth}
                        />
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </Container>
        {/* END Content */}
      </Container>
    </React.Fragment>
  );
};

export default ProfileAnalysis;
