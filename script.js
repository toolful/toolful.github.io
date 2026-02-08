document.getElementById('toolForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const desc = document.getElementById('toolDesc').value;

    // Simulate sending data
    console.log("Request from:", name, "Description:", desc);
    
    // Human-friendly feedback
    alert(`Thank you, ${name}! Your request for "${desc}" has been sent to the machine.`);
    
    this.reset();
});

// Mechanical scroll effect for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
