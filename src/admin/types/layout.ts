
export interface permissionProps {
    view: boolean,
    _id: string,
}

export type permissionsProps = {
    name: string,
    page: string,
    icon?: string,
    permissions: permissionProps,
    _id: string,
}

export type headerMenuProps = {
    name: string,
    link:string,
    menu: any
}

// const extendPermissionProp: permissionsProps[] = [];

export type adminUserDataProps = {
    permissions: permissionsProps[],
    email: string,
    fullname: string,
    id: string,
    phone: string,
    username: string,
}