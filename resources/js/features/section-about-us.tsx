import { RootHeading } from '@/components/common/root-heading';

export const SectionAboutUs = () => {
    return (
        <div className="mx-auto max-w-[1640px] space-y-8 p-4 md:px-8 xl:px-12">
            <RootHeading
                title="About Us"
                description="Learn more about our mission, values, and the dedicated team working to deliver exceptional solutions for our customers."
            />
            <p className="max-w-[1200px] text-center text-sm md:text-left md:text-base lg:text-lg">
                At <span className="font-bold">Juz Wystawiam</span>, we believe that success is built on a foundation of trust, innovation, and
                dedication. Established with a vision to make a positive impact, our company has consistently focused on delivering high-quality
                solutions tailored to the unique needs of our clients. Our journey began with a small team of passionate individuals, and over the
                years, we have grown into a dynamic organization driven by creativity and a commitment to excellence.
            </p>

            <p className="max-w-[1200px] text-center text-sm md:text-left md:text-base lg:text-lg">
                We take pride in fostering a collaboratie environment where every team member is encouraged to share ideas and contribute to our
                shared goals. Our diverse backgrounds and expertise allow us to approach challenges from multiple perspectives, ensuring that we
                deliver results that exceed expectations. Customer satisfaction is at the core of everything we do. We strive to build lasting
                relationships by being transparent, responsive, and attentive to the evolving needs of our clients. As we look to the future, we
                remain dedicated to continuous improvement and making a meaningful difference in the industries we serve.
            </p>
        </div>
    );
};
