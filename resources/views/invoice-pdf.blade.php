<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'DejaVu Sans', sans-serif;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
        }

        body {
            color: #404040;
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
        }

        .m-0 {
            margin: 0;
        }

        .py-12 {
            padding-top: 12px;
            padding-bottom: 12px;
        }

        .py-20 {
            padding-top: 20px;
            padding-bottom: 20px;
        }

        .pt-20 {
            padding-top: 20px;
        }

        .pb-20 {
            padding-bottom: 20px;
        }

        .px-30 {
            padding-left: 30px;
            padding-right: 30px;
        }

        .p-12 {
            padding: 12px;
        }

        .bb {
            border-bottom: 1px solid #dee2e6;
        }

        .bt {
            border-top: 1px solid #dee2e6;
        }

        .b {
            border: 1px solid #dee2e6;
        }

        .w-full {
            width: 100%;
        }

        .ta-right {
            text-align: right
        }

        .ta-left {
            text-align: left
        }

        .ta-center {
            text-align: center
        }

        .bs-0 {
            border-spacing: 0
        }

        .b-0 {
            border-spacing: 0
        }

        .p-0 {
            border-spacing: 0
        }

        .bg-primary {
            background-color: #f8f9fa
        }

        .nowrap {
            white-space: nowrap
        }

        .fs-16 {
            font-size: 16px;
        }

        .fs-12 {
            font-size: 12px;
        }

        .dwa {
            table-layout: fixed;
        }

        .w-40 {
            width: 40%;
        }

        .text-discount {
            color: #85a731
        }



        @media print {
            @page {
                size: auto;
                margin: 0;
                padding: 0;
            }
        }
    </style>
</head>

<body class="px-30 pt-20 fs-12">
    <table class="w-full p-0 bs-0 b-0">
        <tr>
            <td>
                <table class="w-full p-0 bs-0 b-0">
                    <tr>
                        <td class="py-12 ta-right m-0">
                            <h1 class="fs-16">Invoice</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table class="w-full b-0 bs-0 p-0">
                    <tr>
                        <td class="py-12 bb bt">
                            <p>
                                <strong>Data sprzedaży:</strong> {{ $invoice['sale_date'] }}
                            </p>
                        </td>
                        <td class="py-12 bb bt">
                            <p class="ta-right">
                                <strong>Numer faktury:</strong> {{ $invoice['number'] }}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table class="w-full b-0 bs-0 p-0">
                    <tr>
                        <td class="py-20">
                            <p style="line-height: 1.2">
                                <strong style="display: block;">Sprzedawca:</strong>
                                {{ $seller['company_name'] }}<br />
                                {{ $seller['street_name'] }} {{ $seller['building_number'] }}<br />
                                {{ $seller['postal_code'] }} {{ $seller['city'] }}<br />
                                bank: {{ $seller['bank_account'] }}<br />
                            </p>
                        </td>
                        <td class="py-20">
                            <p class="ta-right" style="line-height: 1.2;">
                                <strong style="display: block;">Nabywca:</strong>
                                {{ $buyer['company_name'] }}<br />
                                {{ $buyer['street_name'] }} {{ $buyer['building_number'] }}<br />
                                {{ $buyer['postal_code'] }} {{ $buyer['city'] }}<br />
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table class="w-full bs-0 p-0 b dwa">
                    <thead>
                        <tr>
                            <th class="bg-primary bb p-12 ta-left nowrap w-40">Nazwa</th>
                            <th class="bg-primary bb p-12 ta-center nowrap">Ilość</th>
                            <th class="bg-primary bb p-12 ta-center nowrap">Cena</th>
                            <th class="bg-primary bb p-12 ta-center nowrap">Vat</th>
                            <th class="bg-primary bb p-12 ta-center nowrap text-discount">Rabat</th>
                            <th class="bg-primary bb p-12 ta-right nowrap">Wartość</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($invoice['invoice_products'] as $product)
                            <tr>
                                <td class="p-12 ta-left bb w-40">{{ $product['name'] }}</td>
                                <td class="p-12 ta-center bb">{{ $product['quantity'] }}</td>
                                <td class="p-12 ta-center bb">{{ $product['price'] }} {{ $invoice['currency'] }}</td>
                                <td class="p-12 ta-center bb">{{ $product['vat_rate'] }}%</td>
                                <td class="p-12 ta-center bb text-discount">{{ $product['total_discount_amount'] }}
                                    {{ $invoice['currency'] }}
                                </td>
                                <td class="p-12 ta-right bb">{{ $product['grand_total'] }} {{ $invoice['currency'] }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="bg-primary p-12 bb"></td>
                            <td class="bg-primary p-12 ta-right bb">
                                <strong class="nowrap">Wartość produktów:</strong>
                            </td>
                            <td class="bg-primary p-12 ta-right bb">{{ $invoice['total'] }} {{ $invoice['currency'] }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="bg-primary p-12 bb"></td>
                            <td class="bg-primary p-12 ta-right bb">
                                <strong class="nowrap">Podatek:</strong>
                            </td>
                            <td class="bg-primary p-12 ta-right bb">{{ $invoice['total_vat_amount'] }}
                                {{ $invoice['currency'] }}</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="bg-primary p-12 bb"></td>
                            <td class="bg-primary p-12 ta-right bb">
                                <strong class="nowrap text-discount">Rabat:</strong>
                            </td>
                            <td class="bg-primary p-12 ta-right bb text-discount">
                                {{ $invoice['total_discount_amount'] }} {{ $invoice['currency'] }}</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="bg-primary p-12"></td>
                            <td class="bg-primary p-12 ta-right ">
                                <strong class="nowrap">Suma całkowita:</strong>
                            </td>
                            <td class="bg-primary p-12 ta-right">{{ $invoice['grand_total'] }}
                                {{ $invoice['currency'] }}</td>
                        </tr>
                    </tfoot>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
