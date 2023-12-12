
export type attributeProps = {
    _id:string,
    name:string,
    attributeValue:[] | any,
}

export const arrattributeProps: attributeProps[] = []

export type addEditProps = {
    data: attributeProps
    closePopUp: Function
} | any