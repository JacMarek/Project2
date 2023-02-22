export class SubcategoriesPage {

    thumbnailsGrid = '[class="thumbnails grid row list-inline"]';
    productOnGrid = '[class="col-md-3 col-sm-6 col-xs-12"]';
    productNameOnGrid = '[class="prdocutname"]';
    addToCartBtnOnGrid = '[class="fa fa-cart-plus fa-fw"]'
    
    getThumbnailsGrid() {
        return cy.get(this.thumbnailsGrid)
    }

    getProductOnGrid() {
        return cy.get(this.productOnGrid) 
    }

    clickAddToCart(index) {
        cy.get(this.addToCartBtnOnGrid).eq(index).click()
    }

}

export const onSubcategoriesPage = new SubcategoriesPage