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
    Button
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
import {
    GalleryCard
} from "../components/Gallery/GalleryCard";
import {
    UsersResultsCard
} from "../components/SearchResults/UsersResultsCard";
import { ImagesResultsCard } from '../components/SearchResults/ImagesResultsCard';
import { Attachment } from '../components/Attachment'; 
import { Comment } from '../components/Comment';
import { ChatLeft } from '../components/Chat/ChatLeft';
import { ChatRight } from '../components/Chat/ChatRight';
import { ChatCardFooter } from '../components/Chat/ChatCardFooter';
import { SessionsByDevice } from '../components/Analytics/SessionsByDevice';
import { MetricVsTarget } from '../components/Analytics/MetricVsTarget';
import { Activity } from '../components/Dropdowns/Activity';
import { WebsitePerformance } from '../components/Analytics/WebsitePerformance';
import { Messages } from '../components/Dropdowns/Messages';
import { TasksMedia } from '../components/ProjectsDashboards/TasksMedia';
import { ProjectsList } from '../components/ProjectsDashboards/ProjectsList';
import { SimpleLineChart } from '../Graphs/ReCharts/components/SimpleLineChart';
import { TinyAreaChart } from '../Graphs/ReCharts/components/TinyAreaChart';
import { TimelineMini } from '../components/Timeline/TimelineMini';
export const TrendAnalysis = () => (
    <Container>
          <HeaderMain 
            title="Trend Analysis"
            className="mb-5 mt-4"
        />
        <CardDeck>
            { /* START Card Widget */}
            <Card className="mb-3">
                <CardBody>
                    <ProfileOverviewCard 
                        title="Total Tweets"
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
                        title="Total Tweets"
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
                        title="Total Tweets"
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
                        title="Total Tweets"
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
        
           </Container>
);

export default TrendAnalysis;
