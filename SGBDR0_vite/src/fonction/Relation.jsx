import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/utilisateurs';

function Relation() {
    // Liste des utilisateurs
    alert()
    
    const [tables, setTables] = useState([]);
    
    // Formulaire : pour ajouter ou modifier
    const [formData, setFormData] = useState({
            Column_Name: ""
    });
    
    // Mode édition : si on est en train de modifier
    const [editingId, setEditingId] = useState(null);
    
    // Chargement : pour afficher un message de chargement
    const [loading, setLoading] = useState(true);

    // Le tableau vide [] signifie "exécute une seule fois"
    useEffect(() => {
        chargerTables();
    }, []);

    // Récupérer tous les utilisateurs
    const chargerTables = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setTables(response.data);
        } catch (error) {
            console.error('Erreur chargement :', error);
            alert('Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    };

    // Ajouter ou modifier un utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        const { Column_Name } = formData;
        
        // Validation simple
        if (!prenom.trim() || !nom.trim()) {
            alert('Veuillez remplir tous les champs !');
            return;
        }
        
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, formData);
                alert('Utilisateur modifié avec succès !');
            } else {
                // MODE AJOUT : Requête POST
                await axios.post(API_URL, formData);
                alert('Utilisateur ajouté avec succès !');
            }
            
            // Recharger la liste
            chargerUtilisateurs();
            
            // Réinitialiser le formulaire
            setFormData({ prenom: '', nom: '' });
            setEditingId(null);
            
        } catch (error) {
            console.error('Erreur :', error);
            alert('Erreur lors de l\'opération');
        }
    };

    // Préparer la modification
    // Remplir le formulaire avec les données de l'utilisateur à modifier
    const handleEdit = (utilisateur) => {
        setFormData({
            prenom: utilisateur.prenom,
            nom: utilisateur.nom
        });
        setEditingId(utilisateur.id);
        // Scroll vers le formulaire
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    };

    // Supprimer un utilisateur
    const handleDelete = async (id) => {
        // Confirmation avant suppression
        if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
            return;
        }
        
        try {
            await axios.delete(`${API_URL}/${id}`);
            alert(' Utilisateur supprimé avec succès !');
            chargerUtilisateurs();
        } catch (error) {
            console.error('Erreur suppression :', error);
            alert('Erreur lors de la suppression');
        }
    };

    // Annuler l'édition
    const handleCancelEdit = () => {
        setFormData({ prenom: '', nom: '' });
        setEditingId(null);
    };
}    

export default Relation