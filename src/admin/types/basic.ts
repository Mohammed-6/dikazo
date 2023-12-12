

export type toaster = {
    type: string;
    message: string;
}

export type deleteProps = {
    heading: string,
    paragraph: string,
    type: string,
    successButtonText: string,
    successAction: Function,
    cancelAction: Function,
}

export type attachmentProps = {
    destination: string,
    encoding: string,
    fieldname: string,
    filename: string,
    mimetype: string,
    originalname: string,
    path: string,
    size: number,
}