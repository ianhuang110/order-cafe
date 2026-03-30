import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.14.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { items, details, baseUrl } = await req.json();

    // 將購物車項目轉換為 Stripe 的格式
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "twd", // 台幣
        product_data: {
          name: item.name,
          description: item.modifiers ? JSON.stringify(item.modifiers) : undefined,
        },
        unit_amount: item.unitPrice, // Stripe TWD value is exactly the integer value (1 TWD = 1)
      },
      quantity: item.quantity,
    }));

    // 建立 Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}?payment=success`,
      cancel_url: `${baseUrl}?payment=cancel`,
      customer_email: undefined, // 可選：如果 details 裡有 email 可以在這塞
      metadata: {
        customerName: details.name,
        customerPhone: details.phone,
      },
    });

    return new Response(JSON.stringify({ paymentUrl: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
