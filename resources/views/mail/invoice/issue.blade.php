<x-mail::message>
    <table style="width: 750px; margin: auto;" align="center" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td style="line-height:25px; font-size: 16px; background-color: #fff;">
                <table style="line-height:25px; font-size: 16px;" align="center" cellpadding="0" cellspacing="0"
                    border="0">
                    <tr>
                        <td style="padding-bottom: 25px; border-bottom: 1px solid #e0e0e0;">
                            <p><b>Dear Customer,</b></p>
                            <p>{{ $seller['company_name'] }} has issued Invoice {{ $invoice->number }} for the
                                amount of {{ $invoice->total }} {{ $invoice->currency }} gross.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 25px; padding-top: 25px; border-bottom: 1px solid #e0e0e0;">
                            <p><b>Invoice Details</b></p>
                            <p>
                                <span style="color:#999;">Seller:</span>{{ $seller['company_name'] }},
                                {{ $seller['street_name'] }}, {{ $seller['postal_code'] }},
                                {{ $seller['city'] }}<br>
                                <span style="color:#999;">Buyer:</span>{{ $buyer['company_name'] }},
                                {{ $buyer['street_name'] }}, {{ $buyer['postal_code'] }},
                                {{ $buyer['city'] }}<br>
                                <span style="color:#999;">Type and Number:</span> Invoice {{ $invoice->number }}<br>
                                <span style="color:#999;">Bank Account:</span>
                                {{ $seller['bank_account'] }}<br>
                                <span style="color:#999;">Invoice Value:</span> {{ $invoice->total }}
                                {{ $invoice->currency }} gross
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; line-height:25px; font-size: 16px; padding-top: 25px;">
                            <p>If you have any questions, please contact us by replying to this email:
                                {{ $seller['email'] }}</p>
                            <p>
                                Best regards,<br>
                                {{ $seller['company_name'] }}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</x-mail::message>
