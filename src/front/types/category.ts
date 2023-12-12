

export type categoryProps = {
    "productInformation": {
        "name": string,
        "brand": string,
        "seller": string,
    },
    "productImages": {
        "thumbnail": string
    },
    "productVariation": {
        "colorList": [        ],
        "attributes": [],
        "variation": []
    },
    "seoMetaTags": {
        "url": string
    },
    "_id": string,
    "category": [],
    productStocks: {
        'quantity': number,
        'sellingPrice': number,
        'unitPrice': number
    },
    brd:any
}

export type filterResourceProps = {
    brand: [
        {name: string, _id: string}
    ],
    category: [{name: string, _id: string}],
    color: [{name: string, _id: string, code: string}],
    filters: {
        brand: [],
        category: [],
        color: [],
        attribute:[{name: string, value:[]}],
        totalProducts: number,
        amountSlider: {max: number, min: number}
    }
}

export const arrCategoryProps: categoryProps[] = [];

export type productListComponent = {
    alldata: categoryProps[],
    resource: filterResourceProps
    returnData?: Function
}

export type productGridProps = {
    data: categoryProps
}

export type filterComponentProps = {
    alldata: filterResourceProps,
    returnData: Function
}