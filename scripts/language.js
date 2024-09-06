const AVAILABLE_LANGS = ["en-US", "pl-PL"];
const DEFAULT_LANG = AVAILABLE_LANGS[0]; // english

// Language switcher
const currentLanguage = new URLSearchParams(location.search).get("lang") || 
    localStorage.getItem("lang") ||
    navigator.language ||
    DEFAULT_LANG;

const u = new URL(location)
u.searchParams.delete("lang")
history.replaceState({}, null, u)
    
const translate = async () => {
    if(!AVAILABLE_LANGS.includes(currentLanguage) || currentLanguage === DEFAULT_LANG) return;

    const translatable = document.querySelectorAll("[data-transl]")
    if(translatable.length === 0) return;
    const langResp = await fetch(`lang/${currentLanguage}.json`)
    if(!langResp.ok) return;
    const langData = await langResp.json()

    for(let el of translatable) {
        const id = el.getAttribute("data-transl")
        if(!langData[id]) continue;

        el.textContent = langData[id]
    }

    localStorage.setItem("lang", currentLanguage)
}
translate()

const appendSeparator = (element, separatorText = " | ") => {
    const sepEl = document.createTextNode(separatorText)
    element.appendChild(sepEl)
}

const prepareLanguageSwitcher = () => {
    const languageSwitcher = document.getElementById("languages")
    languageSwitcher.innerHTML = ""
    for(let i = 0; i < AVAILABLE_LANGS.length; i++) {
        const l = AVAILABLE_LANGS[i]

        const el = document.createElement("a")
        const [ language, region ] = l.split("-")
        el.textContent = `${language}${region.toLowerCase() !== language.toLowerCase() ? ` (${region})` : ""}`
        if(l !== currentLanguage) el.href = `?lang=${l}`
        languageSwitcher.appendChild(el)
        
        if(i < AVAILABLE_LANGS.length - 1) appendSeparator(languageSwitcher)
    }
}
prepareLanguageSwitcher()