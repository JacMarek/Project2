/// <reference types="cypress" />
import { onMainBar } from "../support/page_objects/mainBar"
import { onTshirtsPage } from "../support/page_objects/t-shirtsPage"
import { onShoesPage } from "../support/page_objects/shoesPage"
import { onSearchResultsPage } from "../support/page_objects/searchResults"
import { onCartPage } from "../support/page_objects/cartPage"
import { onProductPage } from "../support/page_objects/productPage"

describe("Buy t-shirt, shoes and perfume", () => {

    it("Add t-shirt and shoes to the cart", () => {
        cy.openHomePage()

        let tshirtItem
        let shoesItem
        let parfumeItem

        onMainBar.apparealAndAccessoriesMenu().contains('T-shirt').click()
        onTshirtsPage.thumbnailsGrid()
            .contains('[class="col-md-3 col-sm-6 col-xs-12"]','Casual 3/4 Sleeve Baseball T-Shirt')
            .then( itemToBuy => {
                tshirtItem = itemToBuy.find('.prdocutname').text()
                cy.wrap(itemToBuy).find('.fa-cart-plus').click()
            })
        onProductPage.clickAddToCartBtn()

        onMainBar.clickMainLogoBtn()
        onMainBar.apparealAndAccessoriesMenu().contains('Shoes').click()
        onShoesPage.thumbnailsGrid().contains('Sandals').then( itemToBuy => {
            shoesItem = itemToBuy.text()
            cy.wrap(itemToBuy).click()
        })
        onProductPage.clickAddToCartBtn()
        cy.get('#maincontainer').should('contain', 'Please select all required options!')
        cy.get('#product').find('[type="radio"]').first().click()
        onProductPage.clickAddToCartBtn()


        onMainBar.searchbar().type('Armani{enter}')
        onSearchResultsPage.thumbnailsGrid().find('.fa-cart-plus').eq(1).then(itemToBuy => {
            cy.wrap(itemToBuy)
                .parentsUntil('[class="col-md-3 col-sm-6 col-xs-12"]')
                .parent()
                .find('.prdocutname')
                .then(name => {
                    parfumeItem = name.text()
                    cy.wrap(itemToBuy).click()
                })  
        })

        onMainBar.checkCart()
        onCartPage.productList().then( itemsInCart => {
            cy.wrap([tshirtItem, shoesItem, parfumeItem]).each(item => {
                cy.wrap(itemsInCart).should('contain', item)
            })
        })    
    })
})



