import React from 'react';
import { Link } from 'react-router-dom';
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
    InputGroup,
    Input,
    InputGroupAddon,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Button,
    Table
} from '../../components'
import { HeaderMain } from '../components/HeaderMain';
import {
    HeaderDemo
} from "../components/HeaderDemo";
import {
    TasksCardGrid
} from "../components/Tasks/TasksCardGrid";
import {
    ProfileOverviewCard
} from "../components/Profile/ProfileOverviewCard";
import { StackedAreaChart } from '../components/Financial/StackedAreaChart';
import { TrTableRecentFundings } from '../components/Financial/TrTableRecentFundings';
export const TrendQuality = () => (
    <Container>
          <HeaderMain 
            title="Trend Quality"
            className="mb-5 mt-4"
        />
      
        <CardDeck>
            { /* START Card Widget */}
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="unique Account"
                        badgeTitle="Monthly"
                        badgeColor="primary"
                        value="6.200"
                        valueTitle="vs 4.891 prev."
                        footerTitle="Prev"
                        footerTitleClassName="text-success"
                        footerValue="23%"
                        footerIcon="caret-up"
                    />
                </CardBody>
            </Card>
            { /* START Card Widget */}
            { /* START Card Widget */}
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Unique Tweet"
                        badgeTitle="Annual"
                        badgeColor="info"
                        value="75.938"
                        valueTitle="vs 55.002 prev."
                        footerTitle="Prev"
                        footerTitleClassName="text-danger"
                        footerValue="12%"
                        footerIcon="caret-down"
                    />
                </CardBody>
            </Card>
            { /* START Card Widget */}
            { /* START Card Widget */}
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Tweet by Bot Account"
                        badgeTitle="Daily"
                        badgeColor="secondary"
                        value="456"
                        valueTitle="vs 231 prev."
                        footerTitle="Prev"
                        footerTitleClassName="text-success"
                        footerValue="67%"
                        footerIcon="caret-up"
                    />
                </CardBody>
            </Card>
            { /* START Card Widget */}
            { /* START Card Widget */}
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Starter Accounts"
                        badgeTitle="Reatime"
                        badgeColor="warning"
                        value="91"
                        valueTitle="vs 87 prev."
                        footerTitle="Prev"
                        footerTitleClassName="text-success"
                        footerValue="8%"
                        footerIcon="caret-up"
                    />
                </CardBody>
            </Card>
            { /* START Card Widget */}
        </CardDeck>

        
        <Row>
           <Col lg={6} >
           
           <Card className="mb-3">
                                <CardTitle className="bb-0 pt-3 pl-3 pb-0 bg-none" tag="h6">
                                    Human to Bot Account Ratio
                                </CardTitle>
                                <CardBody className="d-flex flex-column">
                                    <div >
                                   <h6> Real </h6>
                                    </div>
                                    <Progress multi   style={{height: "5px"}}>
                                        <Progress bar color="purple" value="50" style={{height: "5px"}} />
                                        <Progress bar color="primary" value="50" style={{height: "5px"}} />
                                        {/* <Progress bar color="success" value="45" style={{height: "5px"}} /> */}
                                    </Progress>
                                </CardBody>
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
            <Col>
             <Card className="mb-3">
                        <CardBody>
                            <CardTitle className="mb-1 d-flex">
                                <h6>Popular  ReTweets</h6>
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
          </Col>
                    </Row>    
           </Container>
);

export default TrendQuality;
