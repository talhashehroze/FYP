import React from "react";
import { Link } from "react-router-dom";
// import { faker } from '@faker-js/faker';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardDeck,
  Progress,
  CardFooter,
  CardColumns,
  CardTitle,
  Button,
  Table,
} from "../../components";
import { HeaderMain } from "../components/HeaderMain";
import { ProfileOverviewCard } from "../components/Profile/ProfileOverviewCard";
import { StackedAreaChart } from "../components/Financial/StackedAreaChart";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
import { SimpleBarChart } from "../Graphs/ReCharts/components/SimpleBarChart";
export const TrendAnalysis = () => (
  <Container>
    <HeaderMain title="Trend Analysis" className="mb-5 mt-4" />

    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
            title="Trend Name"
            // badgeTitle="Monthly"
            // badgeColor="primary"
            value="6.200"
            // valueTitle="vs 4.891 prev."
            // footerTitle="Prev"
            // footerTitleClassName="text-success"
            // footerValue="23%"
            // footerIcon="caret-up"
          />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Trend Country" value="75.938" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Trend Start date" value="456" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Analyze Tweets" value="91" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
    </CardDeck>
    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Total Tweets" value="6.200" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="No of participant" value="75.938" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Text Based Tweets" value="456" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Image/Link Tweets" value="91" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
    </CardDeck>

    <Row>
      <Col lg={6}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Most Liked Tweets</h6>
              <Button color="link" size="sm" className="pt-0 ml-auto">
                View All <i className="fa fa-angle-right"></i>
              </Button>
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Id</th>
                <th className="bt-0">No of likes</th>
                <th className="bt-0">Tweet</th>
              </tr>
            </thead>
            <tbody>
              <TrTableRecentFundings />
            </tbody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-4 d-flex">
              <h6>Trend Timeline</h6>
            </CardTitle>
            <div className="d-flex justify-content-center">
              <StackedAreaChart />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg={6}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Popular ReTweeted Tweet</h6>
              <Button color="link" size="sm" className="pt-0 ml-auto">
                View All <i className="fa fa-angle-right"></i>
              </Button>
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Id</th>
                <th className="bt-0">No of time Retweet</th>
                <th className="bt-0">Tweet</th>
              </tr>
            </thead>
            <tbody>
              <TrTableRecentFundings />
            </tbody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <div className="d-flex">
              <div>
                <h6 className="card-title mb-1">Participant Age</h6>
                <p> Gender Wise</p>
              </div>
            </div>
            <SimpleBarChart />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default TrendAnalysis;
