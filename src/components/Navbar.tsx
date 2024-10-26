const Navbar=({
    openAddCategoryModal,
    openAddProductModal
}:{
    openAddCategoryModal:()=>void
    openAddProductModal:()=>void
})=>{

    return(
        <div className="flex justify-between items-center">
            <div className="font-semibold text-2xl">
            Products
            </div>
            <div >
                <button onClick={openAddCategoryModal} className="secondaryButton">Add Category</button>
                <button onClick={openAddProductModal} className="primaryButton ml-4">Add Product</button>
            </div>
        </div>
    )
}

export default Navbar