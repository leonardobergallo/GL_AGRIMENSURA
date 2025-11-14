import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Intentar inicializar Resend dinámicamente solo si está configurado
  let resendClient: any = null
  const resendKey = process.env.RESEND_API_KEY
  const contactEmail = process.env.CONTACT_EMAIL

  if (resendKey && contactEmail) {
    try {
      const mod = await import('resend')
      const Resend = mod?.Resend || mod?.default
      if (Resend) {
        resendClient = new Resend(resendKey)
      }
    } catch (err) {
      // Pausar el envío si la librería no está instalada o falla la importación
      console.warn('Resend no está disponible o no pudo importarse:', err)
      resendClient = null
    }
  }

  try {
    const body = await request.json()
    const { nombre, email, telefono, servicio, title, ...campos } = body

    // Construir el HTML del email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; padding: 12px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Consulta: ${title}</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Nombre:</span>
                <span class="value">${nombre}</span>
              </div>
              <div class="field">
                <span class="label">📧 Email:</span>
                <span class="value">${email}</span>
              </div>
              <div class="field">
                <span class="label">📱 Teléfono:</span>
                <span class="value">${telefono}</span>
              </div>
              ${Object.entries(campos)
                .filter(([key, value]) => value && key !== 'mensaje')
                .map(([key, value]) => `
                  <div class="field">
                    <span class="label">${formatLabel(key)}:</span>
                    <span class="value">${value}</span>
                  </div>
                `)
                .join('')}
              ${campos.mensaje ? `
                <div class="field">
                  <span class="label">💬 Mensaje:</span>
                  <div class="value" style="white-space: pre-wrap;">${campos.mensaje}</div>
                </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Este email fue enviado desde el formulario de contacto de GL Agrimensura</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Enviar email al agrimensor y confirmación al cliente solo si Resend está disponible
    if (resendClient && contactEmail) {
      await resendClient.emails.send({
        from: `GL Agrimensura <noreply@${new URL(process.env.NEXT_PUBLIC_SITE_URL || 'example.com').hostname}>`,
        to: [contactEmail],
        subject: `Nueva consulta: ${title} - ${nombre}`,
        html: htmlContent,
        replyTo: email,
      })

      // Enviar email de confirmación al cliente
      await resendClient.emails.send({
        from: `GL Agrimensura <noreply@${new URL(process.env.NEXT_PUBLIC_SITE_URL || 'example.com').hostname}>`,
        to: [email],
        subject: 'Recibimos tu consulta - GL Agrimensura',
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .cta { text-align: center; margin: 30px 0; }
              .button { display: inline-block; background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Gracias por tu consulta!</h1>
              </div>
              <div class="content">
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>Recibimos tu consulta sobre <strong>${title}</strong>.</p>
                <p>Nos pondremos en contacto contigo a la brevedad para brindarte toda la información que necesitás.</p>
                <div class="cta">
                  <a href="https://wa.me/5492214000000" class="button">📱 Chateá con nosotros</a>
                </div>
                <p>Saludos cordiales,<br><strong>Ing. Gabriel Lucero</strong><br>GL Agrimensura</p>
              </div>
            </div>
          </body>
        </html>
      `,
      })
    } else {
      // Si no hay cliente de email, devolver OK pero indicar que no se enviaron emails
      console.warn('Resend o CONTACT_EMAIL no configurados: los emails no fueron enviados.')
      return NextResponse.json({ success: true, warning: 'Emails no enviados (configurar RESEND_API_KEY y CONTACT_EMAIL)' })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 })
  }
}

function formatLabel(key: string): string {
  const labels: Record<string, string> = {
    direccion: '📍 Dirección',
    partido: '🏘️ Partido',
    ubicacion: '📍 Ubicación',
    superficie: '📏 Superficie',
    superficieTotal: '📏 Superficie Total',
    aniosPosesion: '⏳ Años de Posesión',
    lotesDeseados: '🏗️ Lotes Deseados',
    cantidadUnidades: '🏢 Cantidad de Unidades',
    tipoInmueble: '🏠 Tipo de Inmueble',
    tipoTrabajo: '🔧 Tipo de Trabajo',
    cantidadMojones: '📍 Cantidad de Mojones',
  }
  return labels[key] || key
}
