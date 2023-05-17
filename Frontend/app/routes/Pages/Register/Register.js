import React, { useState } from "react";
import { Link } from "react-router-dom";
import colors from "../../../colors";

import {
  Form,
  FormGroup,
  FormText,
  Input,
  CustomInput,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer,
} from "./../../../components";
import { Alert } from "reactstrap";

import { Paper, Typography } from "@mui/material";
import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const COLORS = [
  colors["primary"],
  colors["red"],
  colors["success"],
  colors["yellow"],
];

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const submitSignup = async () => {
    // dispatch(loginStart());
    try {
      
      const res = await Axios.post(`${process.env.REACT_APP_API}/` + "user/register", { email, password,name:username });
      const { user, message } = res.data;
      // localStorage.setItem("token", user.token);
      // Axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      history.push("/pages/login");
      // setBearer(user.token);
      // dispatch(loginSuccess({ user }));
    } catch (errorPromise) {
      // console.error(error)
      let error = await errorPromise;
      setError(error.response.data.errMessage);
      console.error(error.response);
    }
  };

  const onFieldChange = async (e) => {
    switch (e.target.name) {
      case "text":
        setUsername(e.target.value);
        break;
      case "password":
        setpassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  };

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        <Paper elevation={3} sx={{ width: "150%", padding: "5rem" }}>
          {/* START Header */}
          <HeaderAuth title="Create Account" />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3">
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="text"
                id="username"
                placeholder="Enter a Username..."
                className="bg-white"
                onChange={onFieldChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={onFieldChange}
                placeholder="Password..."
                className="bg-white"
              />
            </FormGroup>

            <FormGroup>
              <Label for="emailAdress">Email Adress</Label>
              <Input
                type="email"
                name="email"
                id="emailAdress"
                onChange={onFieldChange}
                placeholder="Enter email..."
                className="bg-white"
              />
              {/* <FormText color="muted">
                        We&amp;ll never share your email with anyone else.
                    </FormText> */}
            </FormGroup>

            <ThemeConsumer>
              {({ color }) => (
                <Button color={color} onClick={submitSignup}>
                  Create Account
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}

          {/* END Bottom Links */}
          {/* START Footer */}
          {/* <FooterAuth /> */}
          {/* END Footer */}
          {error && (
            <Alert
              color="danger"
              style={{
                backgroundColor: "rgba(248, 215, 218, 0.5)",
              }}
            >
              <Typography
                style={{
                  fontSize: "15px",
                  color: "#792046",
                  display: "inline",
                }}
              >
                {" "}
                {error}{" "}
              </Typography>
              {/* </span> */}
            </Alert>
          )}
        </Paper>
      </EmptyLayout.Section>
    </EmptyLayout>
  );
};

export default Register;
