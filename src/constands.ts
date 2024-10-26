import { Category, Product } from "./types";

export const INITIAL_CATEGORIES: Category[] = [
    {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: "Shoes"
    },
    {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        name: "T-shirt"
    }
]


export const PRODUCT_INITIAL_STATE: Product = {
    name: "",
    category: "",
    brand: "",
    image: "",
    variants: [],
    combinations: {},
    priceInr: 0,
    discount: {
        method: "pct",
        value: 0
    }
}


export const ALPHABET_LIST = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az"]


export const INITIAL_PRODUCTS: Product[] = [
    {
        name: "Nike Air Jordan",
        category: "Shoes",
        brand: "Nike",
        image: "/product1.png",
        variants: [
            {
                "name": "Color",
                "values": [
                    "Red",
                    "Green",
                    "Blue"
                ]
            },
            {
                "name": "Size",
                "values": [
                    "L",
                    "M",
                    "S"
                ]
            }
        ],
        "combinations": {
            a: {
                inStock: false,
                name: "Red/L",
                quantity: null,
                sku: "HGFH"
            },
            b: {
                inStock: true,
                name: "Red/M",
                quantity: 3,
                sku: "HGFJH"
            },
            c: {
                inStock: false,
                name: "Red/S",
                quantity: null,
                sku: "JHKJH"
            },
            d: {
                inStock: true,
                name: "Green/L",
                quantity: 1,
                sku: "DFGFH"
            },
            e: {
                inStock: false,
                name: "Green/M",
                quantity: null,
                sku: "JGHJ"
            },
            f: {
                inStock: true,
                name: "Green/S",
                quantity: 2,
                sku: "KJHKH"
            },
            g: {
                inStock: false,
                name: "Blue/L",
                quantity: null,
                sku: "JGHJF"
            },
            h: {
                inStock: true,
                name: "Blue/M",
                quantity: 2,
                sku: "FGHFHJ"
            },
            i: {
                inStock: false,
                name: "Blue/S",
                quantity: null,
                sku: "JGHJGH"
            }
        },
        priceInr: 12000,
        discount: {
            method: "pct",
            value: 0
        }
    }
]

