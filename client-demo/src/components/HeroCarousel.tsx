import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: 'Winter Sale',
    subtitle: 'Up to 50% off on electronics',
    bg: 'bg-gradient-to-r from-blue-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Christmas Deals',
    subtitle: 'Special offers on gifts & more',
    bg: 'bg-gradient-to-r from-red-500 to-pink-500',
  },
  {
    id: 3,
    title: 'New Arrivals',
    subtitle: 'Discover the latest trends',
    bg: 'bg-gradient-to-r from-green-500 to-teal-500',
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <div className='relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg'>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === current ? 'opacity-100' : 'opacity-0'
          } ${slide.bg}`}
        >
          <div className='h-full flex flex-col items-center justify-center text-white text-center px-4'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>
              {slide.title}
            </h2>
            <p className='text-lg sm:text-xl opacity-90'>{slide.subtitle}</p>
            <Button
              data-analytics-id={`carousel-shop-now-${slide.id}`}
              className='mt-4 bg-white text-foreground hover:bg-white/90'
            >
              Shop Now
            </Button>
          </div>
        </div>
      ))}

      <Button
        variant='ghost'
        size='icon'
        data-analytics-id='carousel-prev'
        className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40'
        onClick={prev}
      >
        <ChevronLeft className='w-6 h-6' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        data-analytics-id='carousel-next'
        className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40'
        onClick={next}
      >
        <ChevronRight className='w-6 h-6' />
      </Button>

      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            data-analytics-id={`carousel-dot-${index}`}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
