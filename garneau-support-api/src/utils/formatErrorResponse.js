"use strict";
/**
 * fonction utilitaire pour formater les réponses d'erreur de l'API
 * 
 * @param {number} statusCode - le statut HTTP de l'erreur.
 * @param {string} errorType - le type d'erreur (ex: "Bad Request", "Unauthorized", etc.).
 * @param {string} message - le message d'erreur détaillé à retourner au client.
 * @param {string} path - le chemin de la requête qui a causé l'erreur.
 * @returns {Object} - un objet formaté contenant les informations de l'erreur, prêt à être envoyé en réponse à une requête API.
 */
const formatErrorResponse = (statusCode, errorType, message, path) => {
  return {
    statusCode,
    error: errorType,
    message: message,
    path: path,
    timestamp: new Date().toISOString()
  };
}

/**
 * fonction utilitaire pour formater les réponses de succès de l'API
 * 
 * @param {number} statusCode - le statut HTTP de la réponse.
 * @param {string} message - le message de succès à retourner au client.
 * @param {any} data - les données de succès à retourner au client.
 * @param {string} path - le chemin de la requête qui a causé la réponse.
 * @returns {Object} - un objet formaté contenant les informations de la réponse, prêt à être envoyé en réponse à une requête API.
 */
const formatValidResponse = (statusCode, message, data, path) => {
  return {
    statusCode,
    message: message,
    data: data,
    path: path,
    timestamp: new Date().toISOString()
  };
}