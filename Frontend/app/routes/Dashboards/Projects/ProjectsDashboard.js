import React, { useState, useEffect } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  CardBody,
  Badge,
  Table,
  CardTitle,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem,
  Media,
  Col,
} from "./../../../components";
import { setupPage } from "./../../../components/Layout/setupPage";

import { HeaderMain } from "../../components/HeaderMain";
import { TasksMedia } from "../../components/ProjectsDashboards/TasksMedia";
import { TinyDonutChart } from "../../components/ProjectsDashboards/TinyDonutChart";
import { TinyDonutChartAllProjects } from "../../components/ProjectsDashboards/TinyDonutChartAllProjects";
import { TimelineMini } from "../../components/Timeline/TimelineMini";
import { DraggableProjects } from "./DraggableProjects";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const ProjectsDashboard = () => {
  let history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState("Select operation");
  const [Keyword, setkeyword] = useState("");
  const handleKeywordChange = (event) => {
    setkeyword(event.target.value);

    console.log("value is:", event.target.value);
  };
  function handleClick() {
    history.replace("/profileanalysis/profileanalysis");
  }
  const handleSelect = (e) => {
    console.log(value);
  };

  const onsubmit = (e) => {
    axios
      .get("http://localhost:3001/user/get-user")
      .then(function (response) {
        // handle success
        console.log(response.data.username);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Container>
      <Row className="mb-5">
        <Col lg={12}>
          <HeaderMain title="HomePage" className="mb-4 mb-lg-5" />
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6" className="mb-3">
                <p style={{ fontSize: 20, fontWeight: "bold" }}>
                  Enter Keyword to Perform Operation
                </p>
              </CardTitle>

              <Row className="mt-3">
                <Col sm={8} md={8}>
                  <Input
                    type="text"
                    id="Keyword"
                    name="Keyword"
                    onChange={handleKeywordChange}
                    value={Keyword}
                    placeholder="Enter  Keyword..."
                  />
                </Col>

                <Col sm={4} md={4}>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    style={{ width: "100%" }}
                    onClick={handleSelect}
                  >
                    <DropdownToggle style={{ width: "100%" }} caret>
                      {" "}
                      {value}
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* <DropdownItem header>Header</DropdownItem> */}
                      <DropdownItem onClick={() => setValue("Trend Analysis")}>
                        Trend Analysis
                      </DropdownItem>
                      <DropdownItem onClick={() => setValue("Trend Quality")}>
                        Trend Quality
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => setValue("Bot Account Recognition")}
                      >
                        Bot Account Recognition
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => setValue("Account Analysis")}
                      >
                        Account Analysis
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="mt-0">
                <Col sm={5} md={5} className="pl-20" color="yellow"></Col>
                <Col sm={7} md={7} className="pl-20" color="yellow">
                  {/* <Button style={{ backgroundColor: "red", height: 50, width: 100,marginTop:20}} class="btn btn-primary" type="button" tag={ Link } to="/profileanalysis/profileanalysis">
                                 Search
                  </Button> */}
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#006A6D",
                      height: 40,
                      width: 100,
                      marginTop: 20,
                    }}
                    class="btn btn-primary"
                    type="button"
                    tag={Link}
                  >
                    Search
                  </Button>
                </Col>
              </Row>

              {/* </InputGroup> */}
            </CardBody>
            {/* <DraggableProjects /> */}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6" className="mb-0">
                <p style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}
                  Trending Keywords on Twitter{" "}
                </p>
              </CardTitle>
            </CardBody>
            <Col lg={12}>
              <ListGroup flush>
                <ListGroupItem action>
                  <TasksMedia />
                </ListGroupItem>
                <ListGroupItem action>
                  <TasksMedia iconColor="danger" id="2" />
                </ListGroupItem>
                <ListGroupItem action>
                  <TasksMedia iconColor="warning" id="3" />
                </ListGroupItem>
                <ListGroupItem action>
                  <TasksMedia id="4" />
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6" className="mb-3">
                Search for Trending Keyword
              </CardTitle>
              {/* <InputGroup> */}
              <Input placeholder="Enter Keyword..." />
              {/* <InputGroupAddon addonType="append">
                                <Button color="secondary" outline tag={ Link } to="/apps/projects/list">
                                    <i className="fa fa-search"></i>
                                </Button>
                            </InputGroupAddon> */}

              <Button
                onClick={handleClick}
                style={{
                  backgroundColor: "#006A6D",
                  height: 40,
                  width: 100,
                  marginTop: 20,
                }}
                class="btn btn-primary"
                type="button"
                tag={Link}
              >
                Search
              </Button>

              {/* <Button class="btn btn-primary" type="button" tag={ Link } to="/dashboards/analytics">

                                </Button>
                           */}

              {/* </InputGroup> */}
            </CardBody>
            {/* <DraggableProjects /> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default setupPage({
  pageTitle: " ",
})(ProjectsDashboard);
