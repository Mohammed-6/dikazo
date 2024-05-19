export type sellerProps = {
    _id: string,
    personalInfomration: {
        name: string,
        email:string,
        panNo:string,
        gender:string,
        dob:string,
        state:string,
        city:string,
        personalAddress:string,
    },
    bankAccountInformation: {
        bankName: string,
        accountNumber:string,
        accountName:string,
        ifscCode:string,
    },
    shopInformation: {
        shopName: string,
        shopAddress:string,
        shopPhone:string,
        gst: string,
        trademark:string,
    },
    socialInformation: {
        instagram:string,
        google:string,
        facebook:string,
        twitter:string,
        youtube:string,
    }
}


export const arrsellerProps: sellerProps[] = []

export type addEditProps = {
    data: sellerProps
    closePopUp: Function
} | any