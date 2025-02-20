import React, { useState } from "react";
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ApiDoc from "./ApiDoc";
import "./Dev.css";
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
  // Table,
  Form,
  button,
  textarea,
} from "../../components";
import {des} from "./api"
import { CopyBlock, solarizedLight,dracula } from "react-code-blocks";
import { HeaderMain } from "../components/HeaderMain";
export const DeveloperPortal = () => {
  const [Apikey, setApikey] = useState("Click your button below for you devloper API token");
  const [obj, setObj] = useState(des);
  
  const handleButton = () => {
    setApikey(localStorage.getItem('token'))
    
  };
  return (
    <Container>
      <HeaderMain title="Developer Portal" className="mb-5 mt-4" />
      <Card className="mb-3">
        <CardBody>
          <code>Apikey</code>
          <CopyBlock

            language={'js'}
            text={`Bearer ${Apikey}`}
            showLineNumbers={false}
            theme={dracula}
            codeBlock
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
      {obj.map(({ endpoint, response, description, queryParams }) => (
       <ApiDoc
         key={endpoint}
         endpoint={endpoint}
         response={response}
         description={description}
         queryParams={queryParams}
       
       />
              ))}
    
      
    </Container>
  );
};

export default DeveloperPortal;
