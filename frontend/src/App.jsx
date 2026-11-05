import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteProvider } from './context/SiteContext.jsx';
import { InquiryProvider } from './context/InquiryContext.jsx';
import PageTransition from './components/PageTransition.jsx';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Product from './pages/Product.jsx';
import Search from './pages/Search.jsx';
import InquiryList from './pages/InquiryList.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'PUSH') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.search, navigationType]);

  return (
    <SiteProvider>
      <InquiryProvider>
        <PageTransition>
          <Header />
          <SearchBar />
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/search" element={<Search />} />
                <Route path="/inquiry-list" element={<InquiryList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
          <Footer />
        </PageTransition>
      </InquiryProvider>
    </SiteProvider>
  );
}
