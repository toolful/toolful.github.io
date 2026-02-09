
document.addEventListener("DOMContentLoaded", () => {

    // Tools added via JS (NON-CRITICAL for SEO)
    const dynamicTools = [
      {
            name: "Free Qr Code Generator",
            description: "Free Qr Code For business.",
            link: "qrcode.html",
            status: "Live"
        },
    const toolGrid = document.getElementById("toolGrid");

    dynamicTools.forEach(tool => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <span class="status">${tool.status}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" class="btn-link">Launch Tool</a>
        `;

        toolGrid.appendChild(card);
    });

});




