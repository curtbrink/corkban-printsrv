import { registerAs } from '@nestjs/config';

export default registerAs('printer', () => ({
  host: process.env.PRINTER_HOST,
  user: process.env.PRINTER_PORT,
  secretKey: process.env.SECRET_KEY,
}));
