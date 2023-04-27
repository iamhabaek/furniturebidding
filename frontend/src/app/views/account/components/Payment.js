import React, { useEffect, useState, Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";
const Payment = ({ stripePromise, clientSecret }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Fragment>
        <Button className="text-capitalize" onClick={() => setShow(true)}>
          Pay Now
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
              </Elements>
            )}
          </Modal.Body>
        </Modal>
      </Fragment>
    </>
  );
};

export default Payment;
