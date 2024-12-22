"use client";

import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import Image from "next/image";

const page = () => {
  const [orderId, setOrderId] = useState("968");
  const [orderAmount, setOrderAmount] = useState(85222);
  const [customerPhone, setCustomerPhone] = useState("7691961139");
  const [response, setResponse] = useState(null);
  let cashfree: any;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();
  const doPayment = async (paymentSessionId: String) => {
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };
  const createOrder = async () => {
    try {
      const res = await fetch("/api/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_amount: orderAmount,
          order_currency: "INR",
          order_id: orderId,
          customer_details: {
            customer_id: "devstudio_user",
            customer_phone: "7691961139",
          },
          order_meta: {
            return_url: `https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id=${orderId}`,
          },
        }),
      });

      const data = await res.json();
      setResponse(data);
      await doPayment(data?.data.payment_session_id);
    } catch (error: any) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex items-center justify-center  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-center flex-col gap-5">
        <input
          className="p-2 rounded bg-black text-white border-white border-solid border-2"
          type="text"
          name="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e?.target?.value)}
          id=""
        />
        <input
          className="p-2 rounded bg-black text-white border-white border-solid border-2"
          type="tel"
          name="amount"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e?.target?.value)}
          id=""
        />
        <input
          className="p-2 rounded bg-black text-white border-white border-solid border-2"
          type="number"
          name="amount"
          value={orderAmount}
          onChange={(e) => setOrderAmount(parseInt(e?.target?.value))}
          id=""
        />
        <button
          className="bg-[#1D0751] w-full flex items-center justify-center text-white px-4 py-2 rounded-xl font-bold"
          onClick={() => createOrder()}
        >
          <Image
            src={"/cashfree_logo.jpg"}
            width={40}
            height={40}
            alt="logo"
            className=""
          />{" "}
          Payment
        </button>
      </div>

      {/* <Checkout paymentSessionId={response?.data?.payment_session_id} /> */}
    </div>
  );
};
export default page;
