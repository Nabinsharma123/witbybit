import { useRef, useState } from "react";

const AddCategoryModal = ({
    close,
    addCategory
}: {
    close: () => void,
    addCategory: (name:string) => void
}
) => {

    const [categoryName, setCategoryName] = useState("");

   const categoryNameInputParentElementRef=useRef<HTMLDivElement>(null)
    
    const onSubmit=()=>{
        categoryNameInputParentElementRef.current?.classList?.remove("invalidInputElement")

        if(!categoryName){
            categoryNameInputParentElementRef.current?.classList?.add("invalidInputElement")
            return
        }
        addCategory(categoryName)
    }

    return (
        <div
            className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center bg-black/50">
            <div className="bg-white w-[500px] rounded-md p-6">
                <div className="font-semibold text-xl">
                    Add category
                </div>
                    <div className="mt-2">
                        <label htmlFor="categoryName" className="text-xs">Category name *</label><br />
                        <div ref={categoryNameInputParentElementRef} className="inputParentElement" data-after="Category name can't be empty">
                            <input
                                required
                                value={categoryName}
                                className="w-full p-2 rounded-md outline-none"
                                name="categoryName"
                                type="text"
                                onChange={(event) => setCategoryName(event?.target?.value)}
                            />

                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <div>
                            <button onClick={close} className="secondaryButton">Cancel</button>
                            <button onClick={onSubmit} className="primaryButton ml-4">Save</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AddCategoryModal