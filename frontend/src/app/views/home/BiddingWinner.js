import { useAuth } from "app/appContext";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Confetti from "react-dom-confetti";
const BiddingWinner = () => {
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
  const findWinner =
    filteredBiddings.length !== 0 &&
    filteredBiddings.reduce((acc, current) => {
      if (current.bidAmount > acc.bidAmount) {
        return current;
      } else {
        return acc;
      }
    });
  console.log(findWinner);
  const config = {
    angle: "129",
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };
  const handleSelect = (idx) => {
    setSelectedImage(idx);
    setBorder("border-warning");
  };
  return (
    <div>
      {product && (
        <section className="ul-product-detail">
          <Confetti config={config} active={findWinner} />
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
                        {findWinner && (
                          <h3 className="font-weight-700 text-primary mb-0 mr-2">
                            Final Bid &#8369; {findWinner.bidAmount}
                          </h3>
                        )}
                      </div>

                      <h3 className="font-weight-700 text-primary mt-5 mb-0 mr-2">
                        {users.find((user) => user.uid === findWinner.userId)
                          ? users.find((user) => user.uid === findWinner.userId)
                              .displayName
                            ? `Winner ${
                                users.find(
                                  (user) => user.uid === findWinner.userId
                                ).displayName
                              }`
                            : `Winner ${
                                users.find(
                                  (user) => user.uid === findWinner.userId
                                ).email
                              }`
                          : "No Biddings on this product"}
                      </h3>
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

export default BiddingWinner;
