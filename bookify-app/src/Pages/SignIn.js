import "../App.css";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

const SignIn = () => {
  const firebase = useFirebase();

  // --- Handle Form Validation ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  // === Toggle Password Eye Icon ===
  const [showPassword, setShowPassword] = useState(false);
  const handlTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // === If User is Already LoggedIn ===
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/home", { replace: true });
    } else {
      navigate("/");
    }
  }, [firebase, navigate]);

  const changeMode = () => {
    navigate("/signup");
  };

  const submitForm = async () => {
    var emailPattern = /[a-zA-Z0-9]+[@][a-z]+[\\.][a-z]{2,3}$/;
    if (email === "" || emailPattern.test(email) === false) {
      setEmailErr(true);
      return;
    }

    if (password === "" || password.length < 6) {
      setPasswordErr(true);
      return;
    }

    if (!emailErr && !passwordErr) {
      const formData = {
        email,
        password,
      };
      console.log("FormData=> ", formData);

      const result = await firebase.signInUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Success", result);
      // alert("LoggedIn!");

      setEmail("");
      setPassword("");
    }
    navigate("/home", { replace: true });
  };

  // === Reset Error ===
  const emailHandler = () => {
    var emailPattern = /[a-zA-Z0-9]+[@][a-z]+[\\.][a-z]{2,3}$/;
    if (email !== "" || emailPattern.test(email) === false) {
      setEmailErr(false);
      return;
    }
  };

  const passwordHandler = () => {
    if (password !== "" || password.length >= 6) {
      setPasswordErr(false);
      return;
    }
  };
  // === Reset Error ===
  // --- Handle Form Validation ---

  return (
    <div className="">
      <Container>
        <Row>
          <Col md={4} sm={6} className="m-auto my-5 shadow p-5">
            <h2 className="signUpHeader text-center mb-5">Sign In</h2>
            <Form>
              {/* =========== Email ============ */}
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-4"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className="relative"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={emailHandler}
                />
                <p>
                  {emailErr ? (
                    <span className="absolute text-danger">Invalid Email</span>
                  ) : (
                    ""
                  )}
                </p>
              </FloatingLabel>
              {/* =========== Email ============ */}

              {/* =========== Password ============ */}
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-4"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="relative eyeInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={passwordHandler}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="eyeIcon"
                  onClick={handlTogglePassword}
                />
                <p className="absolute text-danger">
                  {passwordErr ? <span>Invalid Password</span> : ""}
                </p>
              </FloatingLabel>
              {/* =========== Password ============ */}
            </Form>
            <div className="d-lg-flex justify-content-between mt-2">
              <p className="mt-1">
                Don't have account ?{" "}
                <Link
                  className="text-primary link"
                  to="/signup"
                  onClick={changeMode}
                >
                  Sign up
                </Link>
              </p>
              <Button type="submit" className="submitBtn" onClick={submitForm}>
                Submit
              </Button>
            </div>
            <p className="my-3">
              <span>-</span>OR<span>-</span>
            </p>
            <Button
              type="button"
              className=""
              variant="danger"
              onClick={firebase.signInWithGoogle}
            >
              Sign In with Google
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
