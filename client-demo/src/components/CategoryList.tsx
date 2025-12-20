import { categories } from '@/data/products';

const CategoryList = () => {
  return (
    <section className='py-6'>
      <h2 className='text-xl font-bold text-foreground mb-4'>
        Shop by Category
      </h2>
      <div className='grid grid-cols-3 sm:grid-cols-6 gap-3'>
        {categories.map((category) => (
          <button
            key={category.id}
            data-analytics-id={`category-${category.id}`}
            className={`${category.color} rounded-lg p-4 text-center hover:scale-105 transition-transform`}
          >
            <span className='text-3xl mb-2 block'>{category.icon}</span>
            <span className='text-sm font-medium text-foreground'>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
