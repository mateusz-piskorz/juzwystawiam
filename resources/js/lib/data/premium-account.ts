import { apiFetch } from '@/lib/utils/api-fetch';
import { PremiumAccountPayment } from '../types/premium-account-payments';

export const getAllPremiumAccountPayments = async () => {
    return await apiFetch<PremiumAccountPayment[]>(route('api.premium-account.payments'));
};
