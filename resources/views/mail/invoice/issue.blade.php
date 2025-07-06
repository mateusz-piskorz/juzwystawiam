<x-mail::message>
    # Introduction

    The body of your message.
    Invoice number: {{ $invoice->number }}

    <x-mail::button :url="''">
        Button Text
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
