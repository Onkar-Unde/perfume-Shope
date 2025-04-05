import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <Banner />
            <div className='product-grid'>
                {products.slice(0,4).map(product => <ProductCard key={product._id} product={product} />)}
            </div>
        </div>
    );
}
export default Home;