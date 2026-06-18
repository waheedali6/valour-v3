"use client"
import { removeItemInCart, updateQuantity } from '@/app/features/cart/cartSlice';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';



export default function Cart() {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart.value)
  const [note, setNote] = useState('');



  const updateQty = (id, qty) => {
      dispatch(updateQuantity({
        id,
        qty
      }))
  };

  const removeItem = (id) => {
    try {
      dispatch(removeItemInCart(id))
      toast.success("Product removed Successfully!")
    } catch (error) {
      toast.error("Something went wrong.", error)
    }

  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <section className="valour-cart">
        <div><Toaster position="bottom-right"
          reverseOrder={false} /></div>
        <div className="container">
          <h1 className="cart-title text-center">Cart</h1>

          {cart.length === 0 ? (
            <div className="empty-cart text-center">
              <p>Your cart is currently empty.</p>
              <Link href="/our-shop"><p className="continue-link">CONTINUE SHOPPING</p></Link>
            </div>
          ) : (
            <div className="row g-5">
              {/* ===== CART ITEMS ===== */}
              <div className="col-12 col-lg-8">
                <div className="cart-table">
                  <div className="cart-header row">
                    <div className="col-6 col-md-7">PRODUCT</div>
                    <div className="col-3 col-md-3 text-center">QUANTITY</div>
                    <div className="col-3 col-md-2 text-end">TOTAL</div>
                  </div>

                  {cart.map((item) => (
                    <div className="cart-row row align-items-center" key={item.id}>
                      <div className="col-6 col-md-7">
                        <div className="product-cell">
                          <div className="product-img-wrap">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="product-info">
                            <p className="product-name">{item.name}</p>
                            <p className="product-price">${item.price.toLocaleString()}</p>
                            <p className="product-edition">{item.edition}</p>
                            <button
                              className="remove-btn"
                              onClick={() => removeItem(item.id)}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-3 col-md-3 text-center">
                        <div className="qty-control">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-3 col-md-2 text-end">
                        <p className="row-total">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* ===== ORDER SUMMARY ===== */}
              <div className="col-12 col-lg-4">
                <div className="summary-card">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-line total-line">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()} USD</span>
                  </div>
                  <p className="summary-note">
                    Taxes and shipping calculated at checkout
                  </p>

                  <textarea
                    className="order-note"
                    placeholder="Order note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />

                  <a href='#' className='theme-btn know-btn'>Get Know More</a>
                </div>

                <div className="payment-section text-center">
                  <p className="we-accept">We accept</p>
                  <div className="payment-icons">
                    <span>AMEX</span>
                    <span>APPLE PAY</span>
                    <span>DINERS</span>
                    <span>DISCOVER</span>
                    <span>G PAY</span>
                    <span>MASTERCARD</span>
                    <span>VISA</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}