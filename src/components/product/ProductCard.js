import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import useActive from '../../hooks/useActive';
import axios from 'axios';
import { notification } from 'antd';

const ProductCard = (props) => {
    const { id, _id, images, title, info, price, discountPrice, rateCount } = props;
    const { active, handleActive, activeClass } = useActive(false);
    const [loading, setLoading] = useState(false);

    const newPrice = displayMoney(price);
    const oldPrice = displayMoney(discountPrice);

    // Retrieve user ID from local storage
    const userId = localStorage.getItem('userId');

    // Handling Add-to-cart
    const handleAddItem = async () => {
        if (!userId) {
            notification.error({
                message: 'Login Required',
                description: 'Please log in to add items to your cart.',
            });
            return;
        }

        handleActive(id);
        setLoading(true);

        const orderData = {
            products: [
                {
                    product: _id,
                    quantity: 1 // For simplicity, assuming quantity 1 here
                }
            ],
            userId, // Use the user ID from local storage
            amount: price, // Assuming the amount is the price of the single product
            currency: "USD"
        };

        try {
            await axios.post('http://localhost:5000/api/orders/create', orderData);
            setLoading(false);
            notification.success({
                message: 'Added to Cart',
                description: 'Item has been added to your cart successfully.',
            });
        } catch (error) {
            console.error('Error creating order:', error);
            setLoading(false);
            notification.error({
                message: 'Error',
                description: 'An error occurred while adding the item to your cart.',
            });
        }

        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    return (
        <div className="products_card">
            <figure className="products_img">
                <Link to={`/product-details/${_id}`}>
                    <img src={images?.[0]?.url} alt="product-img" />
                </Link>
            </figure>
            <div className="products_details">
                <span className="rating_star">
                    {[...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)}
                </span>
                <h3 className="products_title">
                    <Link to={`/product-details/${_id}`}>{title}</Link>
                </h3>
                <h5 className="products_info">{info}</h5>
                <div className="separator"></div>
                <h2 className="products_price">
                    {newPrice} &nbsp;
                    <small><del>{oldPrice}</del></small>
                </h2>
                <button
                    type="button"
                    className={`btn products_btn ${activeClass(id)}`}
                    onClick={handleAddItem}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : active ? 'Added' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
