import { z } from 'zod';

export const updateProfileDTO = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileDTO>;

export const updatePasswordDTO = z.object({
    current_password: z.string().nonempty(),
    password: z.string().nonempty(),
    password_confirmation: z.string().nonempty(),
});

export type UpdatePasswordDTO = z.infer<typeof updatePasswordDTO>;

export const deleteAccountDTO = z.object({
    password: z.string().nonempty(),
});

export type DeleteAccountDTO = z.infer<typeof deleteAccountDTO>;
