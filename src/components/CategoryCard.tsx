import { CategoryCardInterface } from "../types"

const CategoryCard = ({
    category
}: {
    category: CategoryCardInterface
}) => {
    return (
        <div className="bg-secondary h-full flex-shrink-0 flex flex-col rounded-lg w-[300px] p-4 font-bold">
            <div className="flex-1 mb-2 font-medium">
                {category?.name}
            </div>
            <div className="h-full overflow-auto">
                {category?.products.map((product) => {
                    return (
                        <div key={product?.name} className="bg-white mb-4 flex gap-4 p-2 rounded-lg shadow-md">
                            <div className="flex-1 bg-gray-200 rounded-md overflow-hidden">
                                {product?.image &&
                                    <img className="object-cover w-full h-full " src={product?.image} alt={product?.name} />
                                }
                            </div>
                            <div className="flex-[2]">
                                <div className="text-sm font-medium">{product?.name}</div>
                                <div className=" text-sm mb-2">₹{product?.priceInr}</div>
                                <div className="p-1 bg-sky-100 text-primary w-fit rounded-md text-xs">{product?.brand}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryCard