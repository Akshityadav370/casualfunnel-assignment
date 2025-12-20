import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Zap, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, bankOffers } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useAnalytics } from '@/hooks/useAnalytics';
import HeatmapOverlay from '@/components/HeatmapOverlay';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, saveForLater, addToRecentlyViewed } = useCart();
  const { isHeatmapMode, tracker } = useAnalytics();

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <div className='container mx-auto px-4 py-12 text-center'>
          <h1 className='text-2xl font-bold'>Product not found</h1>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  const handleSaveForLater = () => {
    saveForLater(product);
    toast.success('Saved for later!');
  };

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='relative aspect-square bg-card rounded-lg overflow-hidden border border-border'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover'
              />
              {product.discount && (
                <Badge className='absolute top-4 left-4 badge-sale text-lg px-3 py-1'>
                  -{product.discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-foreground mb-2'>
                {product.name}
              </h1>
              <div className='flex items-center gap-2 mb-4'>
                <div className='flex items-center gap-1 bg-success text-success-foreground px-2 py-1 rounded'>
                  <span className='font-bold'>{product.rating}</span>
                  <Star className='w-4 h-4 fill-current' />
                </div>
                <span className='text-muted-foreground'>
                  {product.reviews.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className='flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-foreground'>
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className='text-xl text-price-strike'>
                    ${product.originalPrice}
                  </span>
                  <Badge className='badge-sale'>{product.discount}% off</Badge>
                </>
              )}
            </div>

            {/* Bank Offers */}
            <div className='bg-secondary rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-3'>
                <CreditCard className='w-5 h-5 text-primary' />
                <span className='font-semibold text-foreground'>
                  Bank Offers
                </span>
              </div>
              <ul className='space-y-2'>
                {bankOffers.map((offer, index) => (
                  <li
                    key={index}
                    onClick={() => {}}
                    className='text-sm text-muted-foreground flex items-start gap-2 cursor-pointer'
                    data-analytics-id={`product-id-${product.id}-bank-offer-${index}`}
                  >
                    <span className='text-success'>•</span>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={handleAddToCart}
                variant='outline'
                className='flex-1 gap-2'
                data-analytics-id={`add-to-cart-${product.id}`}
              >
                <ShoppingCart className='w-5 h-5' />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className='flex-1 gap-2 bg-primary hover:bg-primary/90'
                data-analytics-id={`buy-now-${product.id}`}
              >
                <Zap className='w-5 h-5' />
                Buy Now
              </Button>
            </div>

            <Button
              onClick={handleSaveForLater}
              variant='ghost'
              className='w-full gap-2 text-muted-foreground'
              data-analytics-id={`save-for-later-${product.id}`}
            >
              <Heart className='w-5 h-5' />
              Save for Later
            </Button>

            {/* Features */}
            <div>
              <h3 className='font-semibold text-foreground mb-3'>
                Key Features
              </h3>
              <ul className='space-y-2'>
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className='flex items-center gap-2 text-muted-foreground'
                  >
                    <span className='w-1.5 h-1.5 bg-primary rounded-full' />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className='font-semibold text-foreground mb-2'>
                Description
              </h3>
              <p className='text-muted-foreground'>{product.description}</p>
            </div>
          </div>
        </div>
      </main>
      {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
    </div>
  );
};

export default ProductPage;
