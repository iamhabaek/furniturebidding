import { SimpleCard } from "@gull";
import { useAuth } from "app/appContext";
import React from "react";
import { useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addBidding } from "app/reducers/actions/FurnitureActions";
import { nanoid } from "nanoid";
import Avatar from "react-avatar";
import { getTimeDifference } from "@utils";
const ProductDetails = () => {
  const { products, user, users, biddings, dispatch } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [border, setBorder] = useState("");
  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  const filteredBiddings = biddings.filter(
    (bidding) => bidding.productId === id
  );
  console.log(filteredBiddings);
  const handleBid = async () => {
    const bidding = {
      productId: id,
      userId: user.uid,
      bidAmount: bidAmount,
      created: Date.now(),
      id: nanoid(),
    };
    console.log(bidding);
    await addBidding(bidding)(dispatch);
  };

  const handleSelect = (idx) => {
    setSelectedImage(idx);
    setBorder("border-warning");
  };
  return (
    <div>
      {product && (
        <section className="ul-product-detail">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="ul-product-detail__image ">
                        <img
                          src={product.productImages[selectedImage]}
                          alt="product-image"
                        />
                      </div>
                      <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                        {product.productImages.map((product, idx) => (
                          <div
                            className={`ml-2 ${
                              selectedImage && "border-warning"
                            }`}
                          >
                            <img
                              // onClick={}
                              src={product}
                              onMouseEnter={() => handleSelect(idx)}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ul-product-detail__brand-name mb-4">
                        <h5 className="heading">{product.productName}</h5>
                      </div>

                      <div className="ul-product-detail__price-and-rating d-flex align-items-baseline">
                        <h3 className="font-weight-700 text-primary mb-0 mr-2">
                          Starting Bid &#8369; {product.startingBid}
                        </h3>
                      </div>

                      <div className="ul-product-detail__features mt-3">
                        <h6 className=" font-weight-700">
                          Product Description:
                        </h6>
                        <span className="align-middle">
                          {product.description}
                        </span>
                      </div>

                      <div className="ul-product-detail__quantity d-flex align-items-center mt-3">
                        <input
                          type="number"
                          className="form-control col-2"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleBid}
                          className="btn btn-primary m-1"
                        >
                          <i className="i-Full-Cart text-15"> </i>
                          Add Bid
                        </button>
                      </div>
                      <Col
                        lg={8}
                        md={8}
                        sm={8}
                        xs={12}
                        className="mb-4 d-flex align-items-center mt-3"
                      >
                        {user.uid === product.userId && (
                          <SimpleCard title="Recent Bids">
                            <div className="ul-widget-app__recent-messages">
                              {filteredBiddings.map((bidding) => (
                                <div className="ul-widget-app__row-comments border-bottom-gray-200 mb-0">
                                  <div className="ul-widget-app__profile-pic mr-3">
                                    {users.find(
                                      (user) => user.uid === bidding.userId
                                    ) ? (
                                      users.find(
                                        (user) => user.uid === bidding.userId
                                      ).photoURL ? (
                                        <Avatar
                                          src={
                                            users.find(
                                              (user) =>
                                                user.uid === bidding.userId
                                            ).photoURL
                                          }
                                          size={50}
                                          round
                                        />
                                      ) : (
                                        <Avatar
                                          name={`${
                                            users.find(
                                              (user) =>
                                                user.uid === bidding.userId
                                            ).displayName
                                              ? users.find(
                                                  (user) =>
                                                    user.uid === bidding.userId
                                                ).displayName
                                              : users.find(
                                                  (user) =>
                                                    user.uid === bidding.userId
                                                ).email
                                          }`}
                                          size={50}
                                          round
                                        />
                                      )
                                    ) : (
                                      "No user found"
                                    )}
                                  </div>
                                  <div className="ul-widget-app__comment">
                                    <div className="ul-widget-app__profile-title">
                                      <h6 className="heading">
                                        {users.find(
                                          (user) => user.uid === bidding.userId
                                        )
                                          ? users.find(
                                              (user) =>
                                                user.uid === bidding.userId
                                            ).displayName
                                            ? users.find(
                                                (user) =>
                                                  user.uid === bidding.userId
                                              ).displayName
                                            : users.find(
                                                (user) =>
                                                  user.uid === bidding.userId
                                              ).email
                                          : "User doesn't have a name"}
                                      </h6>
                                      <p className="mb-2">
                                        Bid Amount: &#8369;{bidding.bidAmount}
                                      </p>
                                    </div>
                                    <div className="ul-widget-app__profile-status">
                                      <small className="text-mute">
                                        {getTimeDifference(
                                          new Date(bidding.created)
                                        )}{" "}
                                        ago
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </SimpleCard>
                        )}
                      </Col>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
