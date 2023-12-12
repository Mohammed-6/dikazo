export type couponProps = {
    _id: string,
    code: string,
    discount: number,
    discountType: string,
    minPurchase: number,
    validFrom: Date,
    validUntil: Date,
}

export const arrcouponProps: couponProps[] = []

export type addEditProps = {
    data: couponProps
    closePopUp: Function
} | any