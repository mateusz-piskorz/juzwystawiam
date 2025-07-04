<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document for {{ $to }}</title>

    {{-- <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> --}}

    <style>
        span {
            color: blue;
        }
    </style>

</head>

<body class="font-sans antialiased">
    <h1>Invoice</h1>
    <p><span>Billed to: {{ $to }}</span></p>
    <p><span>Subtotal: {{ $subtotal }}</span></p>
    <p><span>Tax: {{ $tax }}</span></p>
</body>

</html>
