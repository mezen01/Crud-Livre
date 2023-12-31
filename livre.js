// Définir la table en dehors de la fonction allData pour qu'elle soit accessible globalement
var table = document.getElementById("table");

// Fonction pour afficher toutes les données depuis le stockage local
function allData() {
    // Clear the table first
    table.innerHTML = '';

    // Get the list of contacts from local storage
    var contactList = JSON.parse(localStorage.getItem("listItem")) || [];

    // Loop through each contact and add it to the table
    contactList.forEach(function(value, i) {
        // Add the contact data to the table
        table.innerHTML += `
        <tr>
        <td>${i+1}</td>
        <td>${value.name}</td>
        <td>${value.auteur}</td>
        <td>${value.prix}</td>
        <td>
           <button class="btn btn-sm btn-success" onclick="edit(${value.id})">
             <i class="fa fa-edit"></i>
           </button>
         </td>   
        <td>
           <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
             <i class="fa fa-trash"></i>
           </button>
         </td>    
       </tr>
        `;
    });
}

// Fonction pour sauvegarder les données de contact dans le stockage local
function save() {
    // Get the list of contacts from local storage
    var contactList = JSON.parse(localStorage.getItem("listItem")) || [];

    // Get the id for the new contact
    var id = 0;
    if (contactList.length !== 0) {
        id = contactList[contactList.length - 1].id;
    }

    // Check if all fields are filled in
    if (!document.getElementById('name').value || !document.getElementById('auteur').value || !document.getElementById('prix').value) {
        alert('Please fill in all fields');
        return;
    }

    // If the id field is filled in, update the existing contact
    if (document.getElementById('id').value) {
        contactList.forEach(function(value) {
            if (document.getElementById('id').value == value.id) {
                value.name = document.getElementById('name').value;
                value.auteur = document.getElementById('auteur').value;
                value.prix = document.getElementById('prix').value;
            }
        });

        // Clear the id field
        document.getElementById('id').value = '';
    } else {
        // If the id field is not filled in, add a new contact
        var item = {
            id: id + 1,
            name: document.getElementById('name').value,
            auteur: document.getElementById('auteur').value,
            prix: document.getElementById('prix').value,
        };

        // Add the new contact to the list
        contactList.push(item);
    }

    // Save the updated list to local storage
    localStorage.setItem('listItem', JSON.stringify(contactList));

    // Update the table with the new data
    allData();

    // Clear the form
    document.getElementById('form').style.display = 'none';
    document.querySelector('button[type="button"][onclick="toggleForm()"]').style.display = 'block';

    // Clear the form
    document.getElementById('form').reset();
}

// Cette fonction trouve un enregistrement spécifique dans le tableau localStorage et remplit les champs de saisie avec ses valeurs
function find(id) {

    // Get the array from localStorage and parse it as JSON, or create an empty array if none exists
    var contactList = JSON.parse(localStorage.getItem('listItem')) || [];

    // Loop through the array and find the record with the matching ID
    contactList.forEach(function(value) {
        if (value.id == id) {
            // Populate the input fields with the record's values
            document.getElementById('id').value = value.id;
            document.getElementById('name').value = value.name;
            document.getElementById('auteur').value = value.auteur;
            document.getElementById('prix').value = value.prix;
        }
    });
}

// Cette fonction supprime un enregistrement spécifique du tableau localStorage et met à jour le tableau
function removeData(id) {
    // Get the array from localStorage and parse it as JSON, or create an empty array if none exists
    var contactList = JSON.parse(localStorage.getItem('listItem')) || [];

    // Confirm with the user that they want to delete the record
    if (confirm("Are you sure you want to delete this record?")) {
        // Remove the record with the matching ID from the array
        contactList = contactList.filter(function(value) {
            return value.id != id;
        });

        // Save the updated array back to localStorage
        localStorage.setItem('listItem', JSON.stringify(contactList));

        // Update the table to reflect the changes
        allData();
    }
}

// Appeler la fonction allData pour afficher les données au chargement de la page
allData();


function toggleForm() {
    var form = document.getElementById('form');
    var addButton = document.querySelector('button[type="button"][onclick="toggleForm()"]');

    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        addButton.style.display = 'none';
    } else {
        form.style.display = 'none';
        addButton.style.display = 'block';
    }
}

function edit(id) {
    find(id); // Remplir le formulaire avec les données de l'enregistrement sélectionné
    var form = document.getElementById('form');
    var addButton = document.querySelector('button[type="button"][onclick="toggleForm()"]');

    form.style.display = 'block'; // Afficher le formulaire
    addButton.style.display = 'none'; // Masquer le bouton "Ajouter un livre"
}

function clearData() {
    document.getElementById('form').reset();
    document.getElementById('id').value = '';
    var form = document.getElementById('form');
    var addButton = document.querySelector('button[type="button"][onclick="toggleForm()"]');
    form.style.display = 'none'; // Masquer le formulaire
    addButton.style.display = 'block';
}