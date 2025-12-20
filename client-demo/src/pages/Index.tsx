import Header from '@/components/Header';
import CategoryList from '@/components/CategoryList';
import DealSection from '@/components/DealSection';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import HeroCarousel from '@/components/HeroCarousel';
import { useAnalytics } from '@/hooks/useAnalytics';
import HeatmapOverlay from '@/components/HeatmapOverlay';

const Index = () => {
  const { recentlyViewed } = useCart();
  const { isHeatmapMode, tracker } = useAnalytics();

  const hourlyDeals = products.filter((p) => p.isHourlyDeal);
  const christmasDeals = products.filter((p) => p.isChristmasDeal);

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <HeroCarousel />
        <CategoryList />

        <DealSection
          title='Hourly Deals'
          products={hourlyDeals}
          showTimer
          icon='clock'
        />

        <DealSection
          title='Christmas Deals'
          products={christmasDeals}
          icon='gift'
        />

        {recentlyViewed.length > 0 && (
          <section className='py-6'>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              Continue Where You Left
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {recentlyViewed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <section className='py-6'>
          <h2 className='text-xl font-bold text-foreground mb-4'>
            All Products
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      {isHeatmapMode && <HeatmapOverlay tracker={tracker} />}
    </div>
  );
};

export default Index;
