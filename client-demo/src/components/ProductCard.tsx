import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      data-analytics-id={`product-card-${product.id}`}
      className='group'
    >
      <div className='bg-card rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1'>
        <div className='relative aspect-square bg-secondary'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          {product.discount && (
            <Badge className='absolute top-2 left-2 badge-sale'>
              -{product.discount}%
            </Badge>
          )}
        </div>
        <div className='p-3'>
          <h3 className='font-medium text-foreground line-clamp-2 text-sm mb-1 group-hover:text-primary transition-colors'>
            {product.name}
          </h3>
          <div className='flex items-center gap-1 mb-2'>
            <div className='flex items-center gap-0.5 bg-success text-success-foreground px-1.5 py-0.5 rounded text-xs'>
              <span>{product.rating}</span>
              <Star className='w-3 h-3 fill-current' />
            </div>
            <span className='text-xs text-muted-foreground'>
              ({product.reviews.toLocaleString()})
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-bold text-foreground'>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className='text-sm text-price-strike'>
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
