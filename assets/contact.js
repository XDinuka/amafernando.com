function handleTurnstileResponse(response, a, b, c, d) {
    console.log({response, a, b, c, d});
}


const interceptSubmit = (event) => {
    event.preventDefault();
    const url = "https://script.google.com/macros/s/AKfycbyX9Udvjig-G2a0CQRnNemyFT093gBkYkXXM2bL0nuUOKFc6EtTwl0DcaD9dTd6XLY/exec";

    const messageInput = document.querySelector('#message');
    const subjectInput = document.querySelector('#subject');
    const emailInput = document.querySelector('#email');
    const fullNameInput = document.querySelector('#full-name');

    const message = messageInput.value.trim();
    const subject = subjectInput.value.trim();
    const email = emailInput.value.trim();
    const name = fullNameInput.value.trim();

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify({
            message,
            subject,
            email,
            name,
        }),
    })
        .then(res => {
            if (!res.ok) throw new Error("Request failed");
            return res.json();
        })
        .then(data => {
            console.log("Success:", data);
        })
        .catch(err => {
            console.error("Error:", err);
        });
}


document.querySelector('#contact-form').addEventListener('submit', interceptSubmit);