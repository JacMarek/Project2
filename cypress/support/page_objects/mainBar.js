export class MainBar {

    mainLogoBtn = '[title="Automation Test Store"][alt="Automation Test Store"]'
    checkCartBtn = '#topnav [data-id="menu_cart"]'
    searchbar = '#filter_keyword'
    categoryMenu = '#categorymenu'
    subcategoriesMenu = '.subcategories'
    
    clickMainLogoBtn() {
        cy.get(this.mainLogoBtn).click()
    }

    checkCart() {
        cy.get(this.checkCartBtn).click()
        return cy.url().should('include', '/cart').then(() => {
            return cy.wrap(null);
        })
    }

    getApparealAndAccessoriesBtn() {
        return cy.get(this.categoryMenu).contains('Apparel & accessories')
    }

    showApparealAndAccessoriesMenu() {
        return this.getApparealAndAccessoriesBtn().parent().find(this.subcategoriesMenu).invoke('show')
    }

};

export const onMainBar = new MainBar()