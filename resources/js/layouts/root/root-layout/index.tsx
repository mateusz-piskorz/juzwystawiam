import { Head } from '@inertiajs/react';
import React from 'react';
import { Footer } from 'react-day-picker';
import { Header } from './header';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..600&display=swap" rel="stylesheet" />
            </Head>

            <div className="space-y-20">
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
};
