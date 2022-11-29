import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '../utils/client';

import { SanityImage } from '../types';

const Hero = ({ backendImages }: { backendImages: SanityImage[] }) => {
  return (
    <section>
      <m.div
        className='sm:flex sm:items-center sm:justify-center sm:gap-8 px-[3rem]'
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.4, delayChildren: 0.3 }}
      >
        <div className='relative'>
          <Image
            className='rounded-[3rem] h-full'
            src={urlFor(backendImages[0].image.asset.url).url()}
            blurDataURL={urlFor(backendImages[0].image.asset.url).url()}
            alt='banner'
            placeholder='blur'
            width={2660}
            height={1256}
          />
          <div className='absolute top-[10%] md:top-[25%] left-[10%] w-[50rem]'>
            <h1 className='text-[3rem] md:text-[4.2rem] font-semibold mb-[2rem] md:mb-[3.5rem] tracking-widest text-heading-1'>
              蹦蹦時光糖果屋
            </h1>
            <p className='text-[1.8rem] md:text-[2.5rem] font-normal mb-9 tracking-wider text-text-3'>
              精選眾多外國進口商品，滿足挑惕的你！不管是古早懷舊零食，還是現在最新潮的糖果餅乾，我們都都都有供應！
            </p>
            <Link href='/browse'>
              <button className='text-[1.5rem] md:text-[2rem] font-medium bg-asparagus-3 text-white px-10 py-5 rounded-[1.5rem]'>
                手刀購買
              </button>
            </Link>
          </div>
        </div>

        <div className='hidden sm:block h-full'>
          <Image
            className='rounded-[3rem]'
            src={urlFor(backendImages[1].image.asset.url).url()}
            blurDataURL={urlFor(backendImages[1].image.asset.url).url()}
            alt='banner'
            placeholder='blur'
            width={1200}
            height={1256}
          />
        </div>
      </m.div>
    </section>
  );
};

export default Hero;
