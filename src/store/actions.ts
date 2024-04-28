import getFakestore from '../services/data';
import { AddProductAction, GetProductAction, ProductActions } from '../types/store';

export const getProduct = async (): Promise<GetProductAction> => {
	const product = await getFakestore();
	return {
		action: ProductActions.GET,
		payload: product,
	};
};

export const addNewProduct = (payload: any) => {
	return {
		action: ProductActions.ADD,
		payload,
	};
};

//falta el .get junto a await data
