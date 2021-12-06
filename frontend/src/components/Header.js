import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>SneakShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link onClick={() => navigate("/cart")}>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </Nav.Item>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Nav.Link onClick={() => navigate("/profile")}>
                      Profile
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Nav.Link onClick={() => navigate("/login")}>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </Nav.Item>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin">
                  <NavDropdown.Item>
                    <Nav.Link onClick={() => navigate("/admin/userlist")}>
                      Users
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link onClick={() => navigate("/admin/productlist")}>
                      Products
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link onClick={() => navigate("/admin/orderlist")}>
                      Orders
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
