"use client";

import React, { createContext, useContext, useState } from "react";

type ModalType = "menu" | "reservations" | "events" | "contact" | "reviews" | null;

interface NavigationContextType {
    activeModal: ModalType;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = (modal: ModalType) => setActiveModal(modal);
    const closeModal = () => setActiveModal(null);

    return (
        <NavigationContext.Provider value={{ activeModal, openModal, closeModal }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
}
