import { apiFetch } from '@/lib/utils/api-fetch';
import { DeleteAccountDTO, UpdatePasswordDTO, UpdateProfileDTO } from '../constants/zod/profile';

export const updateProfile = async (body: UpdateProfileDTO) => {
    return await apiFetch<{ success: true }>(route('api.profile.updateProfile'), {
        method: 'PUT',
        body: JSON.stringify(body),
    });
};

export const updatePassword = async (body: UpdatePasswordDTO) => {
    return await apiFetch<{ success: true }>(route('api.profile.updatePassword'), {
        method: 'PUT',
        body: JSON.stringify(body),
    });
};

export const deleteAccount = async (body: DeleteAccountDTO) => {
    return await apiFetch<{ success: true }>(route('api.profile.deleteAccount'), {
        method: 'DELETE',
        body: JSON.stringify(body),
    });
};
