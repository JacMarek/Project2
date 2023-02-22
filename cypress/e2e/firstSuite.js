/// <reference types="cypress" />
import { onMainBar } from "../support/page_objects/mainBar"
import { onCartPage } from "../support/page_objects/cartPage"
import { onHomePage } from "../support/page_objects/homePage"
import { onShopping } from "../support/page_objects/shopping"

describe("Automation test store", () => {
    beforeEach(() => {
        cy.openHomePage()
    })

    it("Add t-shirt, shoes and parfume to the cart", () => {

        let tshirtItem
        let shoesItem
        let parfumeItem

        onShopping.goToTshirtsPage()
        onShopping.getTshirtName().then(tshirtName => {
            tshirtItem = tshirtName
        })
        onShopping.addTshirtToCart()
        onMainBar.clickMainLogoBtn()

        onShopping.goToShoesPage()
        onShopping.getSandalsName().then(sandalsName => {
            shoesItem = sandalsName
        })
        onShopping.addSandalsToCart()
        onMainBar.clickMainLogoBtn()

        onShopping.findParfume()
        onShopping.getParfume(1)
        onShopping.getParfumeName(1).then(parfumeName => {
            parfumeItem = parfumeName
        })
        onShopping.addParfumeToCart(1)

        onMainBar.checkCart()
        cy.get(onCartPage.productList).then( itemsInCart => {
            cy.wrap([tshirtItem, shoesItem, parfumeItem]).each(item => {
                cy.wrap(itemsInCart).should('contain', item)
            })
        })    
    })

    it("Check shipping form", () => {

        onHomePage.addItemToCart(0)
        onMainBar.checkCart()
        
        cy.get(onCartPage.country).select('United States')
        cy.get(onCartPage.state).should('contain', 'Oregon').and('contain', 'California')
        
        cy.get(onCartPage.country).select('Poland')
        cy.get(onCartPage.state).should('contain', 'Mazowieckie').and('contain', 'Wielkopolskie')
        cy.get(onCartPage.state).find('option:not(:contains("Please Select"))').should('have.length', 16)
        
        cy.get(onCartPage.zip).type('12-345')
        cy.get(onCartPage.estimate).click()
        cy.get(onCartPage.zip).should('have.value', '12-345')
        cy.get(onCartPage.shipments).should('contain', "$2.00")
    })

    it.only("Check total for item", () => {

        onHomePage.addItemToCart(0)
        onHomePage.addItemToCart(1)
        onHomePage.addItemToCart(2)
        
        onMainBar.checkCart().then( () => {
           
            onCartPage.checkTotalForItem(1)
            onCartPage.checkTotalForCart()
            onCartPage.typeNewQuantity(2, 13)
        })
    })
})
