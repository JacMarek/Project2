class ProductPage {

    clickAddToCartBtn() {
        cy.contains('Add to Cart').click()
    }

}

export const onProductPage = new ProductPage