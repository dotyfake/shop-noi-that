import { Routes, Route } from 'react-router-dom';
import { Home, Products, Contact, NotFoundPage, ProductPage } from '~/pages';
import { memo } from 'react';
const Container = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default memo(Container);
