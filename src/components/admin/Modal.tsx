"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl transform rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-black/5 animate-in zoom-in-95 fade-in duration-300">
                <div className="mb-8 flex items-center justify-between border-b border-slate-50 pb-6">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
