import { customElement, html, LitElement } from "@polymer/lit-element";

@customElement("my-app")
export class MyApp extends LitElement {
	render() {
		return html`
			<p>Polymer3 Typescript Webpack</p>
		`;
	}
}
