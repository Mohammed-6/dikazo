
export type categoryProps = {
    _id:string,
    name:string,
    banner:string,
    icon:string,
    metaTitle:string,
    metaDescription:string,
    status:boolean
}
export type listCategoryProps = {
    _id:string,
    name:string,
    banner:{path: string, _id:string},
    icon:{path:string, _id:string},
    metaTitle:string,
    metaDescription:string,
    status:boolean
}

export const arrcategoryProps: listCategoryProps[] = []

export type addEditProps = {
    data: categoryProps
    closePopUp: Function
} | any