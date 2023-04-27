import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { SimpleCard } from "@gull";
import { useAuth } from "app/appContext";
import { loadStripe } from "@stripe/stripe-js";

import Payment from "./Payment";
const WonBids = ({ userId, orders, products }) => {
  const filterOrders = orders.filter((order) => order.userId === userId);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5001/furniturebidding-68086/us-central1/app/config"
    ).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  console.log(stripePromise);
  console.log(clientSecret);
  useEffect(() => {
    fetch(
      "http://127.0.0.1:5001/furniturebidding-68086/us-central1/app/create-payment-intent",
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    ).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);
  return (
    <div className="mt-5">
      <Row>
        {filterOrders.map((order) => (
          <Col lg={12} md={12} sm={12} xs={12}>
            <SimpleCard>
              <div className="d-flex flex-row align-items-center">
                {products.find((product) => product.id === order.productId) && (
                  <img
                    src={
                      products.find((product) => product.id === order.productId)
                        .productImages[0]
                    }
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <div className="d-flex flex-column ml-5">
                  <h3>
                    {products.find(
                      (product) => product.id === order.productId
                    ) &&
                      products.find((product) => product.id === order.productId)
                        .productName}
                  </h3>
                  <p>Amount to pay: &#8369;{order.amountToPay}</p>
                  {/* <button className="btn btn-info">Pay Now</button>
                   */}
                  {order.isPaid ? (
                    "Paid"
                  ) : (
                    <Payment
                      stripePromise={stripePromise}
                      clientSecret={clientSecret}
                      orderId={order.id}
                    />
                  )}
                </div>
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WonBids;
