import { Icon } from "@iconify/react/dist/iconify.js"
import { ProductVariantInterface } from "../../types"
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ProductVariantForm = forwardRef(({
    existingVariants,
    save
}: {
    existingVariants: ProductVariantInterface[],
    save: (variants: ProductVariantInterface[]) => void
}, ref) => {

    const [options, setOptions] = useState<ProductVariantInterface[]>(existingVariants);

    const form = useRef<HTMLFormElement>(null),
        optionValueTagInputElementRefArray = useRef<HTMLDivElement[]>([]);


    useImperativeHandle(ref, () => {
        return {
            saveVariant: validateAndSave
        }
    });

    const validateAndSave = () => {
        if (!form.current) return

        let isFormValid = true

        let elements = Array.from(form.current?.elements).map((element) => element as HTMLInputElement)

        elements = elements.filter((element) => element.nodeName !== "BUTTON")

        form.current.classList.remove("invalidInputElement")


        elements.forEach((element) => {
            element?.parentElement?.classList.remove("invalidInputElement")
        })

        options.forEach((_, index) => {
            optionValueTagInputElementRefArray.current[index].classList.remove("invalidInputElement")
        })



        if (!options.length) {
            isFormValid = false
            form.current.classList.add("invalidInputElement")
        }

        if (!form.current.checkValidity()) {
            isFormValid = false
            elements.forEach((element) => {
                if (!element.checkValidity()) {
                    element?.parentElement?.classList.add("invalidInputElement")
                }
            })

        }

        options.forEach((option, index) => {
            if (!option.values?.length) {
                isFormValid = false
                console.log(optionValueTagInputElementRefArray.current[index]);

                optionValueTagInputElementRefArray.current[index].classList.add("invalidInputElement")
                optionValueTagInputElementRefArray.current[index].setAttribute("data-after", "values can't be empty")
            }
        })


        if (isFormValid) save(options);
    }


    const addOption = () => {
        setOptions([...options, {
            name: "",
            values: []
        }])
    }

    const changeOptionName = (optionIndex: number, value: string) => {
        const optionsClone = structuredClone(options)
        optionsClone[optionIndex].name = value
        setOptions(optionsClone)
    }

    const setOptionValue = (optionIndex: number, valueIndex: number, value: string) => {
        const optionsClone = structuredClone(options)
        optionsClone[optionIndex].values[valueIndex] = value
        setOptions(optionsClone)

    }

    const addValueToOption = (optionIndex: number, value: string) => {
        const optionsClone = structuredClone(options)
        optionsClone[optionIndex].values.push(value)
        setOptions(optionsClone)
    }

    const removeOptionValue = (optionIndex: number, valueIndex: number) => {
        const optionsClone = structuredClone(options)
        optionsClone[optionIndex].values = optionsClone[optionIndex].values.filter((_, index) => index !== valueIndex)
        setOptions(optionsClone)
    }

    const removeOption = (optionIndex: number) => {
        let optionsClone = structuredClone(options)
        optionsClone = optionsClone.filter((_, index) => index !== optionIndex)
        setOptions(optionsClone)
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow">

            <div className="mb-4 font-bold">
                Variants
            </div>


            {options.length != 0 &&
                <div className="flex mb-3">
                    <div className="text-xs flex-1 text-black">Option *</div>
                    <div className="text-xs flex-[2] text-black">Values *</div>
                </div>

            }

            <form data-after="At least 1 variant is required" className="!border-0" ref={form}>
                {options.map((option, optionIndex) => {
                    return (
                        <div key={optionIndex} className="mb-2 flex gap-4 items-start">
                            <div className="flex-1">
                                <div className="inputParentElement"
                                    data-after="Option can't be empty"
                                >
                                    <input
                                        required
                                        value={option.name}
                                        className="w-full p-2 rounded-md outline-none"
                                        onChange={(event) => changeOptionName(optionIndex, event?.target.value)}
                                        name="option"
                                        type="text"
                                    />

                                </div>
                            </div>

                            <div className="flex-[2]">
                                <div ref={(element) => optionValueTagInputElementRefArray.current[optionIndex] = element as HTMLDivElement} className="border flex gap-2 flex-wrap rounded-md w-full p-1 text-sm outline-none">
                                    {option.values.map((value, valueIndex) => {
                                        return (
                                            <div
                                                data-after=""
                                                key={valueIndex}
                                                className="w-fit !m-0 flex items-center gap-1 px-1 rounded bg-gray-100"
                                            >
                                                <input
                                                    required
                                                    value={value}
                                                    className="border font-medium bg-gray-100 m-1 border-none rounded-md text-sm outline-none"
                                                    style={{ width: value?.length ? `${value?.length + 1}ch` : "3ch" }}
                                                    onChange={(event) => {
                                                        const charLength = event?.target.value.length
                                                        event.target.style.width = `${charLength + 1}ch`

                                                        setOptionValue(optionIndex, valueIndex, event?.target.value)
                                                    }}
                                                    type="text"
                                                />
                                                <button type="button" onClick={() => removeOptionValue(optionIndex, valueIndex)}>
                                                    <Icon icon={"maki:cross"} />
                                                </button>
                                            </div>
                                        )
                                    })}
                                    <button
                                        className="p-1 flex text-primary items-center"
                                        type="button" onClick={() => addValueToOption(optionIndex, "")}
                                    >
                                        <Icon icon={"ic:round-plus"} className="text-xl inline mr-1" />
                                        Add
                                    </button>


                                </div>

                            </div>

                            <div className="p-2">
                                <button

                                    onClick={() => removeOption(optionIndex)}
                                    type="button"
                                >
                                    <Icon icon={"mi:delete"} className="text-red-500" />
                                </button>

                            </div>

                        </div>
                    )
                })}


                <button
                    type="button"
                    onClick={addOption}
                    className="flex gap-1 text-primary items-center"
                >
                    <Icon icon={"ic:round-plus"} className="text-xl" />
                    Add Option
                </button>
            </form>


        </div>
    )
})

export default ProductVariantForm