import { sellerProps } from "../seller/seller"
import { attributeProps } from "./attribute"
import { brandProps } from "./brand"
import { categoryProps } from "./category"
import { colorProps } from "./color"

export type loadResourceProps = {
    attribute: attributeProps[],
    color: colorProps[],
    category: categoryProps[],
    brand: brandProps[],
    seller: sellerProps[]
}

export type componentProps = {
    stockData?:any,
    resource: loadResourceProps
    alldata: productProps,
    returnData: Function,
    variationReturn?: Function
}

export type productVariant = {
    variantName: string,
    variantPrice: number,
    variantQuantity: number,
    variantImage: []
}

export type productProps = {
    _id: string,
    productInformation:{
        name: string,
        brand: string,
        seller: string,
        unit: string,
        packOf: string,
        weight: string,
        minPurchaseQty: string,
        tags: [],
        barcode:string,
        refundable:false,
        height:number,
        widht:number,
        length:number,
        breadth:number,
    },
    productImages:{
        images: [],
        thumbnail: string,
    },
    productVideos:{
        videoProvider: string,
        videoLink:string,
    },
    productVariation:{
        isColor: boolean,
        colorList:[],
        attributes: [],
        variation:[],
        convertVarient: []
    },
    productStocks:{
        _id?: "",
        unitPrice: number, // mrp
        sellingPrice: number,
        sellerPrice: number,
        discountFrom: string,
        sku:string,
        hsn:number,
        quantity: number,
        discountTo: string,
        discount:number,
        discountType: string
        setPoint:number
        externalLink: string,
        externalLinkText:string,
    },
    addtionalIformation:addtionalProps|any,
    productDescription:string,
    aboutItem:[],
    keyDescription:string,
    pdfSpecification:string,
    seoMetaTags:{
        url:string,
        title: string,
        description: string,
        keyword: string,
        image: string,
    },
    category:[],
    shippingConfig:{
        freeShipping: false,
        flatRate: false,
        shippingCost: number
        isProductQtyMultiple: false
    },
    lowStockQuantityWarning:1,
    stockVisibilityState:{
        showStockQuantity: false,
        showStockWithTextOnly: false,
        hideStock:false
    },
    cod:true,
    featured:false,
    todaysDeal:false,
    publishedStatus:boolean,
    addedBy: string,
    approvedStatus:boolean,
    estimatedShippingTime:2,
    feeAndCharges:{
        platFormFee: number
        paymentGatewayFee:number
        gst:number
    },
    productStock?: []
}

export type filterProps = {
    seller:string,
    sort:string,
    search:string,
    category:string,
    brand:string,
}

export type individualVariantProps = {
    data: any
    index:number
    alldata:any
    returnData: Function
    proposeVariant:Function
}

export const arrProductProps:productProps[] = []

export type customTagsProps = {
    returnData: Function
}

export type singleVariantProps = {
    variantValues: []
    variant: [],
}

export type multiVariantProps = {
    variant: string,
    variantValues: []
}[]
export const variantProps:singleVariantProps[] = []

export type variantValuesProps = {
    name: string,
    variantProps: any
}

export type variationRowProp =  {
    alldata: any,
    parentKey: number|string,
    childKey: number|string
}

export type exportImportPorps = {
    alldata: loadResourceProps
    returnData: Function
}
export type addtionalSProps = {
    name: string,
    information: [{name: string, description: string}]
}
export type addtionalProps = [addtionalSProps]