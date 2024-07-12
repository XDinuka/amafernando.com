class ArticleTile extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM to the custom element
        const shadow = this.attachShadow({ mode: 'open' });

        // Append the template content to the shadow DOM
        const template = document.getElementById('article-tile-template').content.cloneNode(true);
        shadow.appendChild(template);

        // References to the shadow DOM elements
        this.titleElement = shadow.querySelector('.article-title');
        this.dateElement = shadow.querySelector('.article-date');
        this.textElement = shadow.querySelector('.article-introduction');
        this.readModeButton = shadow.querySelector('.article-read-more');
    }

    // Observed attributes
    static get observedAttributes() {
        return ['data-article'];
    }

    // Callback when attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-article') {
            const article = JSON.parse(newValue);
            this.updateArticle(article);
        }
    }

    // Update the article content
    updateArticle(article) {
        this.titleElement.textContent = article.title;
        this.dateElement.textContent = `Date: ${article.date}`;
        this.textElement.textContent = article.introduction;
        this.readModeButton.href = "./articles.html?articleId="+article.articleId;
    }
}

// Define the custom element
customElements.define('article-tile', ArticleTile);
