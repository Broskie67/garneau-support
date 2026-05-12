const Ticket = require('../../../models/ticket')

async function seedTickets() {
  await Ticket.bulkCreate([
    {
      title: 'Ordinateur qui ne démarre plus',
      description: 'Le poste de travail ne s\'allume plus malgré plusieurs tentatives.',
      category: 'Matériel',
      priority: 'Haute',
      status: 'Ouvert',
      created_by: 1,
      assigned_to: null,
      created_at: new Date('2026-05-12T08:15:00'),
      updated_at: new Date('2026-05-12T08:15:00'),
      resolved_at: null
    },
    {
      title: 'Mot de passe oublié',
      description: 'L\'utilisateur ne parvient plus à se connecter à son compte.',
      category: 'Accès et comptes',
      priority: 'Moyenne',
      status: 'Assigné',
      created_by: 1,
      assigned_to: 3,
      created_at: new Date('2026-05-11T10:30:00'),
      updated_at: new Date('2026-05-11T11:00:00'),
      resolved_at: null
    },
    {
      title: 'Connexion Wi-Fi instable',
      description: 'La connexion Wi-Fi coupe régulièrement dans le local B-204.',
      category: 'Réseau',
      priority: 'Haute',
      status: 'En attente',
      created_by: 1,
      assigned_to: 3,
      created_at: new Date('2026-05-10T13:45:00'),
      updated_at: new Date('2026-05-10T14:10:00'),
      resolved_at: null
    },
    {
      title: 'Imprimante indisponible',
      description: 'L\'imprimante du secrétariat n\'apparaît plus dans la liste des périphériques.',
      category: 'Impression',
      priority: 'Basse',
      status: 'Ouvert',
      created_by: 1,
      assigned_to: null,
      created_at: new Date('2026-05-11T08:20:00'),
      updated_at: new Date('2026-05-11T08:20:00'),
      resolved_at: null
    },
    {
      title: 'Logiciel Office ne s\'ouvre plus',
      description: 'Microsoft Word affiche une erreur au démarrage.',
      category: 'Logiciel',
      priority: 'Moyenne',
      status: 'Résolu',
      created_by: 1,
      assigned_to: 4,
      created_at: new Date('2026-05-09T09:40:00'),
      updated_at: new Date('2026-05-09T15:25:00'),
      resolved_at: new Date('2026-05-09T15:25:00')
    },
    {
      title: 'Écran externe non détecté',
      description: 'L\'écran branché en HDMI n\'est pas reconnu par l\'ordinateur portable.',
      category: 'Matériel',
      priority: 'Moyenne',
      status: 'En cours',
      created_by: 2,
      assigned_to: 4,
      created_at: new Date('2026-05-12T07:10:00'),
      updated_at: new Date('2026-05-12T07:45:00'),
      resolved_at: null
    },
    {
      title: 'Accès refusé au dossier partagé',
      description: 'L\'utilisateur reçoit un message d\'accès refusé lorsqu\'il tente d\'ouvrir le dossier partagé du département.',
      category: 'Accès et comptes',
      priority: 'Haute',
      status: 'Assigné',
      created_by: 2,
      assigned_to: 5,
      created_at: new Date('2026-05-12T09:00:00'),
      updated_at: new Date('2026-05-12T09:20:00'),
      resolved_at: null
    },
    {
      title: 'Courriel institutionnel inaccessible',
      description: 'L\'utilisateur ne parvient plus à accéder à sa boîte courriel institutionnelle.',
      category: 'Courriel',
      priority: 'Critique',
      status: 'En cours',
      created_by: 2,
      assigned_to: 5,
      created_at: new Date('2026-05-12T10:20:00'),
      updated_at: new Date('2026-05-12T10:45:00'),
      resolved_at: null
    },
    {
      title: 'Téléphone IP sans tonalité',
      description: 'Le téléphone du bureau ne produit aucune tonalité et ne permet pas de faire des appels.',
      category: 'Téléphonie',
      priority: 'Basse',
      status: 'Fermé',
      created_by: 2,
      assigned_to: 4,
      created_at: new Date('2026-05-08T08:30:00'),
      updated_at: new Date('2026-05-08T13:10:00'),
      resolved_at: new Date('2026-05-08T12:45:00')
    },
    {
      title: 'Alerte de sécurité suspecte',
      description: 'Un message suspect demande à l\'utilisateur de confirmer ses informations de connexion.',
      category: 'Sécurité',
      priority: 'Critique',
      status: 'Ouvert',
      created_by: 2,
      assigned_to: null,
      created_at: new Date('2026-05-12T09:50:00'),
      updated_at: new Date('2026-05-12T09:50:00'),
      resolved_at: null
    }
  ])
}

module.exports = {
  seedTickets
}