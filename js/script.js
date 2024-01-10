// Chargement du DOM avant execution du code 
document.addEventListener('DOMContentLoaded', () => {
    let plateau = null // initialiser le plateau
    const jeu = new Chess(); // Créer une nouvelle instance Chess.js
    const historiqueMouvements = document.getElementById("historique-mouvements") // attraper la div de historique mouvements
    let compteurMouvement = 1; // initialiser le comtpeur de mouvements
    let couleurJoueur = "w"; // initialiser la couleur du joueur en blanc

    // fonction mouvement aleatoire de l'adversaire
    const mouvementsAleatoiresAdversaire = function () {
        const mouvementsPossibles = jeu.moves(); // 

        if (jeu.game_over()) {
            alert("Echec et mat")
        } else {
            const randomIdx = Math.floor(Math.random() * mouvementsPossibles.length);
            const mouvement = mouvementsPossibles[randomIdx];
            game.move(mouvement)
            plateau.position(jeu.fen());
            enregisterEtAfficherMouvement(mouvement, compteurMouvement); // enregister le mouvement et affiche le mouvement dans historique mouvement
            compteurMouvement++; // ajouter le mouvement a la fin de la boucle
        };
    };

    // Fonction pour enregister et afficher le mouvement dans l'historique des mouvements
    const enregisterEtAfficherMouvement = function (mouvement, nombreMouvement) {
        const mouvementFormate = nombreMouvement % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        historiqueMouvements.textContent += mouvementFormate + " ";
        historiqueMouvements.scrollTop = historiqueMouvements.scrollHeight // mettre le dernier mouvement en autoscroll
    };


    // Fonction pour démarer le jeu au moment de manipuler la première pièce sur le tableau avec drag
    const dragPremierePieceStart = function (source, piece) {
        // autoriser le joueur à ne déplacer que les pièces de sa propre couleur
        return !jeu.game_over() && piece.search(couleurJoueur) === 0;
    };

    // Fonction pour récupérer une pièce dropé sur le tableau
    const pieceDrop = function (source, target) {
        const mouvement = jeu.move({
            from: source,
            to: target,
            promotion: "q",
        });

        if (move === null) return "revenir en arriève";

        window.setTimeout(mouvementsAleatoiresAdversaire, 250)
        enregisterEtAfficherMouvement(mouvement.san, compteurMouvement) // Enregistrer le mouvement et afficher le compteur mouvement à jour
        compteurMouvement++;
    }

    // Fonction pour enregister la fin de l'animation d'une pièce
    const finMouvementPiece = function () {
        tableau.position(jeu.fen());
    };

    const tableauParametres = {
        showNotation: true,
        draggable: true,
        position: 'start',
        dragPremierePieceStart,
        pieceDrop,
        finMouvementPiece,
        moveSpeed: 'fast',
        snapBackSpeed: 500,
        snapSpeed: 100,
    };

    tableau = Chessboard("board", tableauParametres)


})