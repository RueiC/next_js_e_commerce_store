import { ChangeEvent, FC, useState } from 'react';
import { BiCategory, BiLogOutCircle } from 'react-icons/bi';
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlineMenu,
} from 'react-icons/ai';
import axios from 'axios';
import Link from 'next/link';
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from '@react-oauth/google';

import { createOrGetUser } from '../utils/getAuthInfo';
import { useStateContext } from '../context/StateContext';
import image from '../assets/index';
import ShoppingCart from './ShoppingCart';

const Navbar: FC = () => {
  const { user, setUser, showCart, setShowCart, totalQty, getUser } =
    useStateContext();
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  const handleSearch = (query: string): void => {
    console.log(query);
  };

  const submitSearch = (): void => {};

  const logout = async (): Promise<void> => {
    await axios.get('/api/logout').then(() => setUser(null));
  };

  return (
    <>
      <header className='md:flex md:items-center md:justify-between px-[3rem] py-[3.5rem] hidden'>
        <div className='flex justify-start items-center gap-10'>
          <div className='w-[17.5rem] h-[8.5rem] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'>
            <Link href='/'>
              <img className='w-full h-full' src={image.logo_1} alt='logo' />
            </Link>
          </div>
          <div className='w-[28rem] h-[5rem]'>
            <input
              className='bg-white text-text-1 rounded-[1.5rem] w-full h-full shadow-md placeholder:text-[1.5rem] px-[2rem] outline-none'
              placeholder='搜尋'
              type='text'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
              onSubmit={submitSearch}
            />
          </div>
          <div className='w-[15rem] h-full hover:scale-105 transition-all duration-200 ease-in-out'>
            <Link href='/products'>
              <button
                className='flex items-center gap-3 justify-center w-full h-full text-[2rem] text-text-3'
                type='button'
              >
                <BiCategory />
                瀏覽商品
              </button>
            </Link>
          </div>
        </div>

        <div className='relative flex items-center gap-[4rem] h-[5rem] text-text-3 font-medium'>
          {!user ? (
            <GoogleLogin
              onSuccess={async (res: CredentialResponse) => {
                await createOrGetUser(res);
                await getUser();
              }}
              onError={() => console.log('Login Failed')}
            />
          ) : (
            <button
              className={`flex items-center gap-3 justify-center h-full text-[1.5rem] shadow-md px-[3rem] rounded-[1.5rem] bg-white ${
                !showCart &&
                'hover:scale-105 transition-all duration-200 ease-in-out'
              }`}
              type='button'
              onClick={() => {
                googleLogout();
                logout();
              }}
            >
              <BiLogOutCircle className='text-[2rem]' />
              登出
            </button>
          )}

          <button
            className={`flex items-center gap-[1rem] justify-center text-[1.5rem] shadow-md h-full px-[3rem] rounded-[1.5rem] bg-white ${
              !showCart &&
              'hover:scale-105 transition-all duration-200 ease-in-out'
            }`}
            type='button'
            onClick={() => setShowCart((prev: boolean) => !prev)}
          >
            <AiOutlineShoppingCart className='text-[2rem]' />
            購物車
            <span className='text-3xl'>{totalQty}</span>
          </button>

          {showCart && <ShoppingCart mode={'desktop'} />}
        </div>
      </header>

      <header
        className={`fixed flex md:hidden flex-col gap-[2.5rem] top-0 left-0 w-full h-[100vh] bg-background-brown-1 md:hiden px-[3rem] py-[3.5rem] z-50 -translate-y-[100%] transition-all duration-500 ease-in-out ${
          showNavbar && 'translate-y-0'
        }`}
      >
        {showNavbar && (
          <div className='flex flex-col justify-start items-start gap-[4rem]'>
            <div className='flex items-center justify-between w-full'>
              <img
                className='w-[17.5rem] h-[8.5rem] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'
                src={image.logo_1}
                alt='logo'
              />
              <AiFillCloseCircle
                className='text-[4rem] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
                onClick={() => setShowNavbar(false)}
              />
            </div>

            <button
              className='flex items-center gap-[0.75rem] justify-center w-[15rem] h-full hover:scale-105 transition-all duration-200 ease-in-out text-[2rem] text-text-3 bg-white px-[2rem] py-[1rem] rounded-[1rem] shadow-sm'
              type='button'
            >
              <BiCategory />
              瀏覽商品
            </button>

            <form className='w-full h-full'>
              <input
                className='bg-white text-text-1 rounded-[1.5rem] w-full h-[5rem] shadow-sm placeholder:text-[1.5rem] px-[2rem] outline-none'
                placeholder='搜尋'
                type='text'
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                onSubmit={submitSearch}
              />
            </form>
          </div>
        )}
      </header>

      {!showNavbar && (
        <div
          className={`relative flex md:hidden items-center justify-between w-full px-[2.5rem] py-[3rem] text-text-3 font-medium`}
        >
          <img
            className='w-[17.5rem] h-[8.5rem] cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'
            src={image.logo_1}
            alt='logo'
          />
          <div className='flex items-center gap-[2rem]'>
            <button
              className={`flex items-center gap-3 justify-center h-full text-[1.5rem] shadow-md px-[2rem] py-[1.5rem] rounded-[1.5rem] bg-white ${
                !showCart &&
                'hover:scale-105 transition-all duration-200 ease-in-out'
              }`}
              type='button'
              onClick={() => setShowCart((prev: boolean) => !prev)}
            >
              <AiOutlineShoppingCart />
              購物車 <span className='text-3xl'>{totalQty}</span>
            </button>

            <AiOutlineMenu
              className='text-[3rem] cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out'
              onClick={() => {
                setShowCart(false);
                setShowNavbar(true);
              }}
            />
          </div>

          {showCart && <ShoppingCart mode={'mobile'} />}
        </div>
      )}
    </>
  );
};

export default Navbar;
