import { useState, useEffect } from 'react';
import { Clock, Gift } from 'lucide-react';
import type { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface DealSectionProps {
  title: string;
  products: Product[];
  showTimer?: boolean;
  icon?: 'clock' | 'gift';
}

const DealSection = ({
  title,
  products,
  showTimer,
  icon,
}: DealSectionProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    if (!showTimer) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showTimer]);

  const Icon = icon === 'gift' ? Gift : Clock;

  return (
    <section className='py-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <Icon
            className={`w-5 h-5 ${
              icon === 'gift' ? 'text-deal' : 'text-primary'
            }`}
          />
          <h2 className='text-xl font-bold text-foreground'>{title}</h2>
        </div>
        {showTimer && (
          <div className='flex items-center gap-1 text-deal font-mono font-bold'>
            <span className='bg-deal text-deal-foreground px-2 py-1 rounded'>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            :
            <span className='bg-deal text-deal-foreground px-2 py-1 rounded'>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            :
            <span className='bg-deal text-deal-foreground px-2 py-1 rounded'>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default DealSection;
