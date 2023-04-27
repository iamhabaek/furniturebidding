import React, { useEffect, useState, Fragment } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Breadcrumb } from "@gull";
import { useAuth } from "app/appContext";
import { Link, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { addOrder } from "app/reducers/actions/FurnitureActions";
import Swal from "sweetalert2";
import LaddaButton, { EXPAND_LEFT } from "react-ladda/dist/LaddaButton";

const CreateInvoice = () => {
  const { products, users, biddings, dispatch } = useAuth();

  const { id } = useParams();
  const product = products.find((product) => product.id === id);
  const filteredBiddings = biddings.filter(
    (bidding) => bidding.productId === id
  );
  const findWinner =
    filteredBiddings.length !== 0 &&
    filteredBiddings.reduce((acc, current) => {
      if (current.bidAmount > acc.bidAmount) {
        return current;
      } else {
        return acc;
      }
    });
  const bidAmount = findWinner.bidAmount;
  const [loading, setLoading] = useState();
  const [vat, setVat] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const handleSubmit = async () => {
    if (!vat && totalAmount) {
    }
    const order = {
      id: nanoid(),
      productId: id,
      userId: findWinner.userId,
      isPaid: false,
      amountToPay: totalAmount,
      created: Date.now(),
    };
    setLoading(true);
    await addOrder(order)(dispatch);
    setLoading(false);
  };

  const handleChange = (e) => {
    setVat(e.target.value);
  };
  const calculate = (vat, total) => {
    const VAT = total * (vat / 100);
    const amount = total + VAT;
    setTotalAmount(amount);
  };

  // const totalAmount = bidAmount + bidAmount * (vat / 100);
  return (
    <div>
      <Breadcrumb routeSegments={[{ name: "Create Invoice" }]}></Breadcrumb>

      {findWinner && product ? (
        <div className="invoice-viewer py-3">
          <Fragment>
            <Form className="px-3">
              <div className="viewer_actions d-flex justify-content-end">
                <div className="mb-4">
                  <Link
                    to="/seller/my-products"
                    className="btn btn-warning mr-3 py-2"
                    variant="warning"
                    // onClick={() => this.props.toggleInvoiceEditor()}
                  >
                    Cancel
                  </Link>
                  <LaddaButton
                    className="btn btn-primary"
                    loading={loading}
                    progress={0.5}
                    data-style={EXPAND_LEFT}
                    onClick={handleSubmit}
                  >
                    Submit
                  </LaddaButton>
                </div>
              </div>
              <div className="mt-3 mb-4 border-top"></div>
              <div className="row mb-5">
                <div className="col-md-6">
                  <h5 className="font-weight-bold">Bill From</h5>
                  <h5>
                    {users.find((user) => user.uid === product.userId)
                      ? users.find((user) => user.uid === product.userId)
                          .displayName
                        ? users.find((user) => user.uid === product.userId)
                            .displayName
                        : users.find((user) => user.uid === product.userId)
                            .email
                      : "No user found"}
                  </h5>
                </div>

                <div className="col-md-6 text-right">
                  <h5 className="font-weight-bold">Bill To</h5>
                  <h5>
                    {users.find((user) => user.uid === findWinner.userId)
                      ? users.find((user) => user.uid === findWinner.userId)
                          .displayName
                        ? users.find((user) => user.uid === findWinner.userId)
                            .displayName
                        : users.find((user) => user.uid === findWinner.userId)
                            .email
                      : "No user found or No bids in this product"}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 table-responsive">
                  <table className="table table-hover mb-3">
                    <thead className="bg-gray-300">
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{product.productName}</td>
                        <td className="text-middle">
                          <img
                            src={product.productImages[0]}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                        <td>{findWinner.bidAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12">
                  <div className="invoice-summary invoice-summary-input float-right">
                    <p className="d-flex align-items-center">
                      Vat(%):
                      <span>
                        <FormControl
                          type="text"
                          className="small-input"
                          name="vat"
                          value={vat}
                          onChange={handleChange}
                        />
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          calculate(Number(vat), Number(bidAmount))
                        }
                        className="btn btn-primary"
                      >
                        calculate
                      </button>
                    </p>
                    <h5 className="font-weight-bold d-flex align-items-center">
                      Grand Total:
                      <span> &#8369; {totalAmount}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </Form>
          </Fragment>
        </div>
      ) : (
        "No bid winner in this product"
      )}
    </div>
  );
};

export default CreateInvoice;
