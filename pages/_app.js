import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Transition from '../components/Transition';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <Layout>
      <AnimatePresence mode='wait' onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={router.asPath} className='h-full'>
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
