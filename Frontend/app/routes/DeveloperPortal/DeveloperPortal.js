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
  textarea
} from "../../components";
import { HeaderMain } from "../components/HeaderMain";
export const DeveloperPortal = () => {
    const [color,setcolor] = useState('#F9FAFC')
    return (
        <Container>
            <HeaderMain title="Developer Portal" className="mb-5 mt-4" />
            <Card className="mb-3">
                <CardBody>
                    <Form className="my-form" action="" method="post">
                        <div className="field">
                            <label for="name">Name</label>
                            <Input style={{ backgroundColor: '#F9FAFC', width: '100%', paddingTop: 10, paddingBottom: 10, borderRadius: 3, borderWidth: 1, borderStyle: 'solid', borderColor:'black' }} type="text" name="name" id="name" required />
                        </div>
                        <div className="field">
                            <label for="email">Email</label>
                            <Input style={{ backgroundColor: '#F9FAFC', width: '100%', paddingTop: 10, paddingBottom: 10, borderRadius: 3, borderWidth: 1, borderStyle: 'solid', borderColor:'black' , }} type="email" maxLength={4} name="eemail" id="email" required />
                        </div>
                        <div className="field">
                            <label for="name">Message</label>
                            <textarea onClick={()=>setcolor('white')} onMouseLeave={()=>setcolor('white')} style={{ backgroundColor: '#F9FAFC', width: '100%', paddingTop: 10, paddingBottom: 10, borderRadius: 3, borderWidth: 1, borderStyle: 'solid', }} typeof='text' rows="5" name="msg" id="msg" required />
                        </div>
                        <Button  style={{ backgroundColor: "#006A6D", height: 50, width: 100,marginTop:20}} class="btn btn-primary" type="button"  >
                      Search
                  </Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
}

export default DeveloperPortal;
