class CartPage {

    productList() {
        return cy.get('[class="container-fluid cart-info product-list"]')
    }

}

export const onCartPage = new CartPage