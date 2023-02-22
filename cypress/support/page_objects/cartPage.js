class CartPage {

    cartTotal = '[class="dropdown hover"] .cart_total'
    productList = '[class="container-fluid cart-info product-list"]'
    quantity = 'td > div > input'
    updateBtn = '#cart_update'

    
    country = '#estimate_country'
    state = '#estimate_country_zones'
    zip = '#estimate_postcode'
    estimate = '.input-group.col-sm-8 > .input-group-btn > .btn.btn-default' // znak ">" może wskazać tylko bezpośredniego potomka ale można podać więcej niż jeden element nadrzędny. Jeśli są 2 klasy to trzeba wskazać obie oddzielone "."
    shipments = '#shippings'

    clickUpdate() {
        cy.get(this.updateBtn).click()
    }
    
    getAllItemsOnProductList() {
        return cy.get(this.productList).find('tr:not(:contains("Unit Price"))')
    }
    
    getOneItemOnProductList(index) {
        return cy.get(this.productList).find('tr:not(:contains("Unit Price"))').eq(index)
    }
    
    getCartTotal() {
        return cy.get(this.cartTotal).invoke('text').then( cartPrice => {
            const numericPrice = parseFloat(cartPrice.replace('$', ''))
            return numericPrice
        })
    }
    
    getUnitPrice(index) {
        return this.getOneItemOnProductList(index)
            .find('td')
            .eq(3)
            .invoke('text')
            .then( itemPrice => {
                const numericPrice = parseFloat(itemPrice.replace('$', ''))
                return numericPrice
            })
    }
    
    getItemQuantity(index) {
        return this.getOneItemOnProductList(index)
            .find(this.quantity)
            .invoke('val')
            .then( quantity => {
                const numericQuantity = parseFloat(quantity)
                return numericQuantity
        })
    }

    getTotalForItem(index) {
        return this.getOneItemOnProductList(index)
            .find('td')
            .eq(5)
            .invoke('text')
            .then( totalItemPrice => {
                let numericTotalItemPrice = parseFloat(totalItemPrice.replace('$', ''))
                return numericTotalItemPrice
        })
    }

    typeNewQuantity(index, value) {
        this.getOneItemOnProductList(index).find(this.quantity).clear().type(value).then( () => {
            this.clickUpdate()
            onCartPage.checkTotalForItem(0)
            onCartPage.checkTotalForCart()
        })
    }

    calculateTotalForCart() {
        let index = 0
        let totalPricesForAllItems = []
        let calculatedTotalForCart = 0

        return this.getAllItemsOnProductList().each( () => {
            
            this.getTotalForItem(index).then( totalItemPrice => {
                const totalForItem = totalItemPrice
                totalPricesForAllItems.push(totalForItem)
            })                 
            index++
        }).then( () =>{

            totalPricesForAllItems.forEach( price => {
                calculatedTotalForCart += price
            })

            return calculatedTotalForCart
        })
    }

    calculateTotalForItem(price, quantity) {
        return price*quantity
    }

    checkTotalForCart() {
        
        let visibleValue
        let calculatedValue
        
        this.getCartTotal().then( val1 => {
            visibleValue = val1
            cy.log(visibleValue)

        }).then( () => {
                
            this.calculateTotalForCart().then( val2 => {
                calculatedValue = val2
                cy.log(calculatedValue)

            }).then( () => {
                    
                cy.wrap(visibleValue).should('equal', calculatedValue)
            })  
        })
    }

    checkTotalForItem(index) {
        
        let itemPrice
        let itemQuantity
        let totalForItem
        
        // poniżej kolejkowanie asynchronicznych funkcji w celu przypisania zmiennych przed wykoaniem testu 
        this.getUnitPrice(index).then( unitPrice => {
            
            itemPrice = unitPrice
            cy.log(typeof itemPrice, itemPrice)
            cy.log(typeof unitPrice, unitPrice)
        }).then( () => {
            
            this.getItemQuantity(index).then( quantity => {
                itemQuantity = quantity
                cy.log(typeof itemQuantity, itemQuantity)
                cy.log(typeof quantity, quantity)
            })
       
            this.getTotalForItem(index).then( totalItemPrice => {
                totalForItem = totalItemPrice
                cy.log(typeof totalForItem, totalForItem)
                cy.log(typeof totalItemPrice, totalItemPrice)
            })
        }).then( () => {
            
            cy.log(typeof itemPrice, itemPrice)
            cy.log(typeof itemQuantity, itemQuantity)
            cy.log(typeof totalForItem, totalForItem)
            cy.log(this.calculateTotalForItem(itemPrice, itemQuantity))
            
            cy.wrap(this.calculateTotalForItem(itemPrice, itemQuantity)).should('equal', totalForItem)
        })
    }
}

export const onCartPage = new CartPage