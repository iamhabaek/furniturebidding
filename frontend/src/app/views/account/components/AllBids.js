import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { SimpleCard } from "@gull";
const AllBids = ({ biddings, userId, products }) => {
  const filteredBiddings = biddings.filter(
    (bidding) => bidding.userId === userId
  );

  return (
    <div className="mt-5">
      <Row>
        {filteredBiddings?.map((bidding) => (
          <Col lg={12} md={12} sm={12} xs={12}>
            <SimpleCard>
              <div className="d-flex flex-row align-items-center">
                {products.find(
                  (product) => product.id === bidding.productId
                ) && (
                  <img
                    src={
                      products.find(
                        (product) => product.id === bidding.productId
                      )?.productImages[0]
                    }
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <div className="d-flex flex-column ml-5">
                  <h3>
                    {
                      products.find(
                        (product) => product.id === bidding.productId
                      )?.productName
                    }
                  </h3>
                  <p>Bid Amount: &#8369;{bidding.bidAmount}</p>
                  <p>
                    Bidding Status:
                    {bidding.created <= Date.now() ? "Done" : "Ongoing"}
                  </p>
                </div>
              </div>
            </SimpleCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllBids;
