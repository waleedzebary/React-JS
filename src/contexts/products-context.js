import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
    product: [],
});

export const ProductsProvider = ({ children }) => {
    const [product, setProduct] = useState(PRODUCTS);
    const value = { product };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};