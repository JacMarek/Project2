class T_shirtsPage {

    thumbnailsGrid() {
        return cy.get('[class="thumbnails grid row list-inline"]')
    }

}

export const onTshirtsPage = new T_shirtsPage