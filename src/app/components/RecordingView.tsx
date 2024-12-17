'use client'
import { list } from "postcss";
import { List } from "postcss/lib/list";
import { useEffect, useState } from "react";
import { useRef } from "react";


declare global{
    interface Window{
        webkitSpeechRecognition:any;
    }
}


export default function RecordingView() {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    // const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");
    const recognitionRef = useRef<any>(null);

    // Audio file management
    const [audioURL, setAudioURL] = useState<any>(null); //the recorded piece
    let audioChunksRef = useRef<any>([]);
    let mediaRecorderRef = useRef<MediaRecorder>(null);

    const startRecording = async () => {
        //Audio file record
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = []; // Reset previous recordings

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const audioURL = URL.createObjectURL(audioBlob);
            setAudioURL(audioURL);
        };

        mediaRecorder.start();
        setIsRecording(true);

        //Transcribe Status: not being saved
        if (!window.webkitSpeechRecognition) {
            console.error("Speech Recognition API not supported in this browser.");
            return;
          }
        console.log("recording");
        
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous= true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.onresult = (event:any) => {
            const {transcript} = event.results[event.results.length -1][0];
            setTranscript(transcript);
            console.log(transcript);

        }
        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
        };
        recognitionRef.current.start();

        //other
        setIsRecording(true);

    };
    useEffect(()=>{
        return () => {
            if (recognitionRef.current){
                recognitionRef.current.stop();
            }
        }
    }, []);
    const stopRecording = () => {
        if (mediaRecorderRef.current){
            mediaRecorderRef.current.stop();
            // console.log(audioURL);
        }
        if (recognitionRef.current){
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    }
    const handleToggleRecording = ()=> {
        // setIsRecording(!isRecording);
        if (!isRecording){
            startRecording();
        } else{
            stopRecording();
        }
    }
    return (
        <div className = "flex items-center justify-center h-screen w-full">
            {/* Transcript Section */}
            <div className="w-full">
                {(isRecording || transcript) && (
                    <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
                        <div className=" flex-1 flex w-full justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {isRecording? "Recording" : "Recorded"}
                                </p>
                                <p className="text-sm">
                                    {isRecording? "Start speaking...": "Yay" }
                                </p>
                            </div>

                        </div>
                    {isRecording && (
                        <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse"/>
                    )}
                    </div>
                    
                )}
                
                {transcript && (
                    <div className=" border rounded-md p-2 mt-4">
                        <p className="mb-0">{transcript}</p>
                    </div>
                )}
                <audio src={audioURL} controls />
                {/* Button Section */}
                <div className="flex items-center w-full">
                    {isRecording ? (
                        <button onClick={handleToggleRecording} className=" rounded-full w-20 h-20 mt-10 m-auto flex flex-center items-center justify-center bg-red-400 hover:bg-red-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 20 20"><path fill="white" d="M6.75 3a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2Zm6.5 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2Z" /></svg>
                            
                        </button>
                    ) : (<button onClick={handleToggleRecording} className=" rounded-full w-20 h-20 mt-10 m-auto flex flex-center items-center justify-center bg-blue-400 hover:bg-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 56 56"><path fill="white" d="M36.543 26.852V12.109c0-5.414-3.492-9.187-8.531-9.187c-5.04 0-8.532 3.773-8.532 9.187v14.743c0 5.39 3.493 9.187 8.532 9.187s8.53-3.797 8.53-9.187m-3.54 0c0 3.468-1.991 5.695-4.991 5.695c-3 0-4.992-2.227-4.992-5.695V12.109c0-3.468 1.992-5.695 4.992-5.695s4.992 2.227 4.992 5.695ZM17.536 49.539a1.76 1.76 0 0 0-1.758 1.781a1.74 1.74 0 0 0 1.758 1.758h20.953a1.74 1.74 0 0 0 1.758-1.758a1.76 1.76 0 0 0-1.758-1.78H29.77v-5.462c8.953-.75 15-7.172 15-16.383v-4.757a1.74 1.74 0 0 0-1.758-1.758a1.76 1.76 0 0 0-1.782 1.758v4.617c0 7.992-5.203 13.289-13.218 13.289c-8.016 0-13.242-5.297-13.242-13.29v-4.616a1.74 1.74 0 0 0-1.758-1.758a1.76 1.76 0 0 0-1.782 1.758v4.757c0 9.211 6.07 15.633 15 16.383v5.461Z"/></svg>
                    </button>)
                }
                </div>
            </div>

        </div>
    );
}