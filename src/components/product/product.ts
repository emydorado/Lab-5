import { dispatch } from '../../store/index';
import styles from './product.css';
import { addNewProduct } from '../../store/actions';

export enum AttributeProduct {
	'image' = 'image',
	'titlee' = 'titlee',
	'description' = 'description',
	'category' = 'category',
	'price' = 'price',
	'rating' = 'rating',
	'btn_add' = 'btn_add',
}

class Product extends HTMLElement {
	image?: string;
	titlee?: string;
	description?: string;
	category?: string;
	price?: string;
	rating?: string;
	btn_add?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeProduct, null> = {
			image: null,
			titlee: null,
			description: null,
			category: null,
			price: null,
			rating: null,
			btn_add: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeProduct, oldValue: string, newValue: string) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();

		const button = this.shadowRoot?.querySelector('button');
		button?.addEventListener('click', () => {
			dispatch(addNewProduct({ title: this.titlee, price: this.price, image: this.image }));
		});
	}

	render() {
		if (this.shadowRoot) {
			const svgIcon = `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
					<circle cx="10.5" cy="19.5" r="1.5"></circle>
					<circle cx="17.5" cy="19.5" r="1.5"></circle>
					<path d="M21 7H7.334L6.18 4.23A1.995 1.995 0 0 0 4.333 3H2v2h2.334l4.743 11.385c.155.372.52.615.923.615h8c.417 0 .79-.259.937-.648l3-8A1.003 1.003 0 0 0 21 7zm-4 6h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z"></path>
			</svg>
	`;

			const svgStar = `
			<svg xmlns="http://www.w3.org/2000/svg" height="20" width="21.5" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0c4896" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        `;

			this.shadowRoot.innerHTML = `
		<style>
			${styles}
	  </style>
		<section class="todo">
		<h1>${this.titlee}</h1>
    <section class="card">
    <img src='${this.image}'></img>

		<section class= "info">
    <p> ${this.description}</p>

    <p class="price">$${this.price}</p>
		<b class="category">Category</b>
		<p class ="categoryy">${this.category}</p>
		<p>${svgStar} ${svgStar} ${svgStar} ${svgStar} ${svgStar}</p>
		<button>${svgIcon}</button>
		</section>
		</section>
		</section>
    `;
		}
	}
}

export default Product;
customElements.define('product-card', Product);
