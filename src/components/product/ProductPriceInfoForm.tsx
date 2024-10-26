import { Icon } from "@iconify/react/dist/iconify.js"
import { Product, ProductPriceInfoInterface } from "../../types"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"

const ProductPriceInfoForm =forwardRef( ({
    existingProduct,
    save
}: {
    existingProduct:Product ,
    save:(priceInfo: ProductPriceInfoInterface) => void
},ref) => {

    const [priceInfo, setPriceInfo] = useState<ProductPriceInfoInterface>({
            discount:existingProduct.discount,
            priceInr:existingProduct.priceInr,
    });

    const productPriceInrInputParentElementRef=useRef<HTMLDivElement>(null)

    useImperativeHandle(ref,()=>{
        return{
            savePriceInfo:validateAndSave,
        }
    })


    const validateAndSave=()=>{
        productPriceInrInputParentElementRef.current?.classList.remove("invalidInputElement")

        if(!priceInfo.priceInr){
            productPriceInrInputParentElementRef.current?.classList.add("invalidInputElement")
            return
        }

        save(priceInfo)
    }




    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="mb-4 font-bold">
                Price Info
            </div>
            <div className="mb-3">
                <label htmlFor="productName" className="text-xs text-black">Price *</label><br />
                <div ref={productPriceInrInputParentElementRef} className="inputParentElement">
                    <input
                        required
                        value={priceInfo.priceInr}
                        className="p-2 w-full rounded-md outline-none"
                        onChange={(event) => setPriceInfo(prev => ({
                            ...prev,
                            priceInr: Number(event.target.value)
                        }))}
                        id="productName"
                        type="number"
                    />

                </div>

            </div>

            <div className="mb-3">
                <label htmlFor="productName" className="text-xs text-black">Discount</label><br />
                <div className="flex justify-between gap-4 ">

                    <div className="inputParentElement flex-[4]">
                    <input
                        value={priceInfo.discount.value}
                        className="p-2 w-full rounded-md outline-none"
                        onChange={(event) => setPriceInfo(prev => ({
                            ...prev,
                            discount: {
                                ...prev.discount,
                                value: Number(event.target.value)
                            }
                        }))}
                        id="productName"
                        type="number"
                    />

                    </div>

                    <div className="flex border flex-1 overflow-hidden rounded-lg">
                        <button className={`p-2 w-full ${priceInfo.discount.method == "pct" ? "bg-gray-200" : ""}`} 
                            onClick={()=>setPriceInfo(prev=>({
                                ...prev,
                                discount:{
                                    ...prev.discount,
                                    method:"pct"
                                }
                            }))}>
                            <Icon icon={"mynaui:percentage"} 
                            className="mx-auto"/>
                        </button>
                        <button className={`p-2 w-full ${priceInfo.discount.method == "flat" ? "bg-gray-200" : ""}`} 
                            onClick={()=>setPriceInfo(prev=>({
                                ...prev,
                                discount:{
                                    ...prev.discount,
                                    method:"flat"
                                }
                            }))}>
                            <Icon icon={"ion:logo-usd"} 
                            className="mx-auto"/>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )

})

export default ProductPriceInfoForm