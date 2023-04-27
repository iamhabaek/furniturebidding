import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { SimpleCard } from "@gull";
import AllBids from "./AllBids";
import { useAuth } from "app/appContext";
import WonBids from "./WonBids";
const customTabHeader = (title, icon) => (
  <div className="d-flex align-items-center">
    <span className="mr-2">
      <i className={icon}></i>
    </span>
    <span>{title}</span>
  </div>
);

const MyBids = () => {
  const { biddings, user, products, orders } = useAuth();
  return (
    <div>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <SimpleCard title="My Bids">
            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
              <Tab
                eventKey="all"
                title={customTabHeader("All Bids", "i-Newspaper")}
              >
                <AllBids
                  products={products}
                  userId={user.uid}
                  biddings={biddings}
                />
              </Tab>
              <Tab
                eventKey="won"
                title={customTabHeader("Won Bids", "i-Medal-3")}
              >
                <WonBids
                  products={products}
                  userId={user.uid}
                  biddings={biddings}
                  orders={orders}
                />
              </Tab>
            </Tabs>
          </SimpleCard>
        </Col>
      </Row>
    </div>
  );
};

export default MyBids;
