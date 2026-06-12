declare module 'html-to-docx' {
    interface HTMLToDocxOptions {
        table?: {
            row?: {
                cantSplit?: boolean
            }
        }
        footer?: boolean
        pageNumber?: boolean
        margins?: {
            top?: number
            right?: number
            bottom?: number
            left?: number
        }
        font?: string
        fontSize?: number
    }

    function htmlToDocx(
        html: string,
        headerHTMLString: string | null,
        options?: HTMLToDocxOptions
    ): Promise<Buffer | Blob>

    export = htmlToDocx
}
