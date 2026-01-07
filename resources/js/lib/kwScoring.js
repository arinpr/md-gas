// lib/kwScoring.js
export function scoreBathrooms(label) {
    // expected labels: "1 bathroom", "2 bathrooms", "3 bathrooms", "4+ bathrooms"
    if (!label) return 2; // default Score 2 if missing :contentReference[oaicite:4]{index=4}
    if (label.startsWith("1")) return 1;
    if (label.startsWith("2")) return 2;
    return 3; // 3+ or 4+
}

export function scoreRadiators(label) {
    // expected labels: "0–5", "6–9", "10–13", "14–16", "17+"
    if (!label) return 2; // default Score 2 :contentReference[oaicite:5]{index=5}
    if (label === "0–5" || label === "6–9") return 1;  // treat up to 9 as Score 1
    if (label === "10–13" || label === "14–16") return 2; // 10–16 as Score 2
    return 3; // 17+
}

export function kwBandFromScore(score) {
    // Score -> kW band :contentReference[oaicite:6]{index=6}
    if (score === 1) return { score: 1, kw: 24, label: "24-25 kW" };
    if (score === 2) return { score: 2, kw: 30, label: "30 kW" };
    return { score: 3, kw: 35, label: "35 kW" };
}

export function computeKw(answers) {
    const bScore = scoreBathrooms(answers?.bathrooms?.label);
    const rScore = scoreRadiators(answers?.radiators?.label);

    const finalScore = Math.max(bScore, rScore); // “higher score always wins” :contentReference[oaicite:7]{index=7}
    const band = kwBandFromScore(finalScore);

    return {
        bathroomScore: bScore,
        radiatorScore: rScore,
        finalScore,
        band,
    };
}
