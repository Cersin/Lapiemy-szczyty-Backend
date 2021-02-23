class APIFeatures {
    constructor(articles, query) {
        this.articles = articles;
        this.query = query;
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
}

module.exports = APIFeatures;
