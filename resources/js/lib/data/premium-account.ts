import { apiFetch } from '@/lib/utils/api-fetch';
import { PremiumAccountPayment } from '../types/premium-account-payments';

const BASE_URL = '/api/premium-account';

export const getAllPremiumAccountPayments = async () => {
    return await apiFetch<PremiumAccountPayment[]>(`${BASE_URL}/payments`);
};
