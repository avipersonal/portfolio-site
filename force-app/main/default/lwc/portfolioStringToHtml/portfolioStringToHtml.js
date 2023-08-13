import { LightningElement, api } from "lwc";

export default class PortfolioStringToHtml extends LightningElement {
  @api content;
  isLoaded = false;

  renderedCallback() {
    if (this.isLoaded) {
      return;
    }
    if (this.content) {
      this.isLoaded = true;
      const htmlElement = this.template.querySelector(".html-container");
      htmlElement.innerHTML = this.content;
    }
  }
}
