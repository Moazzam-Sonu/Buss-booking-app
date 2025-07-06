import apiClient from '../apiClient';

export const fetchBuses = async (from: string, to: string, date: string) => {
  const { data } = await apiClient.post('/bus/search',  { from, to, date } );
  return data?.data || [];
};

export const fetchBusDetails = async (busId: string) => {
  const { data } = await apiClient.get(`/bus/${busId}`);
  return data?.data || [];
};

export const fetchUserTickets = async () => {
  try {
    const { data } = await apiClient.get('/ticket/mytickets');
    return data?.tickets || [];
  } catch (error) {
    console.error('Failed to fetch user tickets:', error);
    throw error; // rethrow to let React Query handle error state
  }
}


export const bookTicket = async (ticketData: {
  busId: string;
  seatNumbers: number[];
  date: string;
}) => {
  const { data } = await apiClient.post('/ticket/book', {
    busId: ticketData.busId,
    seatNumbers: ticketData.seatNumbers,
    date: ticketData.date,
  });
  return data?.ticket;
};