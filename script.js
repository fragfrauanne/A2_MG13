const tasks = [
    { question: "Fährt der Bus zur Steinstraße?", answer: "..., ob der Bus zur Steinstraße fährt?" },
    { question: "Ist der Supermarkt samstags auch bis 20 Uhr geöffnet?", answer: "..., ob der Supermarkt samstags auch bis 20 Uhr geöffnet ist?" },
    { question: "Wie viel kostet das T-Shirt?", answer: "..., wie viel das T-Shirt kostet?" },
    { question: "Wie komme ich zum Marienplatz?", answer: "..., wie ich zum Marienplatz komme?" },
    { question: "Wie viel Uhr ist es?", answer: "..., wie viel Uhr es ist?" },
    { question: "Gibt es hier in der Nähe eine Bank?", answer: "..., ob es hier in der Nähe eine Bank gibt?" },
    { question: "Welches Datum ist heute?", answer: "..., welches Datum heute ist?" },
    { question: "Wo muss ich aussteigen, wenn ich zur Baumstraße möchte?", answer: "..., wo ich aussteigen muss, wenn ich zur Baumstraße möchte?" },
    { question: "Gibt es noch Karten für den Film?", answer: "..., ob es noch Karten für den Film gibt?" },
    { question: "Wo finde ich das Mehl?", answer: "..., wo ich das Mehl finde?" },
    { question: "Ist in der Wurst Schweinefleisch?", answer: "..., ob in der Wurst Schweinefleisch ist?" },
    { question: "Ist es zum Bahnhof noch weit?", answer: "..., ob es zum Bahnhof noch weit ist?" },
    { question: "Wie lange muss ich noch warten?", answer: "..., wie lange ich noch warten muss?" },
    { question: "Wann kann ich mit Herrn Hansen sprechen?", answer: "..., wann ich mit Herrn Hansen sprechen kann?" },
    { question: "Wo ist die nächste Bushaltestelle?", answer: "..., wo die nächste Bushaltestelle ist?" },
    { question: "Wann beginnt der Film?", answer: "..., wann der Film beginnt?" },
    { question: "Wie lange dauert der Deutschkurs?", answer: "..., wie lange der Deutschkurs dauert?" },
    { question: "Ist Herr Perez heute im Büro?", answer: "..., ob Herr Perez heute im Büro ist?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
