import React, { useState } from "react";
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
  Table,
  Form,
  button,
  textarea,
} from "../../components";
import { CopyBlock, solarizedLight } from "react-code-blocks";
import { HeaderMain } from "../components/HeaderMain";
export const DeveloperPortal = () => {
  const [Apikey, setApikey] = useState("Click your button below for you devloper API token");
 
  
  const handleButton = () => {
    setApikey(localStorage.getItem('token'))
    
  };
  return (
    <Container>
      <HeaderMain title="Developer Portal" className="mb-5 mt-4" />
      <Card className="mb-3">
        <CardBody>
          <CopyBlock

            language={'js'}
            text={Apikey}
            showLineNumbers={false}
            theme={solarizedLight}
            wrapLines={false}
        />
            <Button
              style={{
                backgroundColor: "#006A6D",
                height: 50,
                width: 100,
                marginTop: 20,
              }}
              class="btn btn-primary"
              type="button"
              onClick={handleButton}
            >
              Get Token
              {/* <button onclick="myFunction()">alert("Form Submitted");</button> */}
            </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DeveloperPortal;
