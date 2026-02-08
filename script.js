
document.addEventListener("DOMContentLoaded", () => {

    // Tools added via JS (NON-CRITICAL for SEO)
    const dynamicTools = [
        {
            name: "Code Assistant",
            description: "Mechanical coding help for students and developers.",
            link: "code.html",
            status: "Beta"
        },
        {
            name: "Invoice Generator",
            description: "Create professional invoices in seconds.",
            link: "invoice.html",
            status: "Coming Soon"
        }
    ];

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
