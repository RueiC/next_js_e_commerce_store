import type { AppProps } from 'next/app';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

import { StateProvider } from '../context/StateContext';
import { Navbar, Footer } from '../components';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <StateProvider>
        <LazyMotion features={domAnimation} strict>
          <div className='flex flex-col justify-between min-h-screen'>
            <Navbar />
            <m.div
              key={router.route}
              initial='pageInitial'
              animate='pageAnimate'
              variants={{
                pageInitial: { opacity: 0 },
                pageAnimate: { opacity: 1 },
              }}
              transition={{ duration: 0.6, delayChildren: 0.6 }}
            >
              <ToastContainer
                position='top-center'
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
              />
              <Component {...pageProps} />
            </m.div>
            <Footer />
          </div>
        </LazyMotion>
      </StateProvider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
