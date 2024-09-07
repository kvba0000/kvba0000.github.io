// Prevent default drag and drop
document.ondragstart = (e) => e.preventDefault();

// Smart age calculating ;)
const calculateAge = () => {
    const dobDate = new Date("05-27-2005");
    const diff_ms = Date.now() - dobDate.getTime();
    const age_dt = new Date(diff_ms);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    
    document.getElementById("age").textContent = age;
}
calculateAge();