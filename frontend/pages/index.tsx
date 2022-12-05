import { GetStaticProps, NextPage } from 'next';
import type { Product, SanityImage } from '../types';
import { m } from 'framer-motion';
import {
  HeroSection,
  HomeSection,
  GoodsSlick,
  DeliveryCard,
} from '../components';
import {
  getDiscountProducts,
  getTopTenNewProducts,
  getBackendImages,
} from '../utils/queries';
import { deliveries } from '../utils/data';
import { client } from '../utils/client';
import image from '../assets/index';

interface ServerSideProps {
  props: {
    discountProducts: Product[];
    topTenNewProducts: Product[];
    backendImages: SanityImage[];
  };
}

interface Props {
  discountProducts: Product[];
  topTenNewProducts: Product[];
  backendImages: SanityImage[];
}

export const getStaticProps: GetStaticProps =
  async (): Promise<ServerSideProps> => {
    // Get discount product
    const discountProducts: Product[] = await client.fetch(getDiscountProducts);
    // Get top 10 new item
    const topTenNewProducts: Product[] = await client.fetch(
      getTopTenNewProducts,
    );
    // Get banners
    const backendImages: SanityImage[] = await client.fetch(getBackendImages);

    return {
      props: { discountProducts, topTenNewProducts, backendImages },
    };
  };

const Home: NextPage<Props> = ({
  discountProducts,
  topTenNewProducts,
  backendImages,
}) => {
  return (
    <main>
      <HeroSection backendImages={backendImages} />

      <m.section
        className='px-[5rem] sm:px-[10rem] py-[15rem] mb-[3rem] w-full'
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.4, delayChildren: 0.3 }}
      >
        <HomeSection heading={'特價商品'} showButton={true} />
        {discountProducts && <GoodsSlick products={discountProducts} />}
      </m.section>

      <m.section
        className='flex flex-col justify-between px-[5rem] sm:px-[10rem] py-[10rem] mb-[3rem] bg-background-brown-2'
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.4, delayChildren: 0.3 }}
      >
        <HomeSection heading={'有什麼新鮮事?'} showButton={false} />

        <div className='flex flex-col md:flex-row items-center justify-center gap-[4rem]'>
          <div className='flex flex-col items-center justify-between py-[7rem] w-[44.4rem] h-[54.5rem] rounded-[3rem] bg-watermelon-1'>
            <div className='text-center'>
              <p className='text-[3rem] text-watermelon-2 mb-[3rem] font-bold'>
                鮮萃西瓜糖
              </p>
              <p className='text-[2rem] font-medium text-text-2'>
                給你100%的西瓜鮮甜
              </p>
            </div>

            <img
              className='block w-[20rem]'
              src={image.watermelon}
              alt='Watermelon'
            />
            <div>
              <button className='text-[2rem] text-watermelon-2 border-2 border-watermelon-2 bg-watermelon-1 rounded-[1.5rem] px-14 py-5 font-medium'>
                瞭解更多
              </button>
            </div>
          </div>

          <div className='flex flex-col items-center justify-between py-[7rem] w-[44.4rem] h-[54.5rem] rounded-[3rem] bg-asparagus-1'>
            <div className='text-center'>
              <p className='text-[3rem] text-asparagus-2 mb-[3rem] font-bold'>
                鮮萃蘆薈糖
              </p>
              <p className='text-[2rem] font-medium text-text-2'>
                給你100%的蘆薈原味
              </p>
            </div>

            <img
              className='block w-[20rem]'
              src={image.asparagus}
              alt='Watermelon'
            />
            <div>
              <button className='text-[2rem] text-asparagus-2 border-2 border-asparagus-2 bg-asparagus-1 rounded-[1.5rem] px-14 py-5 font-medium'>
                瞭解更多
              </button>
            </div>
          </div>

          <div className='flex flex-col justify-between h-[54.5rem]'>
            <div className='flex flex-col justify-between bg-asparagus-3 w-[44.5rem] h-[25.5rem] px-[5.5rem] py-[3rem] rounded-[3rem] gap-[2rem]'>
              <div>
                <p className='text-white text-[4rem] font-semibold'>200+</p>
                <p className='text-white text-[2rem] font-medium'>
                  新鮮健康嚴選糖果
                </p>
              </div>
              <div>
                <button
                  className='text-white text-2rem font-medium border-2 border-white px-[5rem] py-[1.5rem] rounded-[1.5rem]'
                  type='button'
                >
                  查看更多
                </button>
              </div>
            </div>

            <div className='flex flex-col gap-6 px-[5.5rem] py-[4rem] bg-cafe-1 rounded-[3rem]'>
              <p className='block text-center w-full text-[2rem] font-medium'>
                不要錯過我們的最新消息
              </p>
              <input
                className='w-full h-[5.3rem] bg-white text-text-1 px-[4rem] rounded-[1.5rem]'
                type='text'
                placeholder='Email'
              />
              <button
                className='w-full h-[5.3rem] text-center bg-cafe-2 text-white rounded-[1.5rem]'
                type='button'
              >
                現在訂閱
              </button>
            </div>
          </div>
        </div>
      </m.section>

      <m.section
        className='flex flex-col justify-between px-[5rem] sm:px-[10rem] py-[10rem] mb-[3rem]'
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.4, delayChildren: 0.3 }}
      >
        <HomeSection heading={'特價計畫'} showButton={false} />

        <div className='flex flex-col md:flex-row items-center justify-center gap-[15rem]'>
          <div className='flex flex-col gap-[10rem] ss:gap-[8rem] bg-white rounded-[2rem] w-full md:w-[68.5rem] h-[38.4rem] px-[7rem] py-[8rem] shadow-lg'>
            <div className='flex items-center justify-between gap-[5rem]'>
              <div className='flex items-center justify-center bg-watermelon-2 rounded-full w-[10rem] h-[10rem] ss:h-[14rem] ss:w-[14rem]'>
                <span className='text-white font-semibold text-[2.8rem] ss:text-[3.2rem]'>
                  5%
                </span>
              </div>

              <div className='flex flex-col gap-[1rem] text-text-3 text-[2rem] ss:text-[2.5rem] font-medium'>
                <div className='flex items-center justify-between'>
                  <p>等級:</p>
                  <p>1</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>不到10%:</p>
                  <p className='ml-[12rem]'>$71</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full gap-6'>
              <div className='relative w-full'>
                <div className='absolute top-0 rounded-full z-10 w-full h-[0.5rem] bg-gray-300'></div>
                <div className='absolute top-0 rounded-full z-50 w-[20rem] h-[0.5rem] bg-watermelon-2'></div>
                <p className='absolute -top-16 left-[17rem] text-[2rem] font-bold text-watermelon-2'>
                  $420
                </p>
              </div>

              <div className='flex items-center justify-between w-full text-text-2'>
                <p>0%</p>
                <p>10%</p>
                <p>20%</p>
              </div>
            </div>
          </div>

          <div>
            <div className='mb-[5rem]'>
              <p className='text-[3rem] font-medium mb-[2.5rem] text-text-3'>
                專為顧客的可累積的特價系統!
              </p>
              <p className='text-[2rem] font-normal text-text-2'>
                我們的網路商店有專為顧客的可累積的特價系統。現在註冊並且獲得折價等級
              </p>
            </div>
            <div>
              <button className='text-[2rem] font-bold text-white bg-cafe-2 rounded-[1.5rem] px-[7rem] py-[1.5rem]'>
                註冊
              </button>
            </div>
          </div>
        </div>
      </m.section>

      <m.section
        className='flex flex-col justify-between px-[5rem] sm:px-[10rem] py-[10rem] mb-[3rem] gap-20 bg-background-brown-2'
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.4, delayChildren: 0.3 }}
      >
        <HomeSection heading={'最新到貨'} showButton={true} />
        {topTenNewProducts && <GoodsSlick products={topTenNewProducts} />}
      </m.section>

      <m.section
        className='flex flex-col justify-between px-[5rem] sm:px-[10rem] py-[10rem] mb-[3rem]'
        whileInView={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.4, delayChildren: 0.3 }}
      >
        <HomeSection heading={'我們如何配送?'} showButton={false} />
        <div className='flex flex-col items-center justify-between gap-20 ss:flex-row ss:flex-wrap'>
          {deliveries.map((delivery) => (
            <DeliveryCard key={delivery.imgUrl} {...delivery} />
          ))}
        </div>
      </m.section>
    </main>
  );
};

export default Home;
