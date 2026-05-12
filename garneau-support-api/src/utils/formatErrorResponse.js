"use strict";
/**
 * Formate les réponses d'erreur de l'API.
 *
 * @param {number} statusCode Code HTTP de la réponse
 * @param {string} errorType Type d'erreur retourné
 * @param {string} message Message d'erreur retourné
 * @param {string} path Chemin de la requête
 * @returns {Object} Objet formaté contenant les informations de l'erreur
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
 * Formate les réponses de succès de l'API.
 *
 * @param {number} statusCode Code HTTP de la réponse
 * @param {string} message Message de succès retourné
 * @param {Object} data Données retournées
 * @param {string} path Chemin de la requête
 * @returns {Object} Objet formaté contenant les informations du succès
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

module.exports = {
  formatErrorResponse,
  formatValidResponse
};