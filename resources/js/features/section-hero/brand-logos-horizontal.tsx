import KSeF from '../../../../public/brand-logos/KSeF.png';
import NBP from '../../../../public/brand-logos/NBP.svg';
import PAYU from '../../../../public/brand-logos/PAYU GPO.svg';
import Woo from '../../../../public/brand-logos/Woo.svg';
import allegro from '../../../../public/brand-logos/allegro.svg';
import insert from '../../../../public/brand-logos/insert.png';
import mBank from '../../../../public/brand-logos/mBank.svg';
import selgros from '../../../../public/brand-logos/selgros.svg';
import shoper from '../../../../public/brand-logos/shoper.svg';

const brands = [
    { src: KSeF, alt: 'KSeF' },
    { src: PAYU, alt: 'PAYU' },
    { src: Woo, alt: 'Woo' },
    { src: allegro, alt: 'allegro' },
    { src: insert, alt: 'insert' },
    { src: mBank, alt: 'mBank' },
    { src: NBP, alt: 'NBP' },
    { src: selgros, alt: 'selgros' },
    { src: shoper, alt: 'shoper' },
];

export const BrandLogosHorizontal = () => {
    return (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 pb-4 sm:gap-x-12 md:gap-x-20">
            {brands.map((brand) => (
                <img className="h-6 grayscale-25" src={brand.src} alt={brand.alt} key={brand.alt} />
            ))}
        </div>
    );
};
