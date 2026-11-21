(function () {
    // 1. Přepínač tmavého a světlého režimu (localStorage)
    const STORAGE_KEY = "ds_theme_mode";
    const rootEl = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle-btn");
    const modeInfo = document.getElementById("current-mode-info");

    function applyTheme(mode) {
        const normalized = mode === "dark" ? "dark" : "light";
        rootEl.setAttribute("data-theme", normalized);

        if (toggleBtn) {
            toggleBtn.textContent = normalized === "dark"
                ? "Přepnout světlý režim"
                : "Přepnout tmavý režim";
        }

        if (modeInfo) {
            modeInfo.textContent = normalized === "dark"
                ? "Aktuální režim: Tmavý"
                : "Aktuální režim: Světlý";
        }

        try {
            localStorage.setItem(STORAGE_KEY, normalized);
        } catch (_) {
            // Ignorováno při blokovaném úložišti
        }
    }

    let savedMode = "light";
    try {
        savedMode = localStorage.getItem(STORAGE_KEY) || "light";
    } catch (_) {
        savedMode = "light";
    }
    applyTheme(savedMode);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const current = rootEl.getAttribute("data-theme");
            applyTheme(current === "dark" ? "light" : "dark");
        });
    }

    // 2. Dynamický aktuální rok v copyrightu (náhrada PHP date("Y"))
    const currentYear = new Date().getFullYear();
    document.querySelectorAll(".js-year").forEach((el) => {
        el.textContent = currentYear;
    });

    // 3. Živá kalkulačka duší (bez nutnosti klikat na tlačítko)
    const enemyCountInput = document.getElementById("enemy-count");
    const enemySoulsInput = document.getElementById("enemy-souls");
    const silverRingCheckbox = document.getElementById("silver-ring");
    const soulResult = document.getElementById("soul-result");

    function updateSoulEstimate() {
        if (!enemyCountInput || !enemySoulsInput || !soulResult) return;

        const count = Math.max(0, Number(enemyCountInput.value) || 0);
        const souls = Math.max(0, Number(enemySoulsInput.value) || 0);
        const multiplier = silverRingCheckbox && silverRingCheckbox.checked ? 1.2 : 1;
        const total = Math.round(count * souls * multiplier);

        soulResult.innerHTML = `Celkem získáš: <strong>${total.toLocaleString("cs-CZ")} duší</strong>`;
    }

    if (enemyCountInput) enemyCountInput.addEventListener("input", updateSoulEstimate);
    if (enemySoulsInput) enemySoulsInput.addEventListener("input", updateSoulEstimate);
    if (silverRingCheckbox) silverRingCheckbox.addEventListener("change", updateSoulEstimate);
    updateSoulEstimate();

    // 4. Živý odpočet času do Vánoc (24. prosince)
    const countdownEl = document.getElementById("christmas-countdown");

    function updateChristmasCountdown() {
        if (!countdownEl) return;

        const now = new Date();
        let targetYear = now.getFullYear();
        let christmas = new Date(targetYear, 11, 24, 0, 0, 0);

        // Pokud už je po 24. 12., počítáme do příštího roku
        if (now > new Date(targetYear, 11, 24, 23, 59, 59)) {
            christmas = new Date(targetYear + 1, 11, 24, 0, 0, 0);
        }

        const diff = christmas - now;

        if (diff <= 0) {
            countdownEl.innerHTML = "<strong>Šťastné a veselé Vánoce!</strong>";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownEl.innerHTML = `Do Štědrého dne zbývá: <strong>${days} dní, ${hours} hod, ${minutes} min, ${seconds} s</strong>`;
    }

    updateChristmasCountdown();
    setInterval(updateChristmasCountdown, 1000);

    // 5. Generátor náhodných rad ze světa Dark Souls (Soapstone)
    const dsQuotes = [
        "„Praise the Sun! Nikdy se nevzdávej, nemrtvý.“",
        "„Pozor na truhly — pokud má řetěz namířený dopředu, je to Mimic!“",
        "„Nešetři si Estus Flask na příští hru, raději se včas vyléč.“",
        "„Vždy si hlídej výdrž (Stamina) — bez ní neuhneš ani nevykryješ úder.“",
        "„Ztratit duše bolí, ale ztratit nervy bolí ještě víc. Odpočiň si u ohniště.“",
        "„Zkus zaútočit zezadu, nebo nalákat nepřátele po jednom.“",
        "„Zkoumej každou slepou uličku — falešné zdi skrývají poklady i zkratky.“"
    ];

    const quoteEl = document.getElementById("ds-quote");
    const newQuoteBtn = document.getElementById("new-quote-btn");
    let lastQuoteIndex = 0;

    if (newQuoteBtn && quoteEl) {
        newQuoteBtn.addEventListener("click", () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * dsQuotes.length);
            } while (nextIndex === lastQuoteIndex && dsQuotes.length > 1);

            lastQuoteIndex = nextIndex;
            quoteEl.textContent = dsQuotes[nextIndex];
        });
    }
})();