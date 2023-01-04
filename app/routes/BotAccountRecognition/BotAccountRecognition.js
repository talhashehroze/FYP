import React from 'react';
import { Link } from 'react-router-dom';
// import { faker } from '@faker-js/faker';

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
    Table
} from '../../components'
import { HeaderMain } from '../components/HeaderMain';

import {
    ProfileOverviewCard
} from "../components/Profile/ProfileOverviewCard";
import { StackedAreaChart } from '../components/Financial/StackedAreaChart';
import { TrTableRecentFundings } from '../components/Financial/TrTableRecentFundings';
export const BotAccountRecognition = () => (
    <Container>
          <HeaderMain 
            title="Bot Account Recognition"
            className="mb-5 mt-4"
        />
      <CardDeck>
            { /* START Card Widget */}
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="User Name"
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
          
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Verification Status"
                        value="75.938"
                       
                    />
                </CardBody>
            </Card>
       
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Age of Account"
                        value="456"
                    />
                </CardBody>
            </Card>
          
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Total Tweets"
                        value="91"
                    />
                </CardBody>
            </Card>
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Account Status"
                        value="6.200"
                    />
                </CardBody>
            </Card>
        </CardDeck>

        { /* START Card deck Widget */}

        
        <Row>
           <Col lg={6} >
           
           <Card className="mb-3">
                                <CardTitle className="bb-0 pt-3 pl-3 pb-0 bg-none" tag="h6">
                                    Follower to Following Ratio
                                </CardTitle>
                                <CardBody className="d-flex flex-column">
                                    <div >
                                    <Row>
                                    <Col lg={6}>
                                   <h6> Follower  </h6>
                                   </Col>
                                   <Col lg={6}>
                                   <h6> Following  </h6>
                                   </Col>
                                
                                   </Row>

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
                                <h6>Recent Tweets</h6>
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

export default BotAccountRecognition;
