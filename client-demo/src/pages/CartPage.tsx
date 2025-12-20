import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Heart, Truck, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useAnalytics } from '@/hooks/useAnalytics';
import HeatmapOverlay from '@/components/HeatmapOverlay';

const CartPage = () => {
  const {
    cart,
    savedItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
  } = useCart();
  const { isHeatmapMode, tracker } = useAnalytics();

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  const handleSaveForLater = (item: (typeof cart)[0]) => {
    saveForLater(item);
    toast.success('Item saved for later');
  };

  if (cart.length === 0 && savedItems.length === 0) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='container mx-auto px-4 py-12 text-center'>
          <h1 className='text-2xl font-bold text-foreground mb-4'>
            Your cart is empty
          </h1>
          <p className='text-muted-foreground mb-6'>
            Add some products to get started!
          </p>
          <Link to='/' data-analytics-id='continue-shopping-empty'>
            <Button>Continue Shopping</Button>
          </Link>
          {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <h1 className='text-2xl font-bold text-foreground mb-6'>
          Shopping Cart
        </h1>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {cart.map((item) => (
              <div
                key={item.id}
                className='bg-card rounded-lg border border-border p-4'
              >
                <div className='flex gap-4'>
                  <Link
                    to={`/product/${item.id}`}
                    data-analytics-id={`cart-item-image-${item.id}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-24 h-24 object-cover rounded-lg'
                    />
                  </Link>
                  <div className='flex-1'>
                    <Link
                      to={`/product/${item.id}`}
                      data-analytics-id={`cart-item-name-${item.id}`}
                    >
                      <h3 className='font-medium text-foreground hover:text-primary transition-colors'>
                        {item.name}
                      </h3>
                    </Link>
                    <div className='flex items-center gap-2 mt-1'>
                      <span className='text-lg font-bold text-foreground'>
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className='text-sm text-price-strike'>
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-success mt-1'>In Stock</p>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-4 mt-3'>
                      <div className='flex items-center border border-border rounded-lg'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          data-analytics-id={`qty-decrease-${item.id}`}
                        >
                          <Minus className='w-4 h-4' />
                        </Button>
                        <span className='w-8 text-center font-medium'>
                          {item.quantity}
                        </span>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8'
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          data-analytics-id={`qty-increase-${item.id}`}
                        >
                          <Plus className='w-4 h-4' />
                        </Button>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-muted-foreground'
                        onClick={() => handleRemove(item.id)}
                        data-analytics-id={`remove-item-${item.id}`}
                      >
                        <Trash2 className='w-4 h-4 mr-1' />
                        Remove
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-muted-foreground'
                        onClick={() => handleSaveForLater(item)}
                        data-analytics-id={`save-item-${item.id}`}
                      >
                        <Heart className='w-4 h-4 mr-1' />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Delivery Options */}
            <div className='bg-card rounded-lg border border-border p-4'>
              <div className='flex items-center gap-2 mb-3'>
                <Truck className='w-5 h-5 text-primary' />
                <span className='font-semibold text-foreground'>
                  Delivery Options
                </span>
              </div>
              <div className='space-y-2'>
                <label
                  className='flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary'
                  data-analytics-id='delivery-standard'
                >
                  <input
                    type='radio'
                    name='delivery'
                    defaultChecked
                    className='text-primary'
                  />
                  <div>
                    <p className='font-medium text-foreground'>
                      Standard Delivery
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      5-7 business days - Free
                    </p>
                  </div>
                </label>
                <label
                  className='flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary'
                  data-analytics-id='delivery-express'
                >
                  <input
                    type='radio'
                    name='delivery'
                    className='text-primary'
                  />
                  <div>
                    <p className='font-medium text-foreground'>
                      Express Delivery
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      2-3 business days - $9.99
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Options */}
            <div className='bg-card rounded-lg border border-border p-4'>
              <div className='flex items-center gap-2 mb-3'>
                <CreditCard className='w-5 h-5 text-primary' />
                <span className='font-semibold text-foreground'>
                  Payment Options
                </span>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                {['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay'].map(
                  (method) => (
                    <div
                      key={method}
                      data-analytics-id={`payment-${method
                        .toLowerCase()
                        .replace(' ', '-')}`}
                      className='p-3 border border-border rounded-lg text-center text-sm text-muted-foreground cursor-pointer hover:bg-secondary'
                    >
                      {method}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className='bg-card rounded-lg border border-border p-4'>
                <h3 className='font-semibold text-foreground mb-4'>
                  Saved for Later ({savedItems.length})
                </h3>
                <div className='space-y-3'>
                  {savedItems.map((item) => (
                    <div key={item.id} className='flex items-center gap-3'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-16 h-16 object-cover rounded'
                      />
                      <div className='flex-1'>
                        <p className='font-medium text-foreground text-sm'>
                          {item.name}
                        </p>
                        <p className='text-sm font-bold'>${item.price}</p>
                      </div>
                      <Button
                        size='sm'
                        data-analytics-id={`move-to-cart-${item.id}`}
                        onClick={() => moveToCart(item)}
                      >
                        Move to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-card rounded-lg border border-border p-4 sticky top-24'>
              <h2 className='text-lg font-bold text-foreground mb-4'>
                Order Summary
              </h2>
              <div className='space-y-3 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>
                    Subtotal ({cart.length} items)
                  </span>
                  <span className='font-medium'>${cartTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className='text-success font-medium'>Free</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span className='font-medium'>
                    ${(cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className='border-t border-border pt-3 flex justify-between text-lg font-bold'>
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Link
                to='/checkout'
                data-analytics-id='proceed-to-checkout'
                className='block mt-4'
              >
                <Button className='w-full' size='lg'>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
    </div>
  );
};

export default CartPage;
