// import { useState, useEffect } from 'react';
// import { Form, Button, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import FormContainer from '../components/FormContainer';
// import CheckoutSteps from '../components/CheckoutSteps';
// import { savePaymentMethod } from '../slices/cartSlice';

// const PaymentScreen = () => {
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate('/shipping');
//     }
//   }, [navigate, shippingAddress]);

//   // Set initial payment method to GPay
//   const [paymentMethod, setPaymentMethod] = useState('GPay');

//   const dispatch = useDispatch();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate('/placeorder');
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 step3 />
//       <h1>Payment Method</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group>
//           <Form.Label as='legend'>Select Method</Form.Label>
//           <Col>
//             <Form.Check
//               className='my-2'
//               type='radio'
//               label='GPay'
//               id='GPay'
//               name='paymentMethod'
//               value='GPay'
//               checked={paymentMethod === 'GPay'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>

//             <Form.Check
//               className='my-2'
//               type='radio'
//               label='Debit Card'
//               id='DebitCard'
//               name='paymentMethod'
//               value='Debit Card'
//               checked={paymentMethod === 'Debit Card'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>

//             <Form.Check
//               className='my-2'
//               type='radio'
//               label='Cash on Delivery'
//               id='CashOnDelivery'
//               name='paymentMethod'
//               value='Cash on Delivery'
//               checked={paymentMethod === 'Cash on Delivery'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>
//           </Col>
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default PaymentScreen;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paymentMethod: storedPaymentMethod } = useSelector((state) => state.cart);
  
  const [paymentMethod, setPaymentMethod] = useState(storedPaymentMethod || "GPay");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    if (paymentMethod === "COD") {
      alert("Order placed successfully! Pay on delivery.");
      navigate("/placeorder");
    } else {
      alert("Payment Successful!");
      navigate("/placeorder");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <h1>Select Payment Method</h1>

      <Form.Group>
        <Form.Label as="legend">Choose Payment</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="Google Pay (GPay)"
            id="GPay"
            name="paymentMethod"
            value="GPay"
            checked={paymentMethod === "GPay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Debit Card"
            id="DebitCard"
            name="paymentMethod"
            value="Debit Card"
            checked={paymentMethod === "Debit Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Cash on Delivery (COD)"
            id="COD"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>
      </Form.Group>

      {/* Show UPI ID Field for GPay */}
      {paymentMethod === "GPay" && (
        <Form.Group className="mt-3">
          <Form.Label>Enter UPI ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          />
        </Form.Group>
      )}

      {/* Show Card Details for Debit Card */}
      {paymentMethod === "Debit Card" && (
        <>
          <Form.Group className="mt-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="password"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </Form.Group>
        </>
      )}

      <Button type="submit" variant="primary" className="mt-3">
        {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
      </Button>
    </Form>
  );
};

export default PaymentScreen;

