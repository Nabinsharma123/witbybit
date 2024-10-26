import { useRef, useState } from "react";
import { Category, Product, ProductCombinationsInterface, ProductDescriptionInterface, ProductPriceInfoInterface, ProductVariantInterface } from "../types";
import ProductDescriptionForm from "./product/ProductDescriptionForm";
import { PRODUCT_INITIAL_STATE } from "../constands";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductVariantForm from "./product/ProductVariantsForm";
import ProductCombinationForm from "./product/ProductCombinationForm";
import ProductPriceInfoForm from "./product/ProductPriceInfoForm";

const AddProductModal = ({
    save,
    categories,
    close
}: {
    save: (product: Product) => void,
    categories: Category[],
    close: () => void
}) => {
    const [product, setProduct] = useState<Product>(PRODUCT_INITIAL_STATE);
    const [currentTab, setCurrentTab] = useState<number>(1);

    const productVariantFormRef = useRef<{ saveVariant: () => void }>(),
        productCombinationFormRef = useRef<{ saveCombinations: () => void }>(),
        productDescriptionFormRef = useRef<{ saveDescription: () => void }>(),
        productPriceInfoFormRef = useRef<{ savePriceInfo: () => void }>();

    const addVariantsToProduct = (variants: ProductVariantInterface[]) => {
        setProduct((prev) => ({
            ...prev,
            variants
        }))
        setCurrentTab(3)
    }

    const addCombinationsToProduct = (combinations: Record<string, ProductCombinationsInterface>) => {
        setProduct((prev) => ({
            ...prev,
            combinations
        }))
        setCurrentTab(4)
    }

    const addDescriptionToProduct = (description: ProductDescriptionInterface) => {
        setProduct((prev) => ({
            ...prev,
            ...description
        }))
        setCurrentTab(2)
    }

    const addPriceInfoToProduct = (priceInfo: ProductPriceInfoInterface) => {

        const createdProduct:Product={
            ...product,
            ...priceInfo
        }
        setProduct(createdProduct)
        
        save(createdProduct)
    }

    const saveDataAndMoveToNextTab = () => {
        if (currentTab === 1 && productDescriptionFormRef.current) {
            productDescriptionFormRef.current.saveDescription()
        } else if (currentTab === 2 && productVariantFormRef.current) {
            productVariantFormRef.current.saveVariant()
        } else if (currentTab === 3 && productCombinationFormRef.current) {
            productCombinationFormRef.current.saveCombinations()
        } else if (currentTab === 4 && productPriceInfoFormRef.current) {
            productPriceInfoFormRef.current.savePriceInfo()
        }
    }

    const backOrCancelClick = () => {
        if (currentTab === 1) {
            close()
        } else {
            setCurrentTab(currentTab - 1)
        }
    }


    return (
        <div className="fixed flex flex-col h-screen w-screen bg-[var(--pageColor)]">
            <div className="flex-1 px-6 py-4 font-semibold text-2xl" >
                Add product
            </div>
            <div className="flex justify-center">
                    <div className="flex items-center w-[560px] justify-between gap-4 py-2 h-fit">
                        <button className={`text-gray-500 px-3 py-1 rounded-lg font-medium text-sm ${currentTab >= 1 ? "selectedTab" : ""}`}>
                            Description
                        </button>
                        <Icon icon={"ep:arrow-right-bold"} className={currentTab >= 2 ? "text-primary" : "text-gray-500"} />

                        <button className={`text-gray-500 px-3 py-1 rounded-lg font-medium text-sm ${currentTab >= 2 ? "selectedTab" : ""}`}>
                            Variants
                        </button>
                        <Icon icon={"ep:arrow-right-bold"} className={currentTab >= 3 ? "text-primary" : "text-gray-500"} />

                        <button className={`text-gray-500 px-3 py-1 rounded-lg font-medium text-sm ${currentTab >= 3 ? "selectedTab" : ""}`}>
                            Combinations
                        </button>
                        <Icon icon={"ep:arrow-right-bold"} className={currentTab >= 4 ? "text-primary" : "text-gray-500"} />

                        <button className={`text-gray-500 px-3 py-1 rounded-lg font-medium text-sm ${currentTab >= 4 ? "selectedTab" : ""}`}>
                            Price info
                        </button>
                    </div>

            </div>
            <div className="h-full overflow-auto flex justify-center">
                <div className="w-[560px] h-fit">

                    <div className="m-2 ">
                        {currentTab == 1 &&
                            <ProductDescriptionForm
                                categories={categories}
                                existingProduct={product}
                                save={addDescriptionToProduct}
                                ref={productDescriptionFormRef}
                            />
                        }

                        {currentTab == 2 &&
                            <ProductVariantForm
                                existingVariants={product.variants}
                                ref={productVariantFormRef}
                                save={addVariantsToProduct}
                            />
                        }

                        {currentTab == 3 &&
                            <ProductCombinationForm
                                existingCombinations={product.combinations}
                                variants={product.variants}
                                ref={productCombinationFormRef}
                                save={addCombinationsToProduct}
                            />
                        }

                        {currentTab == 4 &&
                            <ProductPriceInfoForm
                                existingProduct={product}
                                ref={productPriceInfoFormRef}
                                save={addPriceInfoToProduct}
                            />
                        }


                        <div className="flex justify-end my-8">
                            <div>
                                <button onClick={backOrCancelClick} type="button" className="secondaryButton">{currentTab == 1 ? "Cancel" : "Back"}</button>
                                <button onClick={saveDataAndMoveToNextTab} type="button" className=" primaryButton ml-4">Next</button>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AddProductModal