// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// Scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = "↑";
scrollToTopButton.id = "scrollToTopBtn";
document.body.appendChild(scrollToTopButton);

// Show/Hide the button when scrolling
window.onscroll = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
};

// Scroll to top functionality
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Style the scroll to top button dynamically via JS
const style = document.createElement('style');
style.innerHTML = `
    #scrollToTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1b9b86;
        color: white;
        border: none;
        border-radius: 50%;
        padding: 15px;
        font-size: 18px;
        cursor: pointer;
        display: none;
        z-index: 1000;
    }

    #scrollToTopBtn:hover {
        background-color: #9e4733;
    }
`;
document.head.appendChild(style);
