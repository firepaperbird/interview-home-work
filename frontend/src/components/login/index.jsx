import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect, Provider } from "react-redux";
import { LOGIN_REQUEST, LOGOUT } from "../../actions/actionTypes";
//import Store from '../../store/configureStore'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { token, username } = this.props;
    if (token)
      this.setState((prevState) => ({ token: token }));
    if (username)
        this.setState((prevState) => ({ username: username}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const logUser = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    this.props.login(logUser);
    console.log(this.state.username);
  };
  render() {
    return (
      <div key={this.props.username}>
        <Container>
          <Row className="show-grid">
            <Col md={2}></Col>
            <Col md={8}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.login.token,
    status: state.login.status,
    username: state.login.username
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: ({ username, password }) =>
      dispatch({ type: LOGIN_REQUEST, user: username, password }),
    logout: () => dispatch({ type: LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
