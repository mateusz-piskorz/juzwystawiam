/* global RequestInit */

export const apiFetch = async (url: string, options: RequestInit = {}) => {
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

    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
            ...(options.headers || {}),
        },
        credentials: 'include',
    });
};
