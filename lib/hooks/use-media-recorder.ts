'use client'

import { useState, useCallback, useRef } from 'react'

export function useMediaRecorder() {
    const [isRecording, setIsRecording] = useState(false)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [mediaBlob, setMediaBlob] = useState<Blob | null>(null)
    const [mediaUrl, setMediaUrl] = useState<string | null>(null)
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const chunks = useRef<Blob[]>([])

    const startRecording = useCallback(async (mode: 'audio' | 'video' = 'video') => {
        try {
            const constraints = {
                audio: true,
                video: mode === 'video' ? { facingMode: 'user' } : false
            }
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
            setStream(mediaStream)
            
            const recorder = new MediaRecorder(mediaStream)
            mediaRecorder.current = recorder
            chunks.current = []

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data)
                }
            }

            recorder.onstop = () => {
                const blob = new Blob(chunks.current, { type: mode === 'video' ? 'video/webm' : 'audio/webm' })
                setMediaBlob(blob)
                setMediaUrl(URL.createObjectURL(blob))
            }

            recorder.start()
            setIsRecording(true)
        } catch (err) {
            console.error('Error starting media recording:', err)
            throw err
        }
    }, [])

    const stopRecording = useCallback(() => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop()
            setIsRecording(false)
            
            // Stop all tracks in the stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
                setStream(null)
            }
        }
    }, [isRecording, stream])

    return {
        isRecording,
        stream,
        mediaBlob,
        mediaUrl,
        startRecording,
        stopRecording
    }
}
