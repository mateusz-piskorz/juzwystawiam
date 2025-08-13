import { cn } from '@/lib/utils/cn';

type Props = {
    className?: string;
    textClassName?: string;
};

export function AppLogo({ className, textClassName }: Props) {
    return (
        <>
            <div
                className={cn(
                    'bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md',
                    className,
                )}
            >
                <svg
                    className="dark: w-5 fill-current text-[#e3c9d7] dark:text-[#98838F]"
                    width="166"
                    height="114"
                    viewBox="0 0 166 114"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M75.7606 113.999C74.5473 113.999 73.5362 113.569 72.7273 112.707L57.561 97.5074C56.7016 96.6967 56.2719 95.6834 56.2719 94.4674V14.5914C56.2719 13.3247 56.9038 12.6914 58.1677 12.6914H79.628C80.8918 12.6914 81.5238 13.3247 81.5238 14.5914V93.6314H98.51V14.5914C98.51 13.3247 99.1419 12.6914 100.406 12.6914H121.866C123.13 12.6914 123.762 13.3247 123.762 14.5914V93.6314H140.672V14.5914C140.672 13.3247 141.304 12.6914 142.568 12.6914H164.104C165.368 12.6914 166 13.3247 166 14.5914V94.4674C166 95.6834 165.57 96.6967 164.711 97.5074L149.545 112.707C148.685 113.569 147.674 113.999 146.511 113.999H128.691C127.528 113.999 126.517 113.569 125.658 112.707L112.918 99.9394H109.354L96.6142 112.707C95.7548 113.569 94.7437 113.999 93.581 113.999H75.7606Z" />
                    <path d="M1.89579 114C0.631929 114 0 113.367 0 112.1V100.016C0 99.0533 0.252771 98.2933 0.758314 97.736L11.9814 86.488C12.588 85.9307 12.8913 85.12 12.8913 84.056V1.9C12.8913 0.633333 13.5233 0 14.7871 0H36.2474C37.5113 0 38.1432 0.633333 38.1432 1.9V94.696C38.1432 95.152 38.0927 95.5827 37.9916 95.988C37.941 96.3427 37.7135 96.7227 37.3091 97.128L21.612 112.86C20.8536 113.62 20.0953 114 19.337 114H1.89579Z" />
                </svg>
            </div>
            <div className={cn('ml-1 grid flex-1 text-left', textClassName)}>
                <span className="mb-0.5 truncate leading-none font-semibold">Juz Wystawiam</span>
            </div>
        </>
    );
}
