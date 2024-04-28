import './screens/dashboard';
import './components/export';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		this.render();
	}

	render() {
		const item = this.ownerDocument.createElement('app-dashboard');
		this.shadowRoot?.appendChild(item);
	}
}

customElements.define('app-container', AppContainer);
