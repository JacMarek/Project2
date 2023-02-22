import { MainBar } from "./mainBar"
import { ProductPage } from "./productPage"

class HomePage {
    
    // to jest inna metoda dziedziczenia klas, kiedy potrzeba aby dziedziczyć więcej niż 1 klasę, inaczej się więc wywołuje metody
    constructor() {
      this.MainBar = new MainBar();
      this.ProductPage = new ProductPage();
    }

    addItemToCart(index) {
        cy.get('.fa-cart-plus').eq(index).click()
        this.addItemFromProductPage()
        this.MainBar.clickMainLogoBtn()
    }

    addItemFromProductPage() {
        cy.url().then(url => {
            if(url !== Cypress.config('baseUrl')) {
                this.ProductPage.clickAddToCartBtn()
                }
        })
    }

}

export const onHomePage = new HomePage