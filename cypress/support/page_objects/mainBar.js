class MainBar {

    clickMainLogoBtn() {
        cy.get('[title="Automation Test Store"][alt="Automation Test Store"]').click()
    }

    checkCart() {
        cy.get('#main_menu_top').find('[data-id="menu_cart"]').click()
    }

    searchbar() {
        return cy.get('#filter_keyword')
    }

    apparealAndAccessoriesBtn() {
        return cy.get('#categorymenu').contains('Apparel & accessories')
    }

    apparealAndAccessoriesMenu() {
        return this.apparealAndAccessoriesBtn().parent().find('.subcategories').invoke('show')
    }

};

export const onMainBar = new MainBar()