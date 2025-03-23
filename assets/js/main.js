document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".item");
    const modalContainer = document.getElementById("modal-container");
    const modalIframe = document.getElementById("modal-iframe");
    const spinner = document.getElementById("spinner");
    const modalStylesheetId = "modal-styles";
    
    const leftSlidebar = document.querySelector(".left-slidebar");
    const rightSlidebar = document.querySelector(".right-slidebar");

    function loadModalStyles() {
        let existingLink = document.getElementById(modalStylesheetId);
        if (!existingLink) {
            const link = document.createElement("link");
            link.id = modalStylesheetId;
            link.rel = "stylesheet";
            link.href = "assets/css/styles.css";
            document.head.appendChild(link);
        }
    }

    function removeModalStyles() {
        let existingLink = document.getElementById(modalStylesheetId);
        if (existingLink) {
            document.head.removeChild(existingLink);
        }
    }

    function openModal(url) {
        spinner.style.display = 'block';
        loadModalStyles();

        // Ocultar las barras laterales cuando se abre un modal
        if (leftSlidebar) leftSlidebar.style.display = "none";
        if (rightSlidebar) rightSlidebar.style.display = "none";

        setTimeout(function () {
            modalIframe.src = url;
            modalContainer.classList.add("show");
        }, 2000);
    }

    function closeModal() {
        modalContainer.classList.remove("show");
        modalIframe.src = '';

        // Volver a mostrar las barras laterales al cerrar el modal
        if (leftSlidebar) leftSlidebar.style.display = "block";
        if (rightSlidebar) rightSlidebar.style.display = "block";

        removeModalStyles();
    }

    modalContainer.addEventListener("click", function (e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    items.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const modalUrl = this.getAttribute("data-modal");
            openModal(modalUrl);
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modalContainer.classList.contains("show")) {
            closeModal();
        }
    });

    modalIframe.addEventListener("load", function () {
        spinner.style.display = 'none';
    });







    function startScrolling(slidebar) {
        const slides = slidebar.querySelectorAll('.slide');
        let currentScroll = 0;

        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            slidebar.appendChild(clone);
        });

        setInterval(() => {
            currentScroll += 1;
            slidebar.scrollTop = currentScroll;

            if (currentScroll >= slidebar.scrollHeight / 2) {
                currentScroll = 0;
                slidebar.scrollTop = 0;
            }
        }, 20);
    }

    if (leftSlidebar) startScrolling(leftSlidebar);
    if (rightSlidebar) startScrolling(rightSlidebar);
});
