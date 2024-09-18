// Prevent default drag and drop
document.ondragstart = (e) => e.preventDefault();

// Smart age calculating ;)
const calculateAge = () => {
    const dob = 1117144800000; // 27.05.2005
    const curr = Date.now();

    const age = Math.floor((curr - dob) / 31536000000); // 31536000000 = 1000 * 60 * 60 * 24 * 365
    
    if(age <= 0 || isNaN(age)) return;
    document.getElementById("age").textContent = age;
}
calculateAge();