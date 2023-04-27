import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  formatDistanceToNow,
  parse,
} from "date-fns";
import { getTimeDifference } from "@utils";

const ProductList = ({ products }) => {
  const getTimeLeft = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return hours;
  };
  const getTimeStamp = (date) => {};
  const history = useHistory();
  const handleBid = (id) => {
    history.push(`/product/details/${id}`);
  };
  return (
    <div>
      {products && (
        <section className="product-cart">
          <div className="row list-grid mb-4">
            {products.map((product) => (
              <div className="list-item col-md-3">
                <div className="card o-hidden mb-4 d-flex flex-column">
                  <div className="list-thumb d-flex">
                    <img alt="" src={product.productImages[0]} />
                  </div>
                  <div className="flex-grow-1 d-bock">
                    <div className="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center">
                      <Link className="w-40 w-sm-100" to="/">
                        <div className="item-title">{product.productName}</div>
                      </Link>
                      <p className="m-0 text-muted text-small w-15 w-sm-100">
                        {product.category}
                      </p>
                      <p className="m-0 text-muted text-small w-15 w-sm-100">
                        &#8369; {product.startingBid}
                      </p>
                      <p className="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges">
                        <span className="badge badge-info">
                          {/* {`${differenceInHours(
                            new Date(product.endDate),
                            new Date()
                          )} hrs left`} */}
                          {new Date(product.endDate) <= Date.now()
                            ? "Bidding Done"
                            : `${getTimeLeft(product.endDate)} left`}
                        </span>
                      </p>
                      {new Date(product.endDate) <= Date.now() ? (
                        <Link
                          to={`/product/winner/${product.id}`}
                          className="btn btn-warning text-12 px-2 px-1"
                        >
                          View Bidding Winner!
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleBid(product.id)}
                          className="btn btn-warning text-12 px-2 px-1"
                        >
                          Bid now!
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductList;
