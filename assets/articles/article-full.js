class ArticleFull extends HTMLElement {
    constructor() {
        super();

        // Attach a shadow DOM to the custom element
        const shadow = this.attachShadow({ mode: 'open' });

        // Append the template content to the shadow DOM
        const template = document.getElementById('article-full-template').content.cloneNode(true);
        shadow.appendChild(template);

        // References to the shadow DOM elements
        this.titleElement = shadow.querySelector('.article-title i');
        this.titleSpanElement = shadow.querySelector('.article-title span');
        this.dateElement = shadow.querySelector('.article-date');
        this.textElement = shadow.querySelector('.article-introduction');
        this.textText = shadow.querySelector('.article-text');
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
        this.titleSpanElement.textContent = article.articleId;
        this.dateElement.textContent = `Date: ${article.date}`;
        this.textElement.textContent = article.introduction;
        this.textText.innerHTML = article.text;
    }
}

// Define the custom element
customElements.define('article-full', ArticleFull);
