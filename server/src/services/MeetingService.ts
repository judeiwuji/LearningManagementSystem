import * as dotenv from 'dotenv';
import axios from 'axios';
import MeetingResponse from '../models/interfaces/MeetingResponse';
import AppError from '../models/errors/AppError';
dotenv.config();

const DEVELOPER_KEY = process.env.DIGITAL_SAMBA_DEVELOPER_KEY;
const TEAM_ID = process.env.DIGITAL_SAMBA_TEAM_ID;
const API = process.env.DIGITAL_SAMBA_API;

export default class MeetingService {
  async createMeeting() {
    const secret = btoa(`${TEAM_ID}:${DEVELOPER_KEY}`);
    const authorization = `Bearer ${secret}`;
    const data = { privacy: 'public' };
    const url = `${API}/rooms`;

    const response = await axios.post<MeetingResponse>(url, data, {
      headers: { Authorization: authorization },
    });

    if (response.status !== 200) {
      throw new AppError('Failed to create lecture room');
    }

    return response.data;
  }
}
