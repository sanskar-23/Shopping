import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbError404Off } from "react-icons/tb";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-12">
            {cart?.length > 0 && (
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.token ? auth?.user?.name : "Guest"}`}
              </h1>
            )}

            <h4 className="text-center">
              {cart?.length ? (
                `You have ${cart?.length} itmes in Your Cart ${
                  auth?.token ? "" : "Please Login To Checkout"
                } `
              ) : (
                <>
                  <div className="no-products-container">
                    <div className="no-products-message">
                      <h2>Your Cart is Empty</h2>
                    </div>
                    <img
                      src="./../images/empty-cart.svg"
                      alt=""
                      style={{ maxWidth: "100%", height: "70%" }}
                    />
                  </div>
                </>
              )}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="grid-container">
              {cart?.map((p) => (
                <div className="product-link" key={p?._id}>
                  <div className="card">
                    <img
                      src={`/api/v1/product/product-photo/${p?._id}`}
                      alt={p?.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p?.name}</h5>
                      <p className="card-text">
                        {truncateDescription(p?.description, 100)}
                      </p>
                      <h5 className="card-title card-price">
                        {p?.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeCartItem(p?._id);
                          toast.success("Removed From Cart");
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {cart?.length > 0 && (
            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()}</h4>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
