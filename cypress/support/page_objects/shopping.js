import { MainBar } from "./mainBar";
import { SubcategoriesPage } from "./subcategories";
import { ProductPage } from "./productPage";

class Shopping {

    constructor() {
        this.MainBar = new MainBar();
        this.SubcategoriesPage = new SubcategoriesPage();
        this.ProductPage = new ProductPage();
      } 
    
    tshirtThumbnail = '.thumbnail > a > [alt="blue cotton t-shirt"]'


    goToTshirtsPage() {
        this.MainBar.showApparealAndAccessoriesMenu().contains('T-shirts').click()
    }

    goToShoesPage() {
        this.MainBar.showApparealAndAccessoriesMenu().contains('Shoes').click()
    }

    findParfume() {
        cy.get(this.MainBar.searchbar).type('Armani{enter}')
    }
    
    getTshirt() {
        return cy.get(this.tshirtThumbnail).parents(this.SubcategoriesPage.productOnGrid)
    }

    getSandals() {
        return cy.get(this.SubcategoriesPage.productOnGrid).contains('Sandals')
    }

    getParfume(index) {
        return cy.get(this.SubcategoriesPage.addToCartBtnOnGrid).eq(index).parents(this.SubcategoriesPage.productOnGrid)
    }

    getTshirtName() {
        return this.getTshirt().find(this.SubcategoriesPage.productNameOnGrid).then(tshirtName => {
            // cy.log(tshirtName) - tu jest zwracana wartość synchroniczna więc asynchroniczne cy.log() psuje test
            return tshirtName.text();
          });
    }

    getSandalsName() {
        return this.getSandals().then(tshirtName => {
            return tshirtName.text()
          })
    }

    getParfumeName(index) {
        return this.getParfume(index).find(this.SubcategoriesPage.productNameOnGrid).then(parfumeName => {
            return parfumeName.text()
          })
    }

    addTshirtToCart() {           
        this.getTshirt().then( itemToBuy => {
            cy.wrap(itemToBuy).find(this.SubcategoriesPage.addToCartBtnOnGrid).click()
            this.ProductPage.clickAddToCartBtn()
         })
    }

    addSandalsToCart() {
        this.getSandals().click()
        this.ProductPage.clickAddToCartBtn()
        cy.get(this.ProductPage.alertMsg).should('contain', 'Please select all required options!')
        this.ProductPage.chooseSize(0)
        this.ProductPage.clickAddToCartBtn()
    }

    addParfumeToCart(index) {
        this.SubcategoriesPage.clickAddToCart(index)
    }
}

export const onShopping = new Shopping