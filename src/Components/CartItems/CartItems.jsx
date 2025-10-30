import { memo, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import "./CartItems.css";

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    updateCartItem,
  } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitmes-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        const qty = cartItems[product.id];
        if (qty > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format cartitmes-format-main">
                <img
                  src={product.image}
                  alt={product.name}
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.new_price}</p>

                <div className="qty-buttons">
                  <button
                    onClick={() =>
                      qty > 1 && updateCartItem(product.id, qty - 1)
                    }
                    className="qty-btn"
                  >
                    -
                  </button>

                  <span className="qty-number">{qty}</span>

                  <button
                    onClick={() => updateCartItem(product.id, qty + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <p>${product.new_price * qty}</p>

                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  alt="remove"
                  onClick={() => removeFromCart(product.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItems);
