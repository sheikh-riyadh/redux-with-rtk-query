import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggle, toggleBrands } from "../../features/filter/filterSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  const dispatch = useDispatch()
  const { brands, stock, } = useSelector(state => state.filter)

  const { data: products, isLoading } = useGetProductsQuery(null, { refetchOnMountOrArgChange: true })

  if (isLoading) {
    return <div className="flex justify-center">
      <p className="text-xl font-bold">Loading...</p>
    </div>
  }

  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (products?.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }
  if (products?.length && (stock || brands?.length)) {
    content = products.filter(product => {
      if (stock) {
        return product.status === true
      }
      return product;
    }).filter(product => {
      if (brands?.length) {
        return brands.includes(product.brand)
      }
      return product;
    }).map(product => <ProductCard key={product.model} product={product} />)
  }

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${stock && activeClass} `}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") && activeClass}`} onClick={() => dispatch(toggleBrands("amd"))}>
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") && activeClass}`} onClick={() => dispatch(toggleBrands("intel"))}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;