import { serverHeader, serverURL } from "../../data/stuff";
import {attributeProps} from '../../types/product/attribute'
import axios from "axios";
import { filterProps, productProps } from "../../types/product/product";
const create = axios.create();

export async function listProductResource(){
    const res = await create.post(serverURL + '/add-edit-product');
    return res
}

export async function listProduct(){
    const res = await create.post(serverURL + '/list-product');
    return res
}

export async function createProduct(data:productProps){
    const res = await create.post(serverURL + '/add-product', data);
    return res
}

export async function deleteProduct(id:string){
    const res = await create.post(serverURL + '/delete-product', {productId: id});
    return res
}

export async function editProduct(id:string){
    const res = await create.post(serverURL + '/edit-product', {productId: id});
    return res
}

export async function updateProduct(data:productProps){
    const res = await create.post(serverURL + '/update-product', data);
    return res
}

export async function filterProduct(data:filterProps){
    const res = await create.post(serverURL + '/filter-product', data);
    return res
}

export async function updateVariation(data:any, productId:string){
    const res = await create.post(serverURL + '/update-variation/'+productId, data);
    return res
}

export async function exportProduct(data:filterProps){
    const res = await create.post(serverURL + '/export-product', data);
    return res
}

export async function importProduct(data:any){
    const res = await create.post(serverURL + '/import-product', data);
    return res
}