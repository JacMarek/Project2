class SearchResultsPage {

    thumbnailsGrid() {
        return cy.get('[class="thumbnails grid row list-inline"]')
    }

}

export const onSearchResultsPage = new SearchResultsPage