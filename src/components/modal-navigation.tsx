"use client";

import { useNavigation } from "@/context/navigation-context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReservationForm } from "@/components/reservation-form";
import { ContactForm } from "@/components/contact-form";
import { PrivateEventForm } from "@/components/private-event-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ModalNavigation() {
    const { activeModal, closeModal } = useNavigation();
    const [events, setEvents] = useState<any[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(false);

    // Fetch published events when modal opens
    useEffect(() => {
        if (activeModal === "events") {
            setLoadingEvents(true);
            fetch("/api/events?status=PUBLISHED")
                .then(res => res.json())
                .then(data => setEvents(data))
                .catch(err => console.error("Failed to fetch events:", err))
                .finally(() => setLoadingEvents(false));
        }
    }, [activeModal]);

    const navItems = [
        { id: "menu", label: "Menu", title: "Our Menu", description: "Explore our Mediterranean delights." },
        { id: "reservations", label: "Reservations", title: "Book a Table", description: "Reserve your spot at Wizz Lagonisi." },
        { id: "events", label: "Events", title: "Events & Private Parties", description: "Join us for live music or book your own event." },
        { id: "reviews", label: "Reviews", title: "What Our Guests Say", description: "Read testimonials from our happy customers." },
        { id: "contact", label: "Contact", title: "Get in Touch", description: "We'd love to hear from you." },
    ];

    // Find the active item configuration
    const activeItem = navItems.find(item => item.id === activeModal);

    return (
        <Dialog open={!!activeModal} onOpenChange={(open) => !open && closeModal()}>
            <DialogContent className="sm:max-w-[425px] md:max-w-2xl bg-white dark:bg-zinc-950 max-h-[85vh] overflow-y-auto">
                {activeItem && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-orange-600">{activeItem.title}</DialogTitle>
                            <DialogDescription>{activeItem.description}</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            {activeModal === "menu" && (
                                <div className="grid gap-6">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg border-b pb-2">Starters</h3>
                                        <div className="flex justify-between">
                                            <span>Grilled Octopus</span>
                                            <span className="font-mono">18€</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Wizz Salad</span>
                                            <span className="font-mono">14€</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Beef Carpaccio</span>
                                            <span className="font-mono">19€</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg border-b pb-2">Mains</h3>
                                        <div className="flex justify-between">
                                            <span>Ribeye Steak</span>
                                            <span className="font-mono">38€</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Seafood Risotto</span>
                                            <span className="font-mono">24€</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Salmon Fillet</span>
                                            <span className="font-mono">22€</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeModal === "reservations" && <ReservationForm />}

                            {activeModal === "events" && (
                                <Tabs defaultValue="upcoming" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                                        <TabsTrigger value="private">Book Private Event</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="upcoming" className="space-y-4 mt-4">
                                        {loadingEvents ? (
                                            <p className="text-center text-zinc-500 py-8">Loading events...</p>
                                        ) : events.length === 0 ? (
                                            <p className="text-center text-zinc-500 py-8">No upcoming events at the moment. Check back soon!</p>
                                        ) : (
                                            events.map((event) => (
                                                <div key={event.id} className="border rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                                                    {event.imageUrl && (
                                                        <div className="w-full h-48 overflow-hidden">
                                                            <img
                                                                src={event.imageUrl}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="p-4">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="font-bold text-lg">{event.title}</h4>
                                                                <p className="text-sm text-orange-600 font-medium">
                                                                    {new Date(event.eventDate).toLocaleDateString()} • {event.time}
                                                                </p>
                                                            </div>
                                                            {event.price && (
                                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                                                                    {event.price}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {event.description && (
                                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                                {event.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </TabsContent>
                                    <TabsContent value="private" className="mt-4">
                                        <PrivateEventForm />
                                    </TabsContent>
                                </Tabs>
                            )}

                            {activeModal === "reviews" && (
                                <div className="py-4">
                                    <div className="max-w-xl mx-auto text-center space-y-6">
                                        {/* Testimonial Card */}
                                        <div className="flex flex-col items-center">
                                            <div className="relative mb-4">
                                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500/20">
                                                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                                                        MA
                                                    </div>
                                                </div>
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-600 rounded-full p-2">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="text-zinc-700 dark:text-zinc-300 text-lg italic mb-4">
                                                "Delightful menu, positive vibes and vegan choices as well! The atmosphere is amazing and the staff is incredibly friendly."
                                            </p>
                                            <div className="flex gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-orange-600 uppercase tracking-wide text-sm">Maria Antoniadou</p>
                                                <p className="text-zinc-500 text-sm">Food Blogger</p>
                                                <p className="text-zinc-400 text-xs mt-1">@maria_food_tales</p>
                                            </div>
                                        </div>

                                        {/* More testimonials note */}
                                        <div className="pt-4 border-t">
                                            <p className="text-sm text-zinc-500">Showing 1 of 47 reviews • 4.9 ★ average rating</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeModal === "contact" && <ContactForm />}
                        </div>
                        {/* PWA Back Button */}
                        <div className="mt-4 pt-4 border-t flex justify-start">
                            <Button
                                variant="ghost"
                                onClick={closeModal}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 pl-0 hover:bg-transparent"
                            >
                                ← Back to Home
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
