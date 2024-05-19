export type menuProps = {
    _id: string,
    parent: string,
    name: string,
    link: string,
}

export const arrmenuProps: menuProps[] = []

export type addEditProps = {
    data: menuProps
    closePopUp: Function
} | any