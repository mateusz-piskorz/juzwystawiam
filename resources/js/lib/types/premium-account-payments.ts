/* eslint-disable @typescript-eslint/no-explicit-any */

export type PremiumAccountPayment = {
    amount: number;
    amount_capturable: number;
    amount_details: {
        tip: any[];
    };
    amount_received: number;
    application: null | string;
    application_fee_amount: null | number;
    automatic_payment_methods: null | object;
    canceled_at: null | number;
    cancellation_reason: null | string;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    customer: string;
    description: null | string;
    id: string;
    invoice: null | string;
    last_payment_error: null | object;
    latest_charge: string;
    livemode: boolean;
    metadata: any[];
    next_action: null | object;
    object: string;
    on_behalf_of: null | string;
    payment_method: string;
    payment_method_configuration_details: null | object;
    payment_method_options: {
        card: {
            installments: null | object;
            mandate_options: null | object;
            network: null | string;
            request_three_d_secure: string;
        };
    };
    payment_method_types: string[];
    processing: null | object;
    receipt_email: null | string;
    review: null | string;
    setup_future_usage: null | string;
    shipping: null | object;
    source: null | string;
    statement_descriptor: null | string;
    statement_descriptor_suffix: null | string;
    status: string;
    transfer_data: null | object;
    transfer_group: null | string;
};
