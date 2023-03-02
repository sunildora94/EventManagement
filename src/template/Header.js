import { Container, Nav, Navbar } from 'react-bootstrap';
import constants from '../helpers/en';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('loggedInstatus');
    navigate('/');
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">{constants.SITE_BRAND_TITLE}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={() => handleLogout()}>
              {constants.LOGOUT_LINK_TEXT}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
