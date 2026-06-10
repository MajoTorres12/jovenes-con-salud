import { Router } from 'express'
import ContactMessage from '../models/ContactMessage.js'

const router = Router()

// POST /api/contact — receive a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    const contactMsg = await ContactMessage.create({ name, email, subject, message })

    res.status(201).json({
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
      id: contactMsg.id,
    })
  } catch (error) {
    console.error('Error guardando mensaje de contacto:', error)
    res.status(500).json({ error: 'Error al enviar el mensaje' })
  }
})

export default router
