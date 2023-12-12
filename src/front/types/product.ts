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
    productDescription:string,
    keyDescription:string,
    pdfSpecification:string,
    seoMetaTags:{
        url:string,
        title: string,
        description: string,
        image: string,
    },
    cod:true,
    brd:[]
}

export type productStockProps = {
    productId: string,
    variantName: string,
    sku: string,
    slug: string,
    sellerPrice: number,
    sellingPrice: number,
    mrp: number,
    gst: number,
    platformFee: number,
    logisticFee: number,
    paymentGatewayFee: number,
    quantity: number,
    finalStock: number,
    images: [],
    discount: number,
    discountType: string,
    highlight: string,
    rating: number,
    visibility: boolean,
    height: number,
    width: number,
    length: number,
    breadth: number,
    weight: number,
}

export const arrProductStockProps: productStockProps[]= []

export type productImageComponentProps = {
    bundle: any
}

export type productDetailsComponentProps = {
    bundle: any,
    stock: any,
    color: any,
    changeVariant: Function,
    loadPreloader: Function
}
export type productReviewComponentProps = {
    bundle: any,
}
export type productSimilarComponentProps = {
    bundle: any,
}

export type productAlsoLikedComponentProps = {
    bundle: any,
}

export type cartItemComponentProps = {
    data: any,
    stock: any,
    updateQty?:Function,
    total?: number,
    mrp?:number,
    deleteCart?:Function,
    appliedCoupon?:Function,
    removeCoupon?: Function,
    changeChecked?:Function,
}