import io from 'socket.io-client';

// const FingerPrintScanner = process.env.FINGERPRINT_APP_API_ENDPOINT;
const FingerPrintScanner = 'http://localhost:4000';

const socket = io(FingerPrintScanner);

export default socket;
