'use client';
import {CartContext, cartProductPrice} from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";

class OrderPageTemplate {
  constructor() {
    this.state = {
      order: null,
      loadingOrder: true,
    };
  }

  loadOrder(id) {
    throw new Error("Must implement loadOrder method");
  }

  renderOrder(order, subtotal) {
    throw new Error("Must implement renderOrder method");
  }

  componentDidMount() {
    const {id} = useParams();
    if (typeof window.console!== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    this.loadOrder(id);
  }

  render() {
    const {order, loadingOrder} = this.state;
    let subtotal = 0;
    if (order?.cartProducts) {
      for (const product of order?.cartProducts) {
        subtotal += cartProductPrice(product);
      }
    }

    return (
      <section className="max-w-2xl mx-auto mt-8">
        <div className="text-center">
          <SectionHeaders mainHeader="Your order" />
          <div className="mt-4 mb-8">
            <p>Thanks for your order.</p>
            <p>We will call you when your order will be on the way.</p>
          </div>
        </div>
        {loadingOrder && (
          <div>Loading order...</div>
        )}
        {order && (
          this.renderOrder(order, subtotal)
        )}
      </section>
    );
  }
}

class OrderPage extends OrderPageTemplate {
  loadOrder(id) {
    if (id) {
      this.setState({ loadingOrder: true });
      fetch('/api/orders?_id='+id).then(res => {
        res.json().then(orderData => {
          this.setState({ order: orderData, loadingOrder: false });
        });
      })
    }
  }

  renderOrder(order, subtotal) {
    return (
      <div className="grid md:grid-cols-2 md:gap-16">
        <div>
          {order.cartProducts.map(product => (
            <CartProduct key={product._id} product={product} />
          ))}
          <div className="text-right py-2 text-gray-500">
            Subtotal:
            <span className="text-black font-bold inline-block w-8">${subtotal}</span>
            <br />
            Delivery:
            <span className="text-black font-bold inline-block w-8">$5</span>
            <br />
            Total:
            <span className="text-black font-bold inline-block w-8">
              ${subtotal + 5}
            </span>
          </div>
        </div>
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs
              disabled={true}
              addressProps={order}
            />
          </div>
        </div>
      </div>
    );
  }
}