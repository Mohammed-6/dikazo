export type rowGridProps = {
    name:string;
    colid:number
    grid: [],
    rowStyle: {
        mobileGrid: number,
        tabletGrid: number,
        gapX:number,
        gapY: number,
        className: string,
        color: string,
        colorWeight: string,
        bgColor: string,
        bgColorWeight: string,
        roundedValue: string,
        fontSize: string,
        fontWeight: string,
        paddingTop: string,
        paddingBottom: string,
        paddingLeft: string,
        paddingRight: string,
        marginTop: string,
        marginBottom: string,
        marginLeft: string,
        marginRight: string,
        height: string,
        width: string,
        textTypography: string,
        borderSize:number,
        shadow: string,
    }
}

export const arrRowGridProps: rowGridProps[] = [];

export type detailProps = {
    colname: any,
    parent: any,
    edit: boolean,
    editdata: any
}

export type elementProps = {
    returnData: Function,
    colid: number|string,
    properties: any,
}

export type contentProps = {
    structureid: any,
    parent: string,
    structurename?:string,
    structure?: any
}