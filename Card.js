function Card(value, suit) {
    this.value = value,
    this.suit = suit,
    this.ValueToString = function () {
        if (this.value == 1) {
            return "A";
        } else if (this.value < 11) {
            return this.value + "";
        } else if (this.value == 11) {
            return "J";
        } else if (this.value == 12) {
            return "Q";
        } else if (this.value == 13) {
            return "K";
        }
    };
    this.SuitToString = function () {
        if (this.suit == 1) {
            return "♠";
        } else if (this.suit == 2) {
            return "♥";
        } else if (this.suit == 3) {
            return "♣";
        } else if (this.suit == 4) {
            return "♦";
        }
    };
    this.CardToString = function () {
        return this.SuitToString() + " " + this.ValueToString();
    }
}
