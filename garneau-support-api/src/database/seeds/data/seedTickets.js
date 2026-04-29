const Ticket = require('../../../models/ticket')

async function seedTickets() {
  await Ticket.bulkCreate([
    {
      title: 'Ordinateur qui ne démarre plus',
      description: 'Le poste de travail ne s\'allume plus malgré plusieurs tentatives.',
      category: 'matériel',
      priority: 'Haute',
      status: 'Ouvert',
      created_by: 1,
      assigned_to: null,
      created_at: new Date('2026-02-01T09:15:00'),
      updated_at: new Date('2026-02-01T09:15:00')
    },
    {
      title: 'Mot de passe oublié',
      description: 'L\'utilisateur ne parvient plus à se connecter à son compte.',
      category: 'Accès et compte',
      priority: 'Moyenne',
      status: 'Assigné',
      created_by: 1,
      assigned_to: 3,
      created_at: new Date('2026-02-01T10:30:00'),
      updated_at: new Date('2026-02-01T11:00:00')
    },
    {
      title: 'Connexion Wi-Fi instable',
      description: 'La connexion Wi-Fi coupe régulièrement dans le local B-204.',
      category: 'Réseau',
      priority: 'Haute',
      status: 'En Attente',
      created_by: 1,
      assigned_to: 3,
      created_at: new Date('2026-02-01T13:45:00'),
      updated_at: new Date('2026-02-01T14:10:00')
    },
    {
      title: 'Imprimante indisponible',
      description: 'L\'imprimante du secrétariat n\'apparaît plus dans la liste des périphériques.',
      category: 'Impression',
      priority: 'Basse',
      status: 'Ouvert',
      created_by: 1,
      assigned_to: null,
      created_at: new Date('2026-02-02T08:20:00'),
      updated_at: new Date('2026-02-02T08:20:00')
    },
    {
      title: 'Logiciel Office ne s\'ouvre plus',
      description: 'Microsoft Word affiche une erreur au démarrage.',
      category: 'Logiciel',
      priority: 'Moyenne',
      status: 'Résolu',
      created_by: 1,
      assigned_to: 4,
      created_at: new Date('2026-02-02T09:40:00'),
      updated_at: new Date('2026-02-02T15:25:00')
    },
    {
      title: 'Écran externe non détecté',
      description: 'L\'écran branché en HDMI n\'est pas reconnu par l\'ordinateur portable.',
      category: 'matériel',
      priority: 'Moyenne',
      status: 'En Cours',
      created_by: 2,
      assigned_to: 4,
      created_at: new Date('2026-02-03T10:10:00'),
      updated_at: new Date('2026-02-03T10:45:00')
    },
    {
      title: 'Accès refusé au dossier partagé',
      description: 'L\'utilisateur reçoit un message d\'accès refusé lorsqu\'il tente d\'ouvrir le dossier partagé du département.',
      category: 'Accès et compte',
      priority: 'Haute',
      status: 'Assigné',
      created_by: 2,
      assigned_to: 5,
      created_at: new Date('2026-02-03T11:00:00'),
      updated_at: new Date('2026-02-03T11:00:00')
    },
    {
      title: 'Courriel institutionnel inaccessible',
      description: 'L\'utilisateur ne parvient plus à accéder à sa boîte courriel institutionnelle.',
      category: 'Courriel',
      priority: 'Critique',
      status: 'En Cours',
      created_by: 2,
      assigned_to: 5,
      created_at: new Date('2026-02-03T14:20:00'),
      updated_at: new Date('2026-02-03T14:45:00')
    },
    {
      title: 'Téléphone IP sans tonalité',
      description: 'Le téléphone du bureau ne produit aucune tonalité et ne permet pas de faire des appels.',
      category: 'Téléphonie',
      priority: 'Basse',
      status: 'Fermé',
      created_by: 2,
      assigned_to: 4,
      created_at: new Date('2026-02-04T08:30:00'),
      updated_at: new Date('2026-02-04T13:10:00')
    },
    {
      title: 'Alerte de sécurité suspecte',
      description: 'Un message suspect demande à l\'utilisateur de confirmer ses informations de connexion.',
      category: 'Sécurité',
      priority: 'Critique',
      status: 'Ouvert',
      created_by: 2,
      assigned_to: null,
      created_at: new Date('2026-02-04T09:50:00'),
      updated_at: new Date('2026-02-04T09:50:00')
    }
  ])
}

module.exports = {
  seedTickets
}