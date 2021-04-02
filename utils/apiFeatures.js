class APIFeatures {
    constructor(articles, query) {
        this.articles = articles;
        this.query = query
    }

    pagination() {
        if (this.query.skip) {
            this.articles = this.articles.skip(+this.query.skip).limit(+this.query.limit);
        }
        return this;
    }

    category() {
        if (this.query.category) {
            this.articles = this.articles.where('category').equals(this.query.category);
        }
        return this;
    }

    distance() {
        if (this.query.distance) {
            this.articles = this.articles.where('distance').equals(this.query.distance);
        }
        return this;
    }

    country() {
        if (this.query.country) {
            if (this.query.country === 'Polska') {
                this.articles = this.articles.where('country').equals(this.query.country);
            } else {
                this.articles = this.articles.where('country').nin("Polska");
            }
        }
        return this;
    }
}

module.exports = APIFeatures;
