/* global RequestInit */

export const apiFetch = async <T>(url: string, options: RequestInit = {}) => {
    let xsrfToken = decodeURIComponent(
        document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1] || '',
    );

    if (!xsrfToken) {
        await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
        xsrfToken = decodeURIComponent(
            document.cookie
                .split('; ')
                .find((row) => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1] || '',
        );
    }

    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
            ...(options.headers || {}),
        },
        credentials: 'include',
    });

    const data = (await res.json()) as T;

    if (!res.ok) {
        const message = (data as { message: string }).message;
        throw new Error(message || res.statusText);
    }

    return data;
};
