// Archivo: app.js

// Configuración de la API de Google Calendar
const CLIENT_ID = 'T864543611905-c1db3l6knok2d9meq6s7rpkffvc34dv7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAAO6vneOcLikAHTCXtnSAyNXNAxg0QhWA';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

// Autenticación de la API de Google Calendar
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: SCOPES
  }).then(() => {
    // La autenticación se realizó correctamente
    // Puedes agregar aquí la lógica para consultar horarios y crear eventos
  });
}

// Función para consultar disponibilidad y crear evento
function solicitarCita() {
  // Implementa la lógica para consultar disponibilidad de horarios y crear el evento en Google Calendar
  const fechaSeleccionada = document.getElementById('fecha').value;
  const horaSeleccionada = document.getElementById('hora').value;

  const dateTimeInicio = `${fechaSeleccionada}T${horaSeleccionada}:00`;
  const dateTimeFin = `${fechaSeleccionada}T${horaSeleccionada}:59`;

  const evento = {
    'summary': 'Cita en la peluquería',
    'description': 'Cita agendada en la peluquería',
    'start': {
      'dateTime': dateTimeInicio,
      'timeZone': 'Tu_Zona_Horaria',
    },
    'end': {
      'dateTime': dateTimeFin,
      'timeZone': 'Tu_Zona_Horaria',
    }
  };

  gapi.client.calendar.events.insert({
    'calendarId': 'primary', // ID del calendario, generalmente 'primary' para el calendario principal
    'resource': evento
  }).then((response) => {
    console.log('Evento creado:', response);
    alert('Cita agendada correctamente');
  }).catch((error) => {
    console.error('Error al crear el evento:', error);
    alert('Hubo un error al agendar la cita');
  });
}
