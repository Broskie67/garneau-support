"use strict";
/**
 * utility function to format API error responses
 * 
 * @param {number} statusCode - the HTTP status code of the response.
 * @param {string} errorType - the type of error to return to the client.
 * @param {string} message - the error message to return to the client.
 * @param {string} path - the path of the request that caused the error.
 * @returns {Object} - a formatted object containing the error information, ready to be sent in response to an API request.
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
 * utility function to format API success responses
 * @param {number} statusCode - the HTTP status code of the response.
 * @param {string} message - the success message to return to the client.
 * @param {Object} data - the data to return to the client in case of a successful response.
 * @param {string} path - the path of the request that caused the response.
 * @returns {Object} - a formatted object containing the success information, ready to be sent in response to an API request.
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