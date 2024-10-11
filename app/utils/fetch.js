/**
 * Peticion fetch
 * @param {string} url de peticion
 * @param {string} destructuring
 */
export const ajax = async (url, { method, data }) => {
  return await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
