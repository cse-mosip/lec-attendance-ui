import io from 'socket.io-client';
import { FINGERPRINT_SCANNER_URL } from "../config.js";

const socket = io(FINGERPRINT_SCANNER_URL);

export default socket;
