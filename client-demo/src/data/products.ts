export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  discount?: number;
  isHourlyDeal?: boolean;
  isChristmasDeal?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    rating: 4.5,
    reviews: 2341,
    description:
      'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery',
      'Bluetooth 5.0',
      'Foldable design',
    ],
    inStock: true,
    discount: 47,
    isChristmasDeal: true,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Electronics',
    rating: 4.7,
    reviews: 1856,
    description:
      'Advanced smartwatch with health monitoring, GPS, and 7-day battery life.',
    features: [
      'Heart rate monitor',
      'GPS tracking',
      'Water resistant',
      'Sleep tracking',
    ],
    inStock: true,
    discount: 33,
    isHourlyDeal: true,
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Fashion',
    rating: 4.3,
    reviews: 892,
    description: 'Soft, breathable cotton t-shirt perfect for everyday wear.',
    features: [
      '100% organic cotton',
      'Pre-shrunk',
      'Reinforced seams',
      'Multiple colors',
    ],
    inStock: true,
    discount: 40,
  },
  {
    id: '4',
    name: 'Portable Power Bank 20000mAh',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
    category: 'Electronics',
    rating: 4.6,
    reviews: 3421,
    description: 'High-capacity power bank with fast charging support.',
    features: [
      '20000mAh capacity',
      'Fast charging',
      'Dual USB ports',
      'LED indicator',
    ],
    inStock: true,
    discount: 33,
    isChristmasDeal: true,
  },
  {
    id: '5',
    name: 'Running Shoes Ultra',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Sports',
    rating: 4.8,
    reviews: 2156,
    description:
      'Lightweight running shoes with superior cushioning and support.',
    features: [
      'Memory foam insole',
      'Breathable mesh',
      'Non-slip sole',
      'Lightweight',
    ],
    inStock: true,
    discount: 31,
    isHourlyDeal: true,
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    category: 'Home',
    rating: 4.4,
    reviews: 1234,
    description: 'Double-wall insulated bottle keeps drinks cold for 24 hours.',
    features: [
      'Double-wall insulation',
      'BPA free',
      'Leak proof',
      '500ml capacity',
    ],
    inStock: true,
    discount: 29,
  },
  {
    id: '7',
    name: 'Wireless Gaming Mouse',
    price: 59.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    category: 'Electronics',
    rating: 4.6,
    reviews: 1567,
    description: 'High-precision gaming mouse with customizable RGB lighting.',
    features: [
      '16000 DPI',
      'RGB lighting',
      '6 programmable buttons',
      'Ergonomic design',
    ],
    inStock: true,
    discount: 33,
    isChristmasDeal: true,
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'Sports',
    rating: 4.5,
    reviews: 987,
    description:
      'Extra thick yoga mat with non-slip surface for all practices.',
    features: [
      '6mm thickness',
      'Non-slip surface',
      'Eco-friendly',
      'Carrying strap included',
    ],
    inStock: true,
    discount: 30,
  },
];

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
  { id: 'fashion', name: 'Fashion', icon: '👕', color: 'bg-pink-100' },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠', color: 'bg-green-100' },
  { id: 'sports', name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
  { id: 'books', name: 'Books', icon: '📚', color: 'bg-purple-100' },
  { id: 'beauty', name: 'Beauty', icon: '💄', color: 'bg-red-100' },
];

export const bankOffers = [
  '10% instant discount on HDFC Bank Credit Cards',
  '5% cashback on Amazon Pay ICICI Credit Card',
  'No cost EMI on orders above ₹3000',
  'Extra 5% off with SBI Credit Card',
];
