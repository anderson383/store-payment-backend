export interface TokenizePaymentType {
  status: string;
  data: {
    id: string
    created_at: string
    brand: string
    name: string
    last_four: string
    bin: string
    exp_year: string
    exp_month: string
    card_holder: string
    created_with_cvc: boolean
    expires_at: string
    validity_ends_at: string
  }
}

export interface AcceptanceTokenType {
  status: string;
  data: {
    presigned_acceptance: {
      acceptance_token: string
    }
  }
}

export interface ExtraType {
  bin: string
  name: string
  brand: string
  exp_year: string
  card_type: string
  exp_month: string
  last_four: string
  card_holder: string
  is_three_ds: boolean
}

interface PaymentMethodType {
  type: string
  extra: ExtraType
  installments: number
}

export interface TransactionResponseType {
  status: string;
  data: {
    id: string
    created_at: string
    finalized_at: any
    amount_in_cents: number
    reference: string
    customer_email: string
    currency: string
    payment_method_type: string
    payment_method: PaymentMethodType
    status: string
    status_message: any
    billing_data: any
    shipping_address: any
    redirect_url: any
    payment_source_id: any
    payment_link_id: any
    customer_data: any
    bill_id: any
    taxes: any[]
    tip_in_cents: any
  }
}


export interface TransactionDetailResponse {
  data:{
    id: string
    created_at: string
    finalized_at: string
    amount_in_cents: number
    reference: string
    currency: string
    payment_method_type: string
    status: string;
  }
}