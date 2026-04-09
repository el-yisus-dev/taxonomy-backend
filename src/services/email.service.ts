import { transporter } from "../lib/mailer.js";
import { config } from "../config/config.js";

export const sendVerificationEmail = async (user: any, token: string) => {
  const url = `${config.URL_FRONTEND}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Taxonomy App" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Verifica tu cuenta",
    html: `
      <div style="background-color:#0B1120;padding:40px 0;font-family:Arial,sans-serif;">
        
        <table align="center" width="100%" style="max-width:600px;background-color:#111827;border-radius:10px;padding:30px;color:#F3F4F6;">
          
          <tr>
            <td align="center">
              <h1 style="color:#2563EB;margin-bottom:10px;">
                🌿 AnimalDex
              </h1>
              <p style="color:#9CA3AF;margin-top:0;">
                Comunidad biológica
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <h2 style="margin-top:20px;">
                Bienvenido, ${user.name} 👋
              </h2>

              <p style="color:#9CA3AF;line-height:1.6;">
                Te damos la bienvenida a una comunidad donde cada observación cuenta.
              </p>

              <p style="color:#9CA3AF;line-height:1.6;">
                Con tu ayuda, estamos construyendo un sistema colaborativo para catalogar la biodiversidad del mundo.
                Cada aporte acerca a la humanidad a comprender mejor la vida en nuestro planeta.
              </p>

              <p style="margin-top:25px;">
                Para comenzar, solo necesitas verificar tu cuenta:
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${url}" 
                  style="
                    background-color:#10B981;
                    color:#0B1120;
                    padding:12px 24px;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                    display:inline-block;
                  ">
                  Verificar cuenta
                </a>
              </div>

              <p style="color:#9CA3AF;font-size:14px;">
                Este enlace expirará en 1 hora.
              </p>

              <p style="color:#6B7280;font-size:12px;margin-top:30px;">
                Si no creaste esta cuenta, puedes ignorar este mensaje.
              </p>
            </td>
          </tr>

        </table>

      </div>
    `,
  });

};

export const sendResetPasswordEmail = async (user: any, otp: string) => {
  await transporter.sendMail({
    to: user.email,
    subject: "Password reset code",
    html: `
      <h2>Password Reset</h2>
      <p>Your verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 10 minutes</p>
    `,
  });
};