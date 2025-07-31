import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51ReelvPwZOMcb2nwhXQPwYJdmFydoPg7oTbnfeQFWhDd8oXSHJsBQcOwRGTkgKNv7GJ54vMB4x2I2mBxcAGPVf4200W9YsehNS");

export default function StripeButton() {
  const handleClick = async () => {
    const res = await fetch("http://localhost:5050/api/payment/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return <button onClick={handleClick}>Satın Al</button>;
}
