
export type colorProps = {
    _id:string,
    name:string,
    code:string,
}

export const arrcolorProps: colorProps[] = []

export type addEditProps = {
    data: colorProps
    closePopUp: Function
} | any