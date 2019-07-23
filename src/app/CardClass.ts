export class Card {
    id: string;
    title: string;
    cols: number;
    rows: number;
    cardContent: string;
    isChanged: boolean;

    constructor(card: Card) {
        this.id = card.id;
        this.title = card.title;
        this.cols = card.cols;
        this.rows = card.rows;
        this.cardContent = card.cardContent;
        this.isChanged = card.isChanged;
    }
}
