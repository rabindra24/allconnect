import { NextRequest, NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = "";
Cashfree.XClientSecret = "";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export async function POST(req: NextRequest) {
  try {
    const {
      order_amount,
      order_currency,
      order_id,
      customer_details,
      order_meta,
    } = await req.json();

    // console.log(order_amount)
    // console.log(order_currency)
    // console.log(order_id)
    // console.log(customer_details)
    // console.log(order_meta)

    const request = {
      order_amount,
      order_currency,
      order_id,
      customer_details,
      order_meta,
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    // console.log(response)

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || error.message,
      },
      { status: 500 }
    );
  }
}
