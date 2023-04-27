import React, { useState } from "react";
import { Breadcrumb } from "@gull";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "app/appContext";
import { FormGroup, Row, Table, Col } from "react-bootstrap";
import { deleteProduct } from "app/reducers/actions/FurnitureActions";
import Swal from "sweetalert2";
const MyProducts = () => {
  const { products, user, dispatch } = useAuth();
  const [rowsPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const filteredProducts = products.filter(
    (product) => product.userId === user.uid
  );

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id)(dispatch);
  };

  return (
    <div>
      <Row>
        <Col xl="12">
          <Breadcrumb routeSegments={[{ name: "Product List" }]}></Breadcrumb>
        </Col>
        <Col xl="12">
          <FormGroup>
            <Link to={"/seller/add-product"} className="btn btn-info">
              Add Product
            </Link>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xl="12">
          <Table hover responsive>
            <thead>
              <tr>
                <th className="border-0 font-weight-semibold text-info">
                  Product Name
                </th>
                <th className="border-0 font-weight-semibold text-info">
                  Product Images
                </th>
                <th className="border-0 font-weight-semibold text-info">
                  Category
                </th>
                <th className="border-0 font-weight-semibold text-info">
                  Bid End Date
                </th>
                <th className="border-0 font-weight-semibold text-info">
                  Bid Status
                </th>
                <th className="border-0 font-weight-semibold text-info">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length !== 0 ? (
                filteredProducts
                  .filter((product) => product.productName)
                  .slice(rowsPerPage * page, rowsPerPage * (page + 1))
                  .map((product, ind) => (
                    <tr key={ind}>
                      <td valign="middle">{product.productName}</td>
                      <td>
                        {product.productImages.map((file) => (
                          <img
                            src={file}
                            alt="Preview"
                            key={file}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginLeft: "5px",
                            }}
                          />
                        ))}
                      </td>
                      <td>{product.category}</td>
                      <td>
                        {format(new Date(product.endDate), "dd/MM/yyy HH:mm")}
                      </td>
                      <td>
                        {new Date(product.endDate) <= Date.now() ? (
                          <Link
                            to={`/seller/add-invoice/${product.id}`}
                            className="btn btn-info"
                          >
                            Create Invoice
                          </Link>
                        ) : (
                          "Ongoing"
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default MyProducts;
