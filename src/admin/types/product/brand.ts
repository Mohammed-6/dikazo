
export type brandProps = {
    _id:string,
    name:string,
    brandLogo:string,
    metaTitle:string,
    metaDescription:string,
}

export const arrbrandProps: brandProps[] = []

export type addEditProps = {
    data: brandProps
    closePopUp: Function
} | any