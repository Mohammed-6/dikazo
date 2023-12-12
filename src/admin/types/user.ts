
export type userTypeProps = {
    userType: string;
    _id: string;
    __v: number
}

type userProps = {
    _id: string;
    email: string;
    fullname: string;
    phone: string;
    userType: string;
}

export const arrUserProps: userProps[] = [];

export const arrUsertypeProps: userTypeProps[] = [];

export type userTypeListProps = {
    data: userTypeProps[];
    type:string;
    message:string;
}

export type addUserTypeProps = {
    closeAction: Function,
    submitAction: Function,
}

export type loadUserTypeProps = {
    usertype: userTypeProps[];
}

export type addUserProps = {
    fullname: string;
    loginUsername: string;
    loginPassword: string;
    email: string;
    phone: string;
    userType: string;
}