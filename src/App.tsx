import { useEffect, useState } from 'react';
import CategoryCard from './components/CategoryCard'
import Navbar from './components/Navbar'
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from './constands';
import AddCategoryModal from './components/AddCategoryModal';
import { v4 as uuidv4 } from 'uuid';
import { Category, CategoryCardInterface, Product } from './types';
import AddProductModal from './components/AddProductModal';

function App() {

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES),
    [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS),
    [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState<boolean>(false),
    [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false),
    [categoryCards, setCategoryCards] = useState<CategoryCardInterface[]>([]);



  useEffect(() => {
    setCategoryCards(categories.map((category) => {
      const CategoryCard: CategoryCardInterface = {
        id: category?.id,
        name: category?.name,
        products: products.filter((product) => product?.category === category?.name)
        .map((product) => {
          return {
            name: product?.name,
            priceInr: product?.priceInr,
            brand: product?.brand,
            image:product?.image
          }
        })
      }

      return CategoryCard
    }))

  }, [categories, products])

  useEffect(()=>{
    console.log({categories,products});
  },[categories,products])

  const addCategory = (name: string) => {
    setCategories((prev) => ([...prev, {
      id: uuidv4(),
      name
    }]))

    setIsAddCategoryModalOpen(false)
  }

  const addProduct = (product: Product) => {
    setProducts((prev) => ([
      ...prev,
      product
    ]))
    setIsAddProductModalOpen(false)
  }

  return (

    <div className="h-screen flex flex-col ">
      <div className='flex-1 px-6 py-6'>
        <Navbar
          openAddCategoryModal={() => setIsAddCategoryModalOpen(true)}
          openAddProductModal={() => setIsAddProductModalOpen(true)}
        />
      </div>
      <div className="h-full overflow-auto flex gap-4 px-6 pb-6">
        {categoryCards.map((category) =>
          <CategoryCard key={category?.id} category={category} />
        )}
      </div>

      {isAddCategoryModalOpen &&
        <AddCategoryModal addCategory={addCategory} close={() => setIsAddCategoryModalOpen(false)} />
      }

      {isAddProductModalOpen &&
        <AddProductModal save={addProduct} categories={categories} close={() => setIsAddProductModalOpen(false)} />
      }
    </div>


  )
}

export default App
