export const fetchIncidents = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/incidents');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};
