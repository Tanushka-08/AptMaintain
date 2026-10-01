import axios from 'axios';

const api = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });

export const getTickets = (status) => api.get('/tickets', { params: status ? { status } : {} });
export const createTicket = (data) => api.post('/tickets', data);
export const updateTicket = (id, data) => api.put(`/tickets/${id}`, data);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
export const getTicketLogs = () => api.get('/tickets/logs/stream');
export const registerResident = (data) => api.post('/residents', data);

export default api;