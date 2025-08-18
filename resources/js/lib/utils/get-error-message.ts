// todo: format error messages
// todo: make something like toastErrorMessage instead
export function getErrorMessage(error: unknown) {
    console.log(error);
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }

    return null;
}
