import { Router, Route } from 'react-router-dom';
import { Home, Products, Contact } from '~/pages';

const Container = () => {
    return (
        <Router>
            <Route to="/" element={<Home />} />
            <Route to="/products" element={<Products />} />
            <Route to="/Contact" element={<Contact />} />
        </Router>
    );
};

export default Container;
