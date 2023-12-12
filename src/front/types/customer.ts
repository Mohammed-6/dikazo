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