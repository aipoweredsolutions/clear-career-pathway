import mammoth from 'mammoth'

export class DOCXParser {
    static async parse(buffer: Buffer) {
        try {
            const result = await mammoth.extractRawText({ buffer })

            return {
                rawText: result.value,
                messages: result.messages
            }
        } catch (error) {
            console.error('DOCX Parse Error:', error)
            throw new Error('Failed to parse DOCX')
        }
    }
}
