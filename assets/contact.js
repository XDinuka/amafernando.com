let turnstileToken = null;

function handleTurnstileResponse(token) {
    turnstileToken = token;
}

function showFormMessage(type, text) {
    const el = document.getElementById('form-message');
    if (!el) return;
    el.className = `notification mt-4 ${type === 'success' ? 'is-success is-light' : 'is-danger is-light'}`;
    el.textContent = text;
    el.hidden = false;
}

const interceptSubmit = (event) => {
    event.preventDefault();

    const msgEl = document.getElementById('form-message');
    if (msgEl) msgEl.hidden = true;

    if (!turnstileToken) {
        showFormMessage('error', 'Please complete the security verification before submitting.');
        return;
    }

    const btn = document.getElementById('submit-btn');
    if (btn) { btn.classList.add('is-loading'); btn.disabled = true; }

    const url = 'https://script.google.com/macros/s/AKfycbyX9Udvjig-G2a0CQRnNemyFT093gBkYkXXM2bL0nuUOKFc6EtTwl0DcaD9dTd6XLY/exec';

    const message = document.querySelector('#message').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const email = document.querySelector('#email').value.trim();
    const name = document.querySelector('#full-name').value.trim();

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ message, subject, email, name, token: turnstileToken }),
    })
        .then(res => {
            if (!res.ok) throw new Error('Request failed');
            return res.json();
        })
        .then(() => {
            showFormMessage('success', 'Your message has been sent. I will get back to you within 48 business hours.');
            document.getElementById('contact-form').reset();
            turnstileToken = null;
            if (typeof turnstile !== 'undefined') turnstile.reset();
        })
        .catch(() => {
            showFormMessage('error', 'Something went wrong. Please try again or email me directly.');
        })
        .finally(() => {
            if (btn) { btn.classList.remove('is-loading'); btn.disabled = false; }
        });
};

document.querySelector('#contact-form').addEventListener('submit', interceptSubmit);
