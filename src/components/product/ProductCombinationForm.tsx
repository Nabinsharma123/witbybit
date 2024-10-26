import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ProductCombinationsInterface, ProductVariantInterface } from "../../types"
import { ALPHABET_LIST } from "../../constands"

const ProductCombinationForm = forwardRef(({
    existingCombinations,
    variants,
    save
}: {
    existingCombinations: Record<string, ProductCombinationsInterface>
    variants: ProductVariantInterface[],
    save: (combinations: Record<string, ProductCombinationsInterface>) => void
}, ref) => {

    const [combinations, setCombinations] = useState<ProductCombinationsInterface[]>([]);

    const form = useRef<HTMLFormElement>(null)

    useImperativeHandle(ref, () => {
        return {
            saveCombinations: validateAndSave
        }
    });


    const validateAndSave = () => {
        if (!form.current) return

        let isFormValid = true

        let elements = Array.from(form.current?.elements).map((element) => element as HTMLInputElement)

        elements = elements.filter((element) => element.required)

        elements.forEach((element) => {
            element?.parentElement?.classList.remove("invalidInputElement")
        })

        if (!form.current.checkValidity()) {
            isFormValid = false
            elements.forEach((element) => {
                if (!element.checkValidity()) {
                    element?.parentElement?.classList.add("invalidInputElement")
                    element?.parentElement?.setAttribute("data-after", `${element.name} can't be empty`)

                }
            })
            return
        }

        elements.forEach((element, elementIndex) => {
            const skuList = combinations.map((combination) => combination?.sku)

            for (let i = 0; i < elementIndex; i++) {
                if (element.value === skuList[i]) {
                    isFormValid = false
                    element?.parentElement?.classList.add("invalidInputElement")
                    element?.parentElement?.setAttribute("data-after", "Duplicate SKU")

                }
            }

        })

        if (isFormValid) {

            const combinationMapForProduct = combinations.reduce((ac, combination, index) => {
                return ac = { 
                    ...ac, 
                    [ALPHABET_LIST[index]]:{ 
                        ...combination,
                        quantity:combination?.inStock?combination?.quantity:null
                    } 
                }
            }, {} as Record<string, ProductCombinationsInterface>)

            save(combinationMapForProduct);

        }

    }


    function generateCombinations(matrix: string[][], row = 0, currentCombination: string[] = [], result: string[] = []) {
        if (row === matrix.length) {
            result.push(currentCombination.join('/'));
            return result;
        }

        for (let i = 0; i < matrix[row].length; i++) {
            generateCombinations(matrix, row + 1, [...currentCombination, matrix[row][i]], result);
        }

        return result;
    }

    useEffect(() => {

        const variantMatrix: string[][] = []
        variants.forEach((variant) => {
            variantMatrix.push(variant.values)
        })


        const variantValuesCombinations = generateCombinations(variantMatrix)


        const variantCombinationForProduct: ProductCombinationsInterface[] = []
        variantValuesCombinations.forEach((variantValuesCombination) => {
            variantCombinationForProduct.push({
                inStock: false,
                name: variantValuesCombination,
                quantity: 0,
                sku: ""
            })

        })

        //setting previously saved value
        if (Object.keys(existingCombinations).length) {
            for (const obj of Object.entries(existingCombinations)) {
                const variantCombinationIndex = variantCombinationForProduct.findIndex(combination => combination.name === obj[1].name)
                if (variantCombinationIndex != -1) variantCombinationForProduct[variantCombinationIndex] = obj[1]

            }
        }

        setCombinations(variantCombinationForProduct)

    }, [])

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="mb-4 font-bold">
                Combinations
            </div>
            <div>
                <div className="flex gap-2 mb-2 justify-between">
                    <div className="flex-[1.5]" />
                    <div className="flex-[2] text-xs mb-2 text-black">SKU *</div>
                    <div className="flex-1 text-xs mb-2 text-black">In stock</div>
                    <div className="flex-[2] text-xs mb-2 text-black">Quantity</div>

                </div>

                <form ref={form}>

                    {combinations.map((combination, combinationIndex) => {
                        return <div key={combination.name} className="flex gap-2 mb-3 items-start justify-between">
                            <div className="flex-[1.5] py-2">{combination.name}</div>
                            <div className="flex-[2] inputParentElement"
                            >
                                <input
                                    required
                                    className="w-full p-2 rounded-md outline-none"
                                    value={combination.sku}
                                    onChange={(event) => {
                                        const combinationClone = structuredClone(combinations)
                                        combinationClone[combinationIndex].sku = event.target.value

                                        setCombinations(combinationClone)
                                    }}
                                    name="SKU"
                                    type="text" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <label className="w-full py-2 flex justify-center items-center cursor-pointer">
                                    <input type="checkbox" checked={combination.inStock}
                                        onChange={(event) => {
                                            const combinationClone = structuredClone(combinations)
                                            combinationClone[combinationIndex].inStock = event.target.checked

                                            setCombinations(combinationClone)
                                        }}
                                        className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                                </label>
                            </div>
                            <div className="flex-[2] inputParentElement" >
                                <input className="w-full p-2 rounded-md outline-none" disabled={!combination.inStock} value={combination.inStock ? Number(combination.quantity) : ""} type="number"
                                    onChange={(event) => {

                                        const combinationClone = structuredClone(combinations)
                                        combinationClone[combinationIndex].quantity = Number(event.target.value)

                                        setCombinations(combinationClone)

                                       
                                    }
                                    }
                                />
                            </div>
                        </div>
                    })}

                </form>
            </div>

        </div>
    )
})

export default ProductCombinationForm