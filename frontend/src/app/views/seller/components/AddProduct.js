import React, { useState } from "react";
import { Breadcrumb } from "@gull";
import { nanoid } from "nanoid";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { classList } from "@utils";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "app/appContext";
import CustomSelect from "./CustomSelect";
import DatePicker from "react-datepicker";
import { addProduct } from "app/reducers/actions/FurnitureActions";
import LaddaButton, { EXPAND_LEFT } from "react-ladda/dist/LaddaButton";
import { useHistory } from "react-router-dom";
const basicFormSchema = yup.object().shape({
  productName: yup
    .string()
    .min(10, "Please add at least 20 characters")
    .required("Product Name is required"),
  description: yup
    .string()
    .min(20, "Please add at least 20 characters")
    .required("Description is required"),
  productImages: yup
    .array()
    .of(
      yup.mixed().test("fileSize", "File too large", (value) => {
        return value && value.size <= 5000000; // 1MB
      })
    )
    .required("At least one image is required")
    .min(1, "Please select at least one image"),

  category: yup.string().required("Image is required"),
  endDate: yup.string().required("Time End is required"),
  startingBid: yup.number().required("Starting Bid is required"),
});
const AddProduct = () => {
  const { dispatch, user } = useAuth();
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const category = ["Living Room", "Bed Room", "Kitchen", "Bathroom"];
  const initialState = {
    productName: "",
    description: "",
    productImages: [],
    category: "",
    endDate: "",
    startingBid: 0,
  };
  const options = category.map((cat) => {
    return {
      label: cat,
      value: cat,
    };
  });
  const handleSubmit = (values, { setSubmitting }) => {
    let formData = new FormData();
    formData.append("id", nanoid());
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("endDate", values.endDate);
    formData.append("startingBid", values.startingBid);
    formData.append("userId", user.uid);
    formData.append("isDone", false);

    for (const key of Object.keys(values.productImages)) {
      formData.append("productImages", values.productImages[key]);
    }
    setTimeout(() => {
      addProduct(formData, user)(dispatch);
      setSubmitting(false);
    }, 2000);
  };
  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Products", path: "/seller" },
          { name: "Add Product" },
        ]}
      ></Breadcrumb>

      <div className="col-lg-12 mb-3">
        <div className="card">
          <div className="card-header bg-transparent">
            <h3 className="card-title">Please out all fields</h3>
          </div>
          <div>
            <div className="card-body">
              <Formik
                initialValues={initialState}
                validationSchema={basicFormSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  isValidating,
                }) => {
                  return (
                    <form
                      className="needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div>
                        <div>
                          <div
                            className={classList({
                              "form-group col-md-3": true,
                              "valid-field":
                                !errors.productImages && touched.productImages,
                              "invalid-field":
                                errors.productImages && touched.productImages,
                            })}
                          >
                            <label htmlFor="productImages">
                              Product Images
                            </label>
                            <div>
                              <Field id="productImages" name="productImages">
                                {({ field }) => (
                                  <div className="d-flex justify-content-between flex-row align-items-center">
                                    {" "}
                                    <label htmlFor="upload-multiple-file">
                                      <Button
                                        variant="outline-info"
                                        className="py-4"
                                        as="span"
                                      >
                                        <div className="flex flex-middle">
                                          <i className="i-Share-on-Cloud "> </i>
                                          <span>Add Image</span>
                                        </div>
                                      </Button>
                                    </label>
                                    <input
                                      type="file"
                                      id="upload-multiple-file"
                                      className="d-none"
                                      multiple
                                      onChange={(event) => {
                                        setPreviewImages(
                                          Array.from(event.target.files).map(
                                            (file) => URL.createObjectURL(file)
                                          )
                                        );
                                        setFieldValue(
                                          field.name,
                                          Array.from(event.target.files)
                                        );
                                      }}
                                    />
                                    <div className="d-flex flex-row justify-content-between">
                                      {previewImages.map((imageUrl) => (
                                        <img
                                          src={imageUrl}
                                          alt="Preview"
                                          key={imageUrl}
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            marginLeft: "5px",
                                          }}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </Field>
                              {errors.productImages && (
                                <div className="invalid-feedback">
                                  {errors.productImages}
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-12": true,
                              "valid-field":
                                !errors.productName && touched.productName,
                              "invalid-field":
                                errors.productName && touched.productName,
                            })}
                          >
                            <label htmlFor="productName">Product Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="productName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.productName}
                              placeholder="Enter product name"
                            />
                            {errors.productName && (
                              <div className="invalid-feedback">
                                {errors.productName}
                              </div>
                            )}
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-12": true,
                              "valid-field":
                                !errors.description && touched.description,
                              "invalid-field":
                                errors.description && touched.description,
                            })}
                          >
                            <label
                              htmlFor="description"
                              className="ul-form__label"
                            >
                              Product Description
                            </label>
                            <textarea
                              type=""
                              name="description"
                              className="form-control"
                              placeholder="Enter description"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.description}
                            />
                            {errors.description && (
                              <div className="invalid-feedback">
                                {errors.description}
                              </div>
                            )}
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-12": true,
                              "valid-field":
                                !errors.category && touched.category,
                              "invalid-field":
                                errors.category && touched.category,
                            })}
                          >
                            <label
                              htmlFor="category"
                              className="ul-form__label"
                            >
                              Product category
                            </label>
                            <CustomSelect
                              name="category"
                              options={options}
                              onChange={(value) =>
                                setFieldValue("category", value.value)
                              }
                              value={values.category}
                              required
                            />
                            {errors.category && (
                              <div className="invalid-feedback">
                                {errors.category}
                              </div>
                            )}
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-12": true,
                              "valid-field":
                                !errors.startingBid && touched.startingBid,
                              "invalid-field":
                                errors.startingBid && touched.startingBid,
                            })}
                          >
                            <label
                              htmlFor="startingBid"
                              className="ul-form__label"
                            >
                              Starting Bid
                            </label>
                            <input
                              type="number"
                              name="startingBid"
                              className="form-control"
                              placeholder="Enter starting bid"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.startingBid}
                            />
                            {errors.startingBid && (
                              <div className="invalid-feedback">
                                {errors.startingBid}
                              </div>
                            )}
                          </div>
                          <div
                            className={classList({
                              "form-group col-md-12": true,
                              "valid-field": !errors.endDate && touched.endDate,
                              "invalid-field":
                                errors.endDate && touched.endDate,
                            })}
                          >
                            <label htmlFor="endDate" className="ul-form__label">
                              Bidding End Date
                            </label>
                            <div>
                              <Field name="endDate">
                                {({ field, form }) => (
                                  <DatePicker
                                    className="form-control"
                                    selected={field.value}
                                    timeFormat="HH:mm"
                                    showTimeInput
                                    placeholderText="Choose date"
                                    onChange={(date) =>
                                      form.setFieldValue(field.name, date)
                                    }
                                  />
                                )}
                              </Field>
                            </div>
                            {errors.endDate && (
                              <div className="invalid-feedback">
                                {errors.endDate}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent">
                        <div className="mc-footer">
                          <div className="row">
                            <div className="col-lg-12 text-right">
                              <button
                                type="button"
                                className="btn btn-danger mr-2"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                              <LaddaButton
                                className="btn btn-info"
                                loading={isSubmitting}
                                progress={0.5}
                                data-style={EXPAND_LEFT}
                                type="submit"
                              >
                                Submit
                              </LaddaButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
