import { Category, Product, ProductDescriptionInterface } from "../../types"
import { Icon } from '@iconify/react';
import { convertBlobToDataURL } from "../../utils";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ProductDescriptionForm = forwardRef(({
    categories,
    existingProduct,
    save
}: {
    categories: Category[]
    existingProduct: Product,
    save: (description: ProductDescriptionInterface) => void
}, ref) => {

    const [description, setDescription] = useState<ProductDescriptionInterface>({
        brand: existingProduct.brand,
        category: existingProduct.category,
        name: existingProduct.name,
        image: existingProduct.image
    });

    const form = useRef<HTMLFormElement>(null);



    useImperativeHandle(ref, () => {
        return {
            saveDescription: validateAndSave
        }
    });

    const validateAndSave = () => {
        if (!form.current) return

        const elements = Array.from(form.current?.elements).map((element) => element as HTMLInputElement)

        elements.forEach((element) => {
            element?.parentElement?.classList.remove("invalidInputElement")
        })


        if (!form.current.checkValidity()) {
            elements.forEach((element) => {
                if (!element.checkValidity()) {
                    element?.parentElement?.setAttribute("data-after", `${element.name} can't be empty`)
                    element?.parentElement?.classList.add("invalidInputElement")
                }
            })
        } else {
            save(description);
        }
    }

    const onImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event?.target?.files?.length) {
            setDescription((prev) => ({
                ...prev,
                image: ""
            }))

            return
        }

        const file = event?.target?.files[0]
        const dataURL = await convertBlobToDataURL(file)
        setDescription((prev) => ({
            ...prev,
            image: dataURL
        }))

    }

    return (
        <div className="p-6 bg-white rounded-lg shadow">

            <div className="mb-4 font-semibold">
                Description
            </div>

            <form ref={form}>
                <div className="mb-3">
                    <label htmlFor="productName" className="text-xs text-black">Product name *</label><br />
                    <div
                        className="inputParentElement"
                    >
                        <input
                            required
                            value={description.name}
                            className="w-full p-2 rounded-md outline-none"
                            onChange={(event) => setDescription((prev) => ({
                                ...prev,
                                name: event.target.value
                            }))
                            }
                            name="name"
                            id="productName"
                            type="text"
                        />
                    </div>

                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="text-xs text-black">Category *</label><br />
                    <div
                        className="inputParentElement"

                    >
                        <select
                            required
                            value={description.category}
                            id="category"
                            name="Category"
                            className="w-full bg-white p-2 rounded-md outline-none"
                            onChange={(event) => setDescription((prev) => ({
                                ...prev,
                                category: event.target.value
                            }))
                            }
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => {
                                return <option key={category.id} value={category.name}>{category.name}</option>
                            })}
                        </select>

                    </div>

                </div>

                <div className="mb-3">
                    <label htmlFor="brand" className="text-xs text-black">Brand *</label><br />
                    <div
                        className="inputParentElement"

                    >
                        <input
                            required
                            value={description.brand}
                            className="p-2 rounded-md w-full outline-none"
                            id="brand"
                            name="Brand"
                            type="text"
                            onChange={(event) => setDescription((prev) => ({
                                ...prev,
                                brand: event.target.value
                            }))}
                        />
                    </div>
                </div>

                <div className="pt-5 w-fit">
                    {description?.image &&
                        <div className="h-20 mx-auto mb-4 rounded-lg overflow-hidden w-fit">
                            <img className="object-contain h-full" src={description?.image} alt="" />
                        </div>

                    }
                    <label
                        htmlFor="uploadImage"
                        className="flex font-bold cursor-pointer w-fit items-center gap-2 text-primary p-2 rounded-lg border border-primary transition-colors  hover:bg-primary hover:text-white"
                    >
                        <Icon icon={"mage:image-upload"} className=" text-xl" />
                        Upload Image
                        <input onChange={onImageUpload} accept="image/png, image/gif, image/jpeg" type="file" name="uploadImage" className="w-[1px] h-[1px]" id="uploadImage" />
                    </label>


                </div>


            </form>


        </div>
    )
})

export default ProductDescriptionForm