const SELECTABLE_TAGS = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "DETAILS"]

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

// Cursor Effect
const prepareCursor = () => {
    const cursorStyle = document.createElement("style");
    cursorStyle.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(cursorStyle);

    const cursor = document.getElementById("cursor");
    const cursorSize = cursor.getBoundingClientRect()
    const gridSize = {
        x: cursorSize.width,
        y: cursorSize.height
    }
    const cursorPosition = {
        x: 0,
        y: 0
    }

    const updateCursor = () => {
        const x = Math.floor((cursorPosition.x + scrollX) / gridSize.x) * gridSize.x;
        const y = Math.floor((cursorPosition.y + scrollY) / gridSize.y) * gridSize.y;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";

        const hoveringTags = document.elementsFromPoint(cursorPosition.x, cursorPosition.y).map(el => el.tagName)

        if(
            SELECTABLE_TAGS.some(tag => hoveringTags.includes(tag))
        ) cursor.classList.add("hover");
        else cursor.classList.remove("hover");
    }

    document.addEventListener("mousemove", (e) => {
        cursorPosition.x = e.clientX;
        cursorPosition.y = e.clientY;
        updateCursor();
    })
    document.addEventListener("scroll", updateCursor)
    window.addEventListener("resize", updateCursor)

    window.addEventListener("mouseover", () => cursor.classList.remove("out"))
    window.addEventListener("mouseout", () => cursor.classList.add("out"))
        
}
prepareCursor()