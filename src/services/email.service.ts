import { transporter } from "../lib/mailer.js";
import { config } from "../config/config.js";

export const sendVerificationEmail = async (user: any, token: string) => {
  const url = `${config.URL_FRONTEND}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Taxonomy App" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Verifica tu cuenta",
    html: `
      <h2>Bienvenido ${user.name} ${user.lastName}👋</h2>
      <p>Da click para verificar tu cuenta:</p>
      <a href="${url}">Verificar Email</a>
      <p>Este link expira en 1 hora</p>
    `,
  });

};