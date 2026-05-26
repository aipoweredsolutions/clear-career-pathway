export const uploadToGoogleDrive = async (accessToken: string, fileBlob: Blob, filename: string, mimeType: string) => {
    const metadata = {
        name: filename,
        mimeType: mimeType,
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', fileBlob);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: form,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Drive Upload Error:', errorText);
        throw new Error('Failed to upload to Google Drive');
    }

    return response.json();
};
