class ShoesPage {

    thumbnailsGrid() {
        return cy.get('[class="thumbnails grid row list-inline"]')
    }

}

export const onShoesPage = new ShoesPage