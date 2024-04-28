import { ApiTypeProduct } from './products';
import { ApiTypeItem } from './item';

export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	products: ApiTypeProduct[];
	cart: ApiTypeItem[];
};

export enum ProductActions {
	'ADD' = 'ADD',
	'GET' = 'GET',
}

export interface AddProductAction {
	action: ProductActions.ADD;
	payload: ApiTypeItem;
}

export interface GetProductAction {
	action: ProductActions.GET;
	payload: ApiTypeProduct[];
}

export type Actions = AddProductAction | GetProductAction;
