import React, { Fragment, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <h1>You haven't added anything in Store.</h1>
          <Link to="/products">View Products</Link>
          <img src="/svg.png" />
        </div>
      ) : (
        <Fragment>
          <h1 className="cart-head">My Store</h1>
          <div className="cart-pg">
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Total Price</p>
              </div>

              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">
                      {`₹${item.price * item.quantity}`}
                    </p>
                  </div>
                ))}
            </div>
            <div className="cartGrossProfit">
              <div className="cartGrossProfitBox">
                <p>Total Amount</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <form>
                <div>
                  <input
                    type="checkbox"
                    onClick={() => setShowMediaIcons(!showMediaIcons)}
                  />
                  Agree to our Terms & Conditions
                </div>
                <input
                  type="submit"
                  value="Check Out"
                  className={showMediaIcons ? "uncheck check" : "uncheck"}
                  onClick={checkoutHandler}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
