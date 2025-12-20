import { ShoppingCart, Search, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className='sticky top-0 z-50 bg-card border-b border-border shadow-sm'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between gap-4'>
          {/* Logo */}
          <Link
            to='/'
            data-analytics-id='nav-logo'
            className='flex items-center gap-2 shrink-0'
          >
            <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
              <span className='text-primary-foreground font-bold text-xl'>
                S
              </span>
            </div>
            <span className='text-xl font-bold text-foreground hidden sm:block'>
              ShopHub
            </span>
          </Link>

          {/* Search Bar */}
          <div className='flex-1 max-w-xl'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                type='text'
                placeholder='Search products...'
                data-analytics-id='search-bar'
                className='pl-10 bg-secondary border-0'
              />
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              data-analytics-id='user-btn'
              size='icon'
              className='hidden sm:flex'
            >
              <User className='w-5 h-5' />
            </Button>
            <Button
              variant='ghost'
              data-analytics-id='wishlist-btn'
              size='icon'
              className='hidden sm:flex'
            >
              <Heart className='w-5 h-5' />
            </Button>
            <Link to='/cart' data-analytics-id='cart-btn'>
              <Button variant='ghost' size='icon' className='relative'>
                <ShoppingCart className='w-5 h-5' />
                {cartCount > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium'>
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
