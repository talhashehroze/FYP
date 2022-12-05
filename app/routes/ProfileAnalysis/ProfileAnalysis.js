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
                                        <span>Contracts</span>
                                    </li>
                                    <li className="list-inline-item text-center">
                                        <h2 className="mb-1">13</h2>
                                        <span>Tasks</span>
                                    </li>
                                    <li className="list-inline-item text-center">
                                        <h2 className="mb-1">5</h2>
                                        <span>Relases</span>
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
                            <div className="mt-4 mb-2">
                                <span className="small">
                                    Labels
                                </span>
                            </div>
                            <div className="text-left mb-4">
                                <Badge pill color="secondary" className="mr-1">
                                    { faker.commerce.department() }
                                </Badge>
                                <Badge pill color="secondary" className="mr-1">
                                    { faker.commerce.department() }
                                </Badge>
                                <Badge pill color="secondary" className="mr-1">
                                    { faker.commerce.department() }
                                </Badge>
                            </div>
                            <div className="mt-4 mb-2">
                                <span className="small">Contact</span>
                            </div>
                            <DlRowContacts
                                leftSideClassName="text-lg-left"
                                rightSideClassName="text-lg-right text-inverse"
                            />
                            <div className="mt-4 mb-2">
                                <span className="small">Address</span>
                            </div>
                            <DlRowAddress 
                                leftSideClassName="text-lg-left"
                                rightSideClassName="text-lg-right text-inverse"
                            />
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
                                <TimelineDefault 
                                    showPillDate
                                        pillDate="Today"
                                    smallIconColor="danger"
                                    iconCircleColor="danger"
                                        iconCircle="exclamation"
                                />
                                <TimelineDefault
                                    showPillDate
                                        pillDate="Yesterday"
                                    smallIconColor="info"
                                    iconCircleColor="info"
                                        iconCircle="comment"
                                />
                                <TimelineDefault
                                    showPillDate
                                        pillDate="2 Days ago"
                                    smallIconColor="primary"
                                    iconCircleColor="primary"
                                        iconCircle="envelope"
                                />
                                <TimelineDefault 
                                    showPillDate
                                        pillDate="3 Months ago"
                                    smallIconColor="warning"
                                    iconCircleColor="warning"
                                        iconCircle="clock-o"
                                />
                                <TimelineDefault 
                                    showPillDate
                                        pillDate="Year ago"
                                    smallIconColor="success"
                                    iconCircleColor="success"
                                        iconCircle="check"
                                />
                                <TimelineDefault 
                                    iconCircle="close"
                                />
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