// Je me suis aidé de: MDN; chat gpt; youtube; google
//! ========================================================================================

// Récupération du premier formulaire du document html ( du a l'utilisation du tagName)
let form = document.getElementsByTagName('form')[0];

// variable suivant les modification sur le commentaire nouvellement créer
let newComment = null;


form.addEventListener('submit', function(e){
    // Blocage du rafraîchissement de la page
    e.preventDefault();

    // Récupération du message d'erreur
    let errorMessage = document.getElementById('error-message');

    // clonage de la structure complète d'un commentaire
    let messageToClone = document.getElementById('message-to-clone');
    let messageCloned =  messageToClone.cloneNode(true); 

    //récupération des valeurs d'input type text et textarea
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let message = document.getElementById('message').value;

    // Récupération des balises et assignation des valeurs renter par l'utilisateur aux champs de commentaire fraîchement créer
    messageCloned.querySelector('h3').textContent = firstName + " " + lastName;
    messageCloned.querySelector('p').textContent = message;
    
    messageCloned.style.borderRadius = '0px';
    messageCloned.style.backgroundColor = '';

    // enlève les propriété de style de l'élément précédement créer si sa valeur difère de null
    if (newComment !== null){
            newComment.style.backgroundColor = '';
            newComment.style.borderRadius ='0px';
    }

    //  Rend visible le message d'erreur
    if (firstName === "" || lastName === "" || message === "") { 
            //redéfinition de l'attribut display afin de rendre le message d'erreur visible 
            errorMessage.style.display = "block";
    }

    else {

            // cache le message d'erreur
            errorMessage.style.display = "none";

            // Assure que le clone est visible
            messageCloned.style.display = 'block'; 

            // Définition des valeur de style
            messageCloned.style.transform = 'translateY(-100px)';
            messageCloned.style.opacity = '0';
            messageCloned.style.transition = 'transform 0.5s ease-in, opacity 0.6s ease-in';

            // Récupération du noeud du conteneur des commentaires
            let currentDiv = document.getElementById('comment-list');

            // ajout du commentaire complet
            currentDiv.appendChild(messageCloned);

            // Déclanche la trasision
            setTimeout(() => {
                messageCloned.style.transform = 'translateY(0)';
                messageCloned.style.opacity = '1';
                messageCloned.style.borderRadius = '0px 0px 10px 10px';
                messageCloned.style.backgroundColor = 'rgb(20, 184, 166, 0.2)';
    },0);

    }

    // Remise à zéro / réinitialisation  des champs du formulaire
    form.reset();

    // Déroule la fenêtre vers le bas afin d'avoir la vue centré sur le dernier commentaire et l'ajout d'un autre commentaire
    window.scrollBy({
        top : window.innerHeight,
        behavior : 'smooth'
    });

    // Assigne une valeur non null a newComment afin de le réinitialiser a la prochaine soumission
    newComment = messageCloned;
});