export type editProfileProps = {
    changeShowEdit?: Function;
    data: profileProps
}

export type editMobileProps = {
    changeShowEdit: Function;
}

export type profileProps = {
    _id: string,
    phone: number,
    fullname: string,
    email: string,
    gender: string,
    birthday: string,
    altphone: number,
}