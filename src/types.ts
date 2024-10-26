export interface Category {
    id: string,
    name: string
}

export interface CategoryCardInterface {
    id: string,
    name: string,
    products: {
        name: string,
        priceInr: number,
        brand: string,
        image:string
    }[]
}

export type AddProductTabState = "description" | "variable" | "combinations" | "priceInfo"

export interface Product {
    name: string,
    category: string,
    brand: string,
    image: string,
    variants: ProductVariantInterface[],
    combinations: Record<string,ProductCombinationsInterface>
    priceInr: number,
    discount: {
        method: "pct" | "flat",
        value: number
    }
}

export interface ProductDescriptionInterface{
    name: string,
    category: string,
    brand: string,
    image:string
}

export interface ProductVariantInterface{
    name: string,
    values: string[]
}

export interface ProductCombinationsInterface{
    name: string,
        sku: string,
        quantity: number|null,
        inStock: boolean
}

export interface ProductPriceInfoInterface{
    priceInr: number,
    discount: {
        method: "pct" | "flat",
        value: number
    }
}