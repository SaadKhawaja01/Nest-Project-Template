import { Get, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as bcrypt from "bcrypt";

@Injectable()
export class MailingService {
  constructor(private mailerservice: MailerService) {}

  async email(toEmail: string, otp: string): Promise<string> {
    await this.mailerservice.sendMail({
      to: toEmail,
      from: "KhawajaSaadMasood@gmail.com",
      subject: "Testing Nest MailerModule ✔",
      //   text: "Test mail from PC",
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 400;
                src: local('Montserrat'), local('Montserrat'), url(https://fonts.google.com/share?selection.family=Montserrat:ital,wght@1,200);
            }

            @font-face {
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 700;
                src: local('Montserrat Bold'), local('Montserrat-Bold'), url(https://fonts.google.com/share?selection.family=Montserrat%20Subrayada:wght@700%7CMontserrat:ital,wght@1,200);
            }

            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,

            img {
                -ms-interpolation-mode: bicubic;
            }

            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
    </style>
    <title></title>
</head>
<body>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    </head> <!-- HIDDEN PREHEADER TEXT -->
    <div
        style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Montserrat'Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Go anywhere with anywheel!</div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%"> <!-- LOGO -->
        <tr>
            <td bgcolor="#f4f4f4" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top"
                            style="padding: 40px 20px 20px 20px; border-radius: 2px 2px 0px 0px; color: #AADB1E; font-family: 'Londrina Solid'Helvetica, Arial, sans-serif; font-size: 45px; font-weight: 700; letter-spacing: 2px; line-height: 48px;">
                            <h1 style="font-size: 40px; font-weight:700; margin: w-50;">Mailing System</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center"
                            style="padding: 20px 30px 40px 30px; color: #000000; font-family:'Montserrat bold' Helvetica, Arial, sans-serif; font-size: 16px; font-weight:600; line-height: 25px;">
                            <p>Kindly verify your email to complete your account registration.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <!-- VERIFICATION NUMBER -->
                                                <td class="w-24 h-24 bg-slate-300 rounded-full text-center font-bold">
                                                  ${otp}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> 
                    <td bgcolor="#ffffff" align="center"
                        style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #000000; font-family:'Montserrat'Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;" class="font-semibold">Contact us at: <a href="#" target="_blank"
                                style="color: #29ABE2;"><span
                                    class="hover:underline">support@intelligentsoftware.net</span></a>
                        </p>
                    </td>
                 </tr>
        <tr>
            <td bgcolor="#ffffff" align="center" class="flex justify-center gap-2 items-center"
                style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #333333; font-family:'Montserrat'Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                <img class="hover:cursor-pointer" src="https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png" />
            </td>
        </tr>
       </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                        <br>
                        <p> <a href="#" target="_blank" style="color: #111111; font-weight: 700;" </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    </table>
</body>
</body>
</html>
        `,
    });
    return "saad";
  }
}
