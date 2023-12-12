export type indexProp = {
    children: React.ReactNode
}

const menuProp = {
    menuName: String,
    slug: String
}

// export const menuProps:menuProp[] = []


export type headerProp = {
    menuName: string; slug: string 
};

export type subHeaderProp = {
    menuName: string; slug: string,
    menu: headerProp[]
}