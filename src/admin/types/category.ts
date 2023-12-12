import { loadResourceProps } from "./product/product";

export type categoryProps = {
    _id: string;
    name: string,
    seoMetaTags: {
        url: string,
        title: string,
        description: string,
        image: string,
    },
    category: [],
}

export type componentProps = {
    resource: loadResourceProps
    alldata: categoryProps,
    returnData: Function,
}

export const arrPageCategoryProps:categoryProps[] = [];