
document.addEventListener("DOMContentLoaded", () => {
 
    const roles = [
        "Full Stack Developer",
        "Web Developer",
        "Java Programmer",
        "Data Analyst"
    ];

    const typing = document.querySelector(".typing");

    if (typing) {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (!deleting) {
                charIndex++;
                typing.textContent = currentRole.substring(0, charIndex);

                if (charIndex >= currentRole.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }
            } else {
                charIndex--;
                typing.textContent = currentRole.substring(0, charIndex);

                if (charIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeEffect, deleting ? 50 : 100);
        }

        typeEffect();
    }

 
    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        revealElements.forEach(element => {
            const position = element.getBoundingClientRect();

            if (position.top < window.innerHeight - 80) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

 
    const skillsSection = document.querySelector("#skills");
    const progressBars = document.querySelectorAll(".progress");

    if (skillsSection && "IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        bar.style.width = bar.dataset.width || "0%";
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(skillsSection);

    } else {
        progressBars.forEach(bar => {
            bar.style.width = bar.dataset.width || "0%";
        });
    }

 
    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


   
 
emailjs.init({
    publicKey: "vtFho1560cjfDgcTJ"
});


 
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (formStatus) {
            formStatus.textContent = "Sending message...";
        }

        emailjs.sendForm(
            "service_04lr5i3",
            "template_gckvd5p",
            this
        )
        .then(function () {
            if (formStatus) {
                formStatus.textContent = "Message sent successfully!";
            }

            contactForm.reset();
        })
        .catch(function (error) {
            console.error("EmailJS Error:", error);

            if (formStatus) {
                formStatus.textContent =
                    "Message could not be sent. Please try again.";
            }
        });
    });

}
});
