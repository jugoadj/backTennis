const calculateScore = (points, players) => {
  const [player1, player2] = players;

  // Initialisation des scores
  const score = {
    sets: [{ joueur1: 0, joueur2: 0 }], // Set en cours
    currentGame: { joueur1: 0, joueur2: 0 }, // Jeu en cours
    winner: null, // Vainqueur du match
  };

  let currentSetIndex = 0;

  // Parcours de chaque point
  for (const point of points) {
    const currentSet = score.sets[currentSetIndex];

    // Mettre à jour le jeu en cours
    if (point === player1) {
      score.currentGame.joueur1++;
    } else if (point === player2) {
      score.currentGame.joueur2++;
    }

    // Vérifier si un joueur a gagné le jeu
    const { joueur1: p1, joueur2: p2 } = score.currentGame;
    if (p1 >= 4 && p1 - p2 >= 2) {
      currentSet.joueur1++;
      score.currentGame = { joueur1: 0, joueur2: 0 }; // Réinitialiser le jeu
    } else if (p2 >= 4 && p2 - p1 >= 2) {
      currentSet.joueur2++;
      score.currentGame = { joueur1: 0, joueur2: 0 }; // Réinitialiser le jeu
    }

    // Vérifier si un joueur a gagné le set
    if (currentSet.joueur1 >= 6 && currentSet.joueur1 - currentSet.joueur2 >= 2) {
      if (score.sets.length === 3) {
        score.winner = player1;
        break; // Match terminé
      }
      currentSetIndex++;
      score.sets.push({ joueur1: 0, joueur2: 0 }); // Nouveau set
    } else if (currentSet.joueur2 >= 6 && currentSet.joueur2 - currentSet.joueur1 >= 2) {
      if (score.sets.length === 3) {
        score.winner = player2;
        break; // Match terminé
      }
      currentSetIndex++;
      score.sets.push({ joueur1: 0, joueur2: 0 }); // Nouveau set
    }

    // Gestion du tie-break (jeu décisif)
    if (currentSet.joueur1 === 6 && currentSet.joueur2 === 6) {
      // Logique du tie-break (à implémenter si nécessaire)
    }
  }

  // Formater le score du jeu en cours pour afficher AV ou -
  const { joueur1: p1, joueur2: p2 } = score.currentGame;
  if (p1 >= 3 && p2 >= 3) {
    if (p1 === p2) {
      score.currentGame = { joueur1: "40", joueur2: "40" };
    } else if (p1 > p2) {
      score.currentGame = { joueur1: "AV", joueur2: "-" };
    } else {
      score.currentGame = { joueur1: "-", joueur2: "AV" };
    }
  } else {
    // Convertir les points en notation tennis (0, 15, 30, 40)
    const pointsToScore = (points) => {
      switch (points) {
        case 0:
          return "0";
        case 1:
          return "15";
        case 2:
          return "30";
        case 3:
          return "40";
        default:
          return "40"; // Au-delà de 40, on reste à 40
      }
    };
    score.currentGame = {
      joueur1: pointsToScore(p1),
      joueur2: pointsToScore(p2),
    };
  }

  return score;
};
// Route API pour renvoyer le résultat
module.exports.CalculateScore = async (req, res) => {
  const { points, players } = req.body;

  if (!points || !players || players.length !== 2) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const result = calculateScore(points, players);
  res.json(result);
};
