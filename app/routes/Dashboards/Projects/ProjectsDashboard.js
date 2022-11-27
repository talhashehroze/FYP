import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Link } from 'react-router-dom';
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
    Col
} from './../../../components';
import { setupPage } from './../../../components/Layout/setupPage';

import { HeaderMain } from "../../components/HeaderMain";
import {
    TasksMedia
} from "../../components/ProjectsDashboards/TasksMedia";
import {
    TinyDonutChart
} from "../../components/ProjectsDashboards/TinyDonutChart"
import {
    TinyDonutChartAllProjects
} from "../../components/ProjectsDashboards/TinyDonutChartAllProjects"
import {
    TimelineMini
} from "../../components/Timeline/TimelineMini"
import { DraggableProjects } from './DraggableProjects';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ProjectsDashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
return(
    <Container>
        
        <Row className="mb-5">
            <Col lg={ 12 }>
                <HeaderMain 
                    title="Projects"
                    className="mb-4 mb-lg-5"
                />
                <p>
                    { faker.lorem.paragraph() }
                </p>
            </Col>
           
          
                  </Row>
        <Row>
            <Col lg={ 6 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-3">
                            Trending Keyword on Twitter
                        </CardTitle>
                       
                    </CardBody>
                    <Col lg={ 12 }>
              
                    <ListGroup flush>
                        <ListGroupItem action>
                            <TasksMedia 
                                iconColor="success"
                            />
                        </ListGroupItem>
                        <ListGroupItem action>
                            <TasksMedia 
                                iconColor="danger"
                                id="2"
                            />
                        </ListGroupItem>
                        <ListGroupItem action>
                            <TasksMedia 
                                iconColor="warning"
                                id="3"
                            />
                        </ListGroupItem>
                        <ListGroupItem action>
                            <TasksMedia 
                                id="4"
                            />
                        </ListGroupItem>
                        <ListGroupItem action tag={ Link } to="/apps/tasks/list" className="text-center">
                            View All Tasks
                            <i className="fa fa-angle-right ml-2"></i>
                        </ListGroupItem>
                    </ListGroup>
            </Col>
                </Card>
            </Col>
            
            <Col lg={ 6 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-3">
                            Enter Keyword to Perform Operation
                        </CardTitle>
                        {/* <InputGroup> */}
                            <Input placeholder="Enter  Keyword..." />
                            {/* <InputGroupAddon addonType="append">
                                <Button color="secondary" outline tag={ Link } to="/apps/projects/list">
                                    <i className="fa fa-search"></i>
                                </Button>
                            </InputGroupAddon> */}
 <div >
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu >
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
                <div style={{color:'red'}}>

                <button type="button" class=" ml-200 mt-5 btn btn-primary" onClick={ Link } to="/dashboards/analytics">Search</button>

                </div>

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
                        }                     

export default setupPage({
    pageTitle: 'Projects Dashboard'
})(ProjectsDashboard);