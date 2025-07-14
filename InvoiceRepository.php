public function emailsSentThisMonth(): int
{
    return $this->invoices()
        ->join('invoice_emails', 'invoices.id', '=', 'invoice_emails.invoice_id')
        ->whereMonth('invoice_emails.created_at', now()->month)
        ->whereYear('invoice_emails.created_at', now()->year)
        ->where('invoice_emails.status', EmailStatus::SENT->value)
        ->count();
}
