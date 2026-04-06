"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  destination: z.string().min(1, "Please select a destination"),
  message: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

export function ReservationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Booking Data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      reset();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-background border border-white/10 p-8 md:p-12 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-12 flex flex-col items-center">
                <CheckCircle2 className="text-accent mb-6" size={64} />
                <h2 className="text-3xl font-serif tracking-widest uppercase mb-4">Request Received</h2>
                <p className="text-gray-400 text-sm font-light">
                  A private curator will contact you within 24 hours to begin your journey.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h2 className="text-xs uppercase tracking-[0.4em] text-accent font-medium mb-4">Reservation</h2>
                  <h1 className="text-3xl font-serif tracking-widest uppercase">Request Access</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Full Name"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-accent outline-none transition-colors placeholder:text-white/20"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-widest">{errors.name.message}</p>}
                  </div>

                  <div>
                    <input
                      {...register("email")}
                      placeholder="Email Address"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-accent outline-none transition-colors placeholder:text-white/20"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-widest">{errors.email.message}</p>}
                  </div>

                  <div>
                    <select
                      {...register("destination")}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-accent outline-none transition-colors text-white/50 focus:text-white"
                    >
                      <option value="" className="bg-background">Select Destination</option>
                      <option value="maldives" className="bg-background">Maldives</option>
                      <option value="seychelles" className="bg-background">Seychelles</option>
                      <option value="amalfi" className="bg-background">Amalfi Coast</option>
                      <option value="borabora" className="bg-background">Bora Bora</option>
                    </select>
                    {errors.destination && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-widest">{errors.destination.message}</p>}
                  </div>

                  <div>
                    <textarea
                      {...register("message")}
                      placeholder="Special Requirements (Optional)"
                      rows={3}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-accent outline-none transition-colors placeholder:text-white/20 resize-none"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent text-background font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <span>Submit Request</span>}
                  </button>
                </form>

                <p className="mt-8 text-[9px] text-center text-white/30 uppercase tracking-[0.2em]">
                  Secure encrypted transmission. Guaranteed privacy.
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
