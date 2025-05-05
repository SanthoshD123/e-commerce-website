// import { Container, Row, Col } from 'react-bootstrap';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer>
//       <Container>
//         <Row>
//           <Col className='text-center py-3'>
//             <p>ASR tapes &copy; {currentYear}</p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };
// export default Footer;




import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="text-center mb-3">
            <h5>ASR Tapes</h5>
            <p>&copy; {currentYear} ASR Tapes. All Rights Reserved.</p>
          </Col>
          <Col md={4} className="text-center mb-3">
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:info@asrtapes.com" className="text-white">asrtapes@gmail.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-white">+91 75022 18233</a></p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Our Address</h5>
            <p>1/1,Alankattu Valasu, Anangoor Road,</p>
            <p>Namakkal, TamilNadu - 638183</p>
            <p>India</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
