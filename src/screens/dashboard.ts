import getFakestore from '../services/data';
import { AttributeProduct } from '../components/product/product';
import { AttributeCart } from '../components/ShoppingCartItem/item';
import '../components/export';
import { ApiTypeProduct } from '../types/products';
import { ApiTypeItem } from '../types/item';
import styles from './styles.css';
import { getProduct } from '../store/actions';
import { addObserver, appState, dispatch } from '../store/index';

class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		const action = await getProduct();
		dispatch(action);
		this.render();
	}

	trimDescription(description: string): string {
		const words = description.split(' ');
		const truncatedWords = words.slice(0, 24);
		return truncatedWords.join(' ');
	}

	render() {
		if (this.shadowRoot)
			this.shadowRoot.innerHTML = `
		<style>
		${styles}
	  </style>
	`;

		const section = this.ownerDocument.createElement('section');
		section.classList.add('products-container');

		const productSection = this.ownerDocument.createElement('section');
		productSection.classList.add('products');
		appState.products.forEach((home: ApiTypeProduct) => {
			const product = this.ownerDocument.createElement('product-card');
			product.setAttribute(AttributeProduct.titlee, home.title);
			product.setAttribute(AttributeProduct.image, home.image);
			const truncatedDescription = this.trimDescription(home.description);
			product.setAttribute(AttributeProduct.description, truncatedDescription);
			product.setAttribute(AttributeProduct.category, home.category);
			product.setAttribute(AttributeProduct.price, home.price);
			product.setAttribute(AttributeProduct.rating, home.rating);
			product.setAttribute(AttributeProduct.btn_add, '');
			productSection.appendChild(product);
		});
		section.appendChild(productSection);

		const cartSection = this.ownerDocument.createElement('section');
		cartSection.classList.add('cart');

		const cartTitle = this.ownerDocument.createElement('h2');
		cartTitle.textContent = 'Carrito';
		section.appendChild(cartTitle);
		cartSection.appendChild(cartTitle);

		appState.cart.forEach((cart: ApiTypeItem) => {
			console.log(cart);
			const item = this.ownerDocument.createElement('item-cart');
			item.setAttribute(AttributeCart.titlee, cart.title);
			item.setAttribute(AttributeCart.image, cart.image);
			item.setAttribute(AttributeCart.price, cart.price);
			cartSection.appendChild(item);
		});
		section.appendChild(cartSection);
		this.shadowRoot?.appendChild(section);
	}
}

customElements.define('app-dashboard', Dashboard);
