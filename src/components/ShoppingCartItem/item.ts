import styles from './item.css';

export enum AttributeCart {
	'image' = 'image',
	'titlee' = 'titlee',
	'price' = 'price',
}

class Cart extends HTMLElement {
	image?: string;
	titlee?: string;
	price?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeCart, null> = {
			image: null,
			titlee: null,
			price: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeCart, oldValue: string, newValue: string) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<style>
			${styles}
	  </style>
		<section class="todo">
		<h1>${this.titlee}</h1>
    <img src='${this.image}'></img>
    <p class="price"> $${this.price}</p>
		</section>
    `;
		}
	}
}

export default Cart;
customElements.define('item-cart', Cart);
