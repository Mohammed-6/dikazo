
export type categoryProps = {
    _id:string,
    name:string,
    banner:string,
    icon:string,
    metaTitle:string,
    metaDescription:string,
    status:boolean
}

export const arrcategoryProps: categoryProps[] = []

export type addEditProps = {
    data: categoryProps
    closePopUp: Function
} | any