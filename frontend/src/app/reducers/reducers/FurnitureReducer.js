import {
  ADD_BIDDING,
  ADD_ORDER,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_BIDDINGS,
  GET_ORDERS,
  GET_PRODUCTS,
  GET_USERS,
  UPDATE_ORDER,
} from "../actions/FurnitureActions";
export const initialState = {
  products: [],
  biddings: [],
  users: [],
  orders: [],
};

const FurnitureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case GET_BIDDINGS: {
      return {
        ...state,
        biddings: action.payload,
      };
    }
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case GET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    }
    case ADD_BIDDING: {
      return {
        ...state,
        biddings: [...state.biddings, action.payload],
      };
    }
    case ADD_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    }
    case UPDATE_ORDER: {
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, isPaid: action.payload.isPaid }
            : order
        ),
      };
    }
  }
};

export default FurnitureReducer;
