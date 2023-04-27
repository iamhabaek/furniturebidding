import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import api from "app/hooks/api";
import history from "@history";
import NotificationManager from "react-notifications/lib/NotificationManager";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_BIDDINGS = "GET_BIDDINGS";
export const ADD_BIDDING = "ADD_BIDDING";
export const GET_USERS = "GET_USERS";
export const GET_ORDERS = "GET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => async (dispatch) => {
  const response = await api.get("/products");
  const data = response.data.data;
  dispatch({
    type: GET_PRODUCTS,
    payload: data,
  });
};

export const getOrders = () => async (dispatch) => {
  const response = await api.get("/orders");
  const data = response.data.data;
  dispatch({
    type: GET_ORDERS,
    payload: data,
  });
};

export const getBiddings = () => async (dispatch) => {
  const response = await api.get("/biddings");
  const data = response.data.data;
  dispatch({
    type: GET_BIDDINGS,
    payload: data,
  });
};
export const getUsers = () => async (dispatch) => {
  const response = await api.get("/users");
  const data = response.data.data;
  dispatch({
    type: GET_USERS,
    payload: data,
  });
};
export const addProduct = (product, user) => async (dispatch) => {
  try {
    const response = await api.post("/products", product);
    const data = response.data.data;
    dispatch({
      type: ADD_PRODUCT,
      payload: data,
    });
    NotificationManager.success("Product Added Successfully");
    history.push("/seller/my-products");
  } catch (error) {
    console.log(error);
  }
};

export const addBidding = (bidding) => async (dispatch) => {
  try {
    const response = await api.post("/biddings", bidding);
    const data = response.data.data;
    dispatch({
      type: ADD_BIDDING,
      payload: data,
    });
    NotificationManager.success("Product Added Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const addOrder = (order) => async (dispatch) => {
  try {
    const response = await api.post("/orders", order);
    const data = response.data.data;
    dispatch({
      type: ADD_ORDER,
      payload: data,
    });
    NotificationManager.success("Product Added Successfully");
    history.push("/seller/my-products");
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  try {
    const response = await api.put(`/orders/${id}`, order);
    // const data = response.data.data;
    dispatch({
      type: UPDATE_ORDER,
      payload: order,
    });
    NotificationManager.success("Product Added Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.delete(`/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    NotificationManager.success("Product Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
};
