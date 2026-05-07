const Comment = require('../../../models/comment')

async function seedComments() {
  await Comment.bulkCreate([
    {
      content: 'Bonjour, pouvez-vous confirmer si le poste fait un bruit ou si aucune lumière ne s’allume?',
      attachment: null,
      type: 'Public',
      created_by: 3,
      ticket_id: 1,
      created_at: new Date('2026-02-01T09:30:00'),
      updated_at: new Date('2026-02-01T09:30:00')
    },
    {
      content: 'Aucune lumière ne s’allume sur le poste. J’ai aussi essayé une autre prise électrique.',
      attachment: 'ordinateur_probleme.jpg',
      type: 'Public',
      created_by: 1,
      ticket_id: 1,
      created_at: new Date('2026-02-01T09:45:00'),
      updated_at: new Date('2026-02-01T09:45:00')
    },
    {
      content: 'Le mot de passe a été réinitialisé. Veuillez essayer de vous reconnecter.',
      attachment: null,
      type: 'Public',
      created_by: 3,
      ticket_id: 2,
      created_at: new Date('2026-02-01T11:05:00'),
      updated_at: new Date('2026-02-01T11:05:00')
    },
    {
      content: 'Intervention terminée. Le client a confirmé que la connexion fonctionne.',
      attachment: null,
      type: 'Interne',
      created_by: 3,
      ticket_id: 2,
      created_at: new Date('2026-02-01T11:20:00'),
      updated_at: new Date('2026-02-01T11:20:00')
    },
    {
      content: 'Le problème semble toucher seulement le local B-204. Une vérification du point d’accès est nécessaire.',
      attachment: null,
      type: 'Interne',
      created_by: 3,
      ticket_id: 3,
      created_at: new Date('2026-02-01T14:00:00'),
      updated_at: new Date('2026-02-01T14:00:00')
    },
    {
      content: 'La connexion coupe surtout pendant les cours, lorsqu’il y a plusieurs étudiants connectés.',
      attachment: null,
      type: 'Public',
      created_by: 1,
      ticket_id: 3,
      created_at: new Date('2026-02-01T14:15:00'),
      updated_at: new Date('2026-02-01T14:15:00')
    },
    {
      content: 'L’imprimante n’est plus visible dans la liste des périphériques depuis ce matin.',
      attachment: 'capture_imprimante.png',
      type: 'Public',
      created_by: 1,
      ticket_id: 4,
      created_at: new Date('2026-02-02T08:35:00'),
      updated_at: new Date('2026-02-02T08:35:00')
    },
    {
      content: 'Le logiciel affiche une erreur au démarrage. Une réparation Office a été lancée.',
      attachment: null,
      type: 'Public',
      created_by: 4,
      ticket_id: 5,
      created_at: new Date('2026-02-02T10:15:00'),
      updated_at: new Date('2026-02-02T10:15:00')
    },
    {
      content: 'La réparation a corrigé le problème. Le ticket peut être marqué comme résolu.',
      attachment: null,
      type: 'Interne',
      created_by: 4,
      ticket_id: 5,
      created_at: new Date('2026-02-02T15:20:00'),
      updated_at: new Date('2026-02-02T15:20:00')
    },
    {
      content: 'L’écran externe est bien détecté avec un autre câble HDMI. Le câble actuel semble défectueux.',
      attachment: null,
      type: 'Public',
      created_by: 4,
      ticket_id: 6,
      created_at: new Date('2026-02-03T10:50:00'),
      updated_at: new Date('2026-02-03T10:50:00')
    },
    {
      content: 'Les droits d’accès du dossier partagé doivent être vérifiés avec l’administrateur.',
      attachment: null,
      type: 'Interne',
      created_by: 5,
      ticket_id: 7,
      created_at: new Date('2026-02-03T11:15:00'),
      updated_at: new Date('2026-02-03T11:15:00')
    },
    {
      content: 'Le problème est prioritaire puisque l’utilisateur ne peut plus accéder à ses courriels.',
      attachment: null,
      type: 'Public',
      created_by: 5,
      ticket_id: 8,
      created_at: new Date('2026-02-03T14:50:00'),
      updated_at: new Date('2026-02-03T14:50:00')
    },
    {
      content: 'Capture reçue. Le message d’erreur indique possiblement un problème d’authentification.',
      attachment: 'erreur_courriel.png',
      type: 'Interne',
      created_by: 5,
      ticket_id: 8,
      created_at: new Date('2026-02-03T15:05:00'),
      updated_at: new Date('2026-02-03T15:05:00')
    },
    {
      content: 'Le téléphone a été testé avec un autre câble réseau. Le problème est résolu.',
      attachment: null,
      type: 'Public',
      created_by: 4,
      ticket_id: 9,
      created_at: new Date('2026-02-04T13:00:00'),
      updated_at: new Date('2026-02-04T13:00:00')
    },
    {
      content: 'Ne cliquez pas sur le lien du message suspect. Une analyse sera effectuée.',
      attachment: null,
      type: 'Public',
      created_by: 5,
      ticket_id: 10,
      created_at: new Date('2026-02-04T10:00:00'),
      updated_at: new Date('2026-02-04T10:00:00')
    },
    {
      content: 'Le courriel semble être une tentative d’hameçonnage. À traiter en priorité.',
      attachment: 'courriel_suspect.pdf',
      type: 'Interne',
      created_by: 5,
      ticket_id: 10,
      created_at: new Date('2026-02-04T10:10:00'),
      updated_at: new Date('2026-02-04T10:10:00')
    }
  ])
}

module.exports = {
  seedComments
}