import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import {
  Navbar,
  Offcanvas,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.css'

export const Header = () => {

  return (
    <Navbar className={styles.navbar} sticky="top" expand={false}>
      <Container>
        <Navbar.Brand href="/" className={styles.brand}>
          <span className={styles.ivory}>Ivory</span>
          <span className={styles.tab}>Tab</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`menu`} className={styles.toggle} />
        <Navbar.Offcanvas placement={'end'} id={'menu'} aria-labelledby={'menu'} className={styles.menu}>
          <Offcanvas.Header closeButton className={styles.title}>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className={styles.nav}>
              <Link to={{ pathname: '/'}} className={styles.option}>Home</Link>
              <a href="https://www.linkedin.com/in/matthew-bone-05a73a160/" className={styles.option}>LinkedIn</a>
              <a href="https://github.com/matthewbbone" className={styles.option}>GitHub</a>
              <a href="https://bone-public.s3.amazonaws.com/BoneCurriculumVitae.pdf" className={styles.option}>Curriculum Vitae</a>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
