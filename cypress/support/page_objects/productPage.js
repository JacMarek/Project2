export class ProductPage {

    addToCartBtn = '.productpagecart'
    alertMsg = '[class="alert alert-error alert-danger"]'
    productOptions = '#product'
    size = '[type="radio"]'
    
    clickAddToCartBtn() {
        cy.get(this.addToCartBtn).click()
    }

    chooseSize(index) {
        cy.get(`${this.productOptions} ${this.size}`).eq(index).click()
    }

}

export const onProductPage = new ProductPage