import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useAnalytics } from '@/hooks/useAnalytics';
import HeatmapOverlay from '@/components/HeatmapOverlay';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { isHeatmapMode, tracker } = useAnalytics();

  if (cart.length === 0 && !isComplete) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='container mx-auto px-4 py-12 text-center'>
          <h1 className='text-2xl font-bold text-foreground mb-4'>
            No items to checkout
          </h1>
          <Link to='/' data-analytics-id='continue-shopping-empty'>
            <Button>Continue Shopping</Button>
          </Link>
        </main>
        {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='container mx-auto px-4 py-12 text-center'>
          <div className='max-w-md mx-auto'>
            <CheckCircle className='w-20 h-20 text-success mx-auto mb-4' />
            <h1 className='text-2xl font-bold text-foreground mb-2'>
              Order Placed!
            </h1>
            <p className='text-muted-foreground mb-6'>
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <Link to='/' data-analytics-id='continue-shopping-success'>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setIsComplete(true);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/cart');
  };

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <Link
          to='/cart'
          data-analytics-id='back-to-cart'
          className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Cart
        </Link>

        <h1 className='text-2xl font-bold text-foreground mb-6'>Checkout</h1>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Checkout Form */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Shipping Address */}
            <div className='bg-card rounded-lg border border-border p-4'>
              <div className='flex items-center gap-2 mb-4'>
                <Truck className='w-5 h-5 text-primary' />
                <h2 className='font-semibold text-foreground'>
                  Shipping Address
                </h2>
              </div>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    data-analytics-id='input-firstname'
                    placeholder='John'
                    className='mt-1'
                  />
                </div>
                <div>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    id='lastName'
                    data-analytics-id='input-lastname'
                    placeholder='Doe'
                    className='mt-1'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Input
                    id='address'
                    data-analytics-id='input-address'
                    placeholder='123 Main St'
                    className='mt-1'
                  />
                </div>
                <div>
                  <Label htmlFor='city'>City</Label>
                  <Input
                    id='city'
                    data-analytics-id='input-city'
                    placeholder='New York'
                    className='mt-1'
                  />
                </div>
                <div>
                  <Label htmlFor='zip'>ZIP Code</Label>
                  <Input
                    id='zip'
                    data-analytics-id='input-zip'
                    placeholder='10001'
                    className='mt-1'
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className='bg-card rounded-lg border border-border p-4'>
              <div className='flex items-center gap-2 mb-4'>
                <CreditCard className='w-5 h-5 text-primary' />
                <h2 className='font-semibold text-foreground'>
                  Payment Information
                </h2>
              </div>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='cardNumber'>Card Number</Label>
                  <Input
                    id='cardNumber'
                    data-analytics-id='input-card-number'
                    placeholder='1234 5678 9012 3456'
                    className='mt-1'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='expiry'>Expiry Date</Label>
                    <Input
                      id='expiry'
                      data-analytics-id='input-expiry'
                      placeholder='MM/YY'
                      className='mt-1'
                    />
                  </div>
                  <div>
                    <Label htmlFor='cvv'>CVV</Label>
                    <Input
                      id='cvv'
                      data-analytics-id='input-cvv'
                      placeholder='123'
                      className='mt-1'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-card rounded-lg border border-border p-4 sticky top-24'>
              <h2 className='text-lg font-bold text-foreground mb-4'>
                Order Summary
              </h2>

              {/* Items */}
              <div className='space-y-3 mb-4 max-h-48 overflow-y-auto'>
                {cart.map((item) => (
                  <div key={item.id} className='flex gap-3'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-12 h-12 object-cover rounded'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-foreground truncate'>
                        {item.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className='text-sm font-medium'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className='border-t border-border pt-4 space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className='text-success'>Free</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className='border-t border-border pt-2 flex justify-between text-lg font-bold'>
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className='mt-4 space-y-2'>
                <Button
                  className='w-full'
                  size='lg'
                  onClick={handlePlaceOrder}
                  data-analytics-id='place-order'
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={handleCancel}
                  data-analytics-id='cancel-order'
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
    </div>
  );
};

export default CheckoutPage;
