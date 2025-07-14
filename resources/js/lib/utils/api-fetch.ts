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

    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || res.statusText);
    }
    const data = (await res.json()) as T;

    return data;
};
