import React from 'react';
import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';

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
    UncontrolledTabs
} from '../../components'
// } from './../../../components';
import { HeaderMain } from '../components/HeaderMain';
import { Profile } from '../components/Profile'; 
import { ProfileOverviewCard } from '../components/Profile/ProfileOverviewCard'; 
import { DlRowContacts } from '../components/Profile/DlRowContacts'; 
import { DlRowAddress } from "../components/Profile/DlRowAddress";
import { ChatLeft } from "../components/Chat/ChatLeft";
import { ChatRight } from "../components/Chat/ChatRight";
import { ChatCardFooter } from "../components/Chat/ChatCardFooter";
import { TrTableMessages } from '../Apps/ProfileDetails/components/TrTableMessages'; 
import { TimelineDefault } from "../components/Timeline/TimelineDefault";
import { PieChartWithCustomizedLabel } from '../Graphs/ReCharts/components/PieChartWithCustomizedLabel';
import { SimpleAreaChart } from '../Graphs/ReCharts/components/SimpleAreaChart';
import { Progress } from '../../components';
const ProfileAnalysis = () => (
    <React.Fragment>
        <Container>
            <HeaderMain 
                title="Profile Analysis"
                className="mb-5 mt-4"
            />
            { /* START Content */}
            <Row>
                <Col lg={ 4 }>
                    <Card>
                        <CardBody>
                            <Profile />
                            <div className="text-center pb-1">
                                <ul className="list-inline">
                                    <li className="list-inline-item text-center">
                                        <h2 className="mb-1">23</h2>
                                        <span>Following</span>
                                    </li>
                                    <li className="list-inline-item text-center">
                                        <h2 className="mb-1">13</h2>
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
                                <span className="small">
                                    Profile
                                </span>
                            </div>
                            <p className="text-left">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                Dicta sapiente earum, necessitatibus commodi eius pariatur 
                                repudiandae cum sunt officiis ex!
                            </p>
                           
                            
                        </CardBody>
                    </Card>

                    <Card className="mt-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                PieChartWithCustomizedLabel
                                <span className="small ml-1 text-muted">
                                    #4.05
                                </span>
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
                                <h6 className="mb-1">CPU</h6>
                                <p>Intel Celeron G1610 @2.60Ghz</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="d-flex align-items-center mr-2">Core 0</span>
                                <Progress value="44" className="mt-2 w-50" style={{height: "5px"}} />
                                <span className="ml-2 text-inverse">86%</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="d-flex align-items-center mr-2">Core 1</span>
                                <Progress value="74" className="mt-2 w-50" style={{height: "5px"}} />
                                <span className="ml-2 text-inverse">40%</span>
                            </div>
                        </div>
                </CardBody>
            </Card>
                </Col>
                <Col lg={ 8 }>
                    <UncontrolledTabs initialActiveTabId="overview">
                        { /* START Pills Nav */}
                     
                        { /* END Pills Nav */}
                        <UncontrolledTabs.TabContent>
                            <TabPane tabId="overview">
                                <CardGroup className="mb-5">
                                    <Card body>
                                        <ProfileOverviewCard 
                                            title="Views"
                                            badgeColor="primary"
                                                badgeTitle="Monthly"
                                            value="6.200"
                                                valueTitle="Total Views"
                                            footerTitle="Last Month"
                                            footerTitleClassName="text-success"
                                                footerIcon="caret-up"
                                                footerValue="23%"
                                        />
                                    </Card>
                                    <Card body>
                                        <ProfileOverviewCard 
                                            title="Tweets"
                                            badgeColor="info"
                                                badgeTitle="Annual"
                                            value="75.938"
                                                valueTitle="New Tweets"
                                            footerTitle="Last Annual"
                                            footerTitleClassName="text-danger"
                                                footerIcon="caret-down"
                                                footerValue="96%"
                                        />
                                    </Card>
                                    <Card body>
                                        <ProfileOverviewCard 
                                            title="Visits"
                                            badgeColor="secondary"
                                                badgeTitle="Today"
                                            value="75.938"
                                                valueTitle="Total Visits"
                                            footerTitle="Yesterday"
                                            footerTitleClassName="text-success"
                                                footerIcon="caret-up"
                                                footerValue="40%"
                                        />
                                    </Card>
                                </CardGroup>
                              

            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                Tweets in Last 7 Days
                               
                            </h6>
                            <p>Area Charts</p>
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
            { /* END Content */}

        </Container>
    </React.Fragment>
);

export default ProfileAnalysis;