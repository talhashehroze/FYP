import React, { useState } from "react";
import { Link } from "react-router-dom";

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

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

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
      const res = await Axios.post("http://localhost:3001/" + "user/login", {
        email,
        password,
      });
      const { user, message } = res.data;
      localStorage.setItem("token", user.token);
      Axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      history.push("/BotAccountRecognition");
      // setBearer(user.token);
      // dispatch(loginSuccess({ user }));
    } catch (erro) {
      // console.error(error)
      console.log(erro);
    }
  };

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        {/* START Header */}
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
            <FormText color="muted">
              We will never share your email with anyone.
            </FormText>
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
          <FormGroup>
            <CustomInput
              type="checkbox"
              id="rememberPassword"
              label="Remember Password"
              inline
            />
          </FormGroup>
          <ThemeConsumer>
            {({ color }) => (
              <Button color={color} block onClick={submitLogin}>
                Sign In
              </Button>
            )}
          </ThemeConsumer>
        </Form>
        {/* END Form */}
        {/* START Bottom Links */}
        <div className="d-flex mb-5">
          <Link to="/pages/forgotpassword" className="text-decoration-none">
            Forgot Password
          </Link>
          <Link to="/pages/register" className="ml-auto text-decoration-none">
            Register
          </Link>
        </div>
        {/* END Bottom Links */}
        {/* START Footer */}
        {/* <FooterAuth /> */}
        {/* END Footer */}
      </EmptyLayout.Section>
    </EmptyLayout>
  );
};

export default Login;
