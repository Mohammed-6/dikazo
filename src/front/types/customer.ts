export type SigninProps = {
    setTaoster: Function,
    showVerified: Function,
    showLoader: Function
}
export type AfterOtpProps = {
    setTaoster: Function,
    changeNumber: Function,
    showLoader: Function
}

export type addressProps = {
    _id: string,
    isDefault: boolean,
    customerId: string,
    contactDetail:{
        name: string,
        mobile: number,
    },
    addressDetail: {
        pincode: string,
        address: string,
        locality: string,
        city: string,
        state: string,
        type: string
    },
}

export const arrAddressProps:addressProps[] = []

export type sellerFeedbackProps = {
    sellerId: string,
    orderId: string,
    customerId: string,
    rating: number,
    isItemArrrived: boolean,
    itemDesctibed: boolean,
    sellerPromptService: string,
    comment: string
}

export type productFeedbackProps = {
    productId: string,
    productStockId: string,
    orderId: string,
    customerId: string,
    rating: number,
    headline: string,
    attachment: [],
    review: string,
}