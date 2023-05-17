import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import colors from "../../../colors";
import { Alert } from "reactstrap";

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
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { HeaderAuth } from "../../components/Pages/HeaderAuth";

const COLORS = [
  colors["primary"],
  colors["red"],
  colors["success"],
  colors["yellow"],
];

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [error, setError] = useState("");

  const onFieldChange = async (e) => {
    switch (e.target.name) {
      case "password":
        setpassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  };
  const submitLogin = async () => {
    // dispatch(loginStart());
    try {
      
      const res = await Axios.post(`${process.env.REACT_APP_API}/` + "user/login", { email, password });
      const { user, message } = res.data;
      localStorage.setItem("token", user.token);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      history.push("/BotAccountRecognition");
      // setBearer(user.token);
      // dispatch(loginSuccess({ user }));
    } catch (errorPromise) {
      // console.error(error)
      let error = await errorPromise;
      setError(error.response.data.errMessage);
      console.error(error.response);
    }
  };

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        {/* START Header */}
        <Paper elevation={3} sx={{ width: "150%", padding: "5rem" }}>
          <HeaderAuth title="Sign In to Application" />
          {/* END Header */}
          {/* START Form */}

          <Form className="mb-3">
            <FormGroup>
              <Label for="emailAdress">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="emailAdress"
                placeholder="Enter Email..."
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
                placeholder="Password..."
                className="bg-white"
                onChange={onFieldChange}
              />
            </FormGroup>
            {/* START Bottom Links */}
            <div className="d-flex mt-1 mb-1">
              <Link
                to="/pages/register"
                className="ml-auto text-decoration-none"
              >
                Register
              </Link>
            </div>
            {/* END Bottom Links */}
            <ThemeConsumer>
              {({ color }) => (
                <Button color={color} block onClick={submitLogin}>
                  Sign In
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}

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

export default Login;
