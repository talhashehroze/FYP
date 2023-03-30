import React, { useEffect, useState } from "react";
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
import { NewStackedAreaChart } from "../components/Financial/NewStackedAreaChart";
import { TrTableRecentFundings } from "../components/Financial/TrTableRecentFundings";
import { SimpleBarChart } from "../Graphs/ReCharts/components/SimpleBarChart";
import { RecentAndPopTweetTable } from "../components/Financial/RecentAndPopTweetTable";
const data = require('/home/farhan/studies/sem7/fyp/FYP/Backend/paper_work/scrapper/data for trend ann/jsonobjtrend.json')
export const TrendAnalysis = () => {
  const [all, setAll] = useState(data);
  
console.log(all)

  return (
  <Container>
    <HeaderMain title="Trend Analysis" className="mb-5 mt-4" />

    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
            title="Trend Name"
            value={data[0]?.trend_name["0"]}
         
          />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard
             title="Trend Language"
            value={data[0]?.language["0"]}
              
            />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Trend Start date" value="9 Dec" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Analyze Tweets" value={Object.keys(all?.user_id)?.length} />
        </CardBody>
      </Card>
      {/* START Card Widget */}
    </CardDeck>
    <CardDeck>
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Total Tweets" value="?" />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="No of participant" value={all?.unique_acc_partic[0]} />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Text Based Tweets" value={all?.text_tweets[0]} />
        </CardBody>
      </Card>
      {/* START Card Widget */}
      {/* START Card Widget */}
      <Card className="mb-3">
        <CardBody>
          <ProfileOverviewCard title="Image/Link Tweets" value={all?.media_tweets[0]} />
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
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Name</th>
                <th className="bt-0">No of likes</th>
                <th className="bt-0">Tweet</th>
              </tr>
            </thead>
            <tbody>
              <RecentAndPopTweetTable data={data[0]?.max_liked_tweet_username}
              count={data[0]?.number_max_liked_tweets}
              txt={data[0]?.max_liked_tweets}
              />
            </tbody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-4 d-flex">
              <h6>Trend Timeline</h6>
            </CardTitle>
            <div className="d-flex justify-content-center">
              <NewStackedAreaChart data={data[0]?.tweet_each_hour["0"]}/>
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
                <th className="bt-0">User Name</th>
                <th className="bt-0">No of time Retweet</th>
                <th className="bt-0">Tweet</th>
              </tr>
            </thead>
            <tbody>
              <RecentAndPopTweetTable data={data[0]?.max_retweets_username} 
              count={data[0]?.number_max_retweets_tweets}
              txt={data[0]?.max_retweets_tweets}
              />
            </tbody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="mb-1 d-flex">
              <h6>Most Mention Users</h6>
            </CardTitle>
          </CardBody>
          <Table responsive striped className="mb-0">
            <thead>
              <tr>
                <th className="bt-0">User Name</th>
                <th className="bt-0">No of Mentions</th>
              </tr>
            </thead>
            <tbody>
              <MentionUsers data={data[0]?.mention_user}
              count={data[0]?.mention_user_count}
              />
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  </Container>
)};

export default TrendAnalysis;
