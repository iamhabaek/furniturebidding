import React from "react";
import { Field } from "formik";
import { Button } from "react-bootstrap";
const CustomeFileInput = ({ values, setFieldValue }) => {
  return (
    <div>
      <div className="d-flex justify-content-between flex-row align-items-center">
        <Field name="productImages">
          {({ field }) => (
            <div>
              <label htmlFor="upload-multiple-file">
                <Button className="btn-rounded" as="span">
                  <div className="flex flex-middle">
                    <i className="i-Share-on-Cloud "> </i>
                    <span>Multiple File</span>
                  </div>
                </Button>
              </label>
              <input
                type="file"
                id="upload-multiple-file"
                className="d-none"
                multiple
                onChange={(event) => {
                  setFieldValue(field.name, event.currentTarget.files);
                }}
              />
            </div>
          )}
        </Field>
        <div className="d-flex flex-row justify-content-between">
          {values.productImages &&
            [...values.productImages].map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={image.name}
                style={{ width: "50px", marginRight: "2px" }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomeFileInput;
