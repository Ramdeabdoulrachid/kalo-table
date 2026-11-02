"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Info,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { restaurantConfig } from "@/config/restaurant";
import {
  formatFrenchTime,
  getDayIndexFromIsoDate,
  getOuagadougouDateTime,
  getScheduleForDayIndex,
  validateReservationDateTime,
} from "@/lib/opening-hours";
import {
  buildReservationWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import { ReservationFormValues } from "@/types";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { toast } from "sonner";

const reservationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Veuillez indiquer votre nom complet (minimum 2 caractères)."),
    phone: z
      .string()
      .trim()
      .min(8, "Veuillez indiquer un numéro de téléphone valide.")
      .regex(
        /^[+0-9\s()-]{8,20}$/,
        "Format de téléphone invalide (chiffres, espaces ou + uniquement)."
      ),
    date: z.string().min(1, "Veuillez choisir une date de réservation."),
    time: z.string().min(1, "Veuillez choisir une heure souhaitée."),
    guests: z.coerce
      .number({
        invalid_type_error: "Veuillez saisir un nombre de convives valide.",
      })
      .int("Le nombre de personnes doit être un nombre entier.")
      .min(
        1,
        "Le nombre de personnes doit être d'au moins 1 convive (pas de valeur nulle ou négative)."
      )
      .max(
        restaurantConfig.reservation.maxGuestsPerOnlineRequest,
        `Pour plus de ${restaurantConfig.reservation.maxGuestsPerOnlineRequest} convives, veuillez nous contacter directement.`
      ),
    notes: z.string().max(400, "Maximum 400 caractères.").optional(),
  })
  .superRefine((data, ctx) => {
    const check = validateReservationDateTime(data.date, data.time);
    if (!check.valid && check.errorMessage) {
      // Attacher l'erreur au champ concerné (date ou heure)
      const isDateError =
        check.errorMessage.includes("date") ||
        check.errorMessage.includes("fermé");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [isDateError ? "date" : "time"],
        message: check.errorMessage,
      });
    }
  });

const SUGGESTED_SLOTS = ["12:00", "12:30", "13:30", "19:00", "20:00", "21:00"];

export function ReservationSection() {
  const [minDateIso, setMinDateIso] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<{
    message: string;
    url: string;
    hasConfiguredNumber: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      date: "",
      time: "19:30",
      guests: 2,
      notes: "",
    },
  });

  // Initialiser une date par défaut valide dans le fuseau Africa/Ouagadougou
  useEffect(() => {
    const ouaga = getOuagadougouDateTime(new Date());
    setMinDateIso(ouaga.isoDate);

    // Chercher le prochain jour ouvert (aujourd'hui ou les jours suivants)
    const baseDate = new Date(
      Date.UTC(ouaga.year, ouaga.month - 1, ouaga.day, 12, 0, 0)
    );
    for (let offset = 0; offset <= 7; offset++) {
      const candidate = new Date(baseDate.getTime() + offset * 86_400_000);
      const dayIdx = candidate.getUTCDay();
      const sched = getScheduleForDayIndex(dayIdx);
      if (!sched.isOpen) continue;

      const iso = candidate.toISOString().slice(0, 10);
      if (offset === 0 && ouaga.hour >= 21) {
        continue;
      }
      setValue("date", iso, { shouldValidate: false });
      break;
    }
  }, [setValue]);

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const selectedDaySchedule = React.useMemo(() => {
    if (!selectedDate) return null;
    const dayIdx = getDayIndexFromIsoDate(selectedDate);
    if (dayIdx === null) return null;
    return getScheduleForDayIndex(dayIdx);
  }, [selectedDate]);

  const onSubmitReservation = (values: ReservationFormValues) => {
    const message = buildReservationWhatsAppMessage(values);
    const { url, hasConfiguredNumber } = buildWhatsAppUrl(message);

    setSubmittedData({ message, url, hasConfiguredNumber });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyReservation = async () => {
    if (!submittedData) return;
    try {
      await navigator.clipboard.writeText(submittedData.message);
      toast.success("Demande de réservation copiée dans le presse-papiers.");
    } catch {
      toast.error("Impossible de copier automatiquement.");
    }
  };

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-[#29251F] py-20 text-[#F8F5EF] sm:py-28"
    >
      {/* Motifs lumineux subtils */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-10 h-96 w-96 rounded-full bg-[#C76A45]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#D6AA61]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Colonne gauche : Présentation & Informations sur la réservation (5 colonnes) */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D6AA61]/30 bg-[#FFFDF9]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6AA61]">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Réservation de table
              </span>

              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#FFFDF9] sm:text-4xl lg:text-[2.6rem]">
                Préparez votre venue chez KALO TABLE.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#E8E0D4]/85">
                En couple, en famille ou pour un repas entre amis à
                Bobo-Dioulasso, transmettez-nous votre demande en quelques
                secondes. Notre équipe vous répond rapidement sur WhatsApp pour
                confirmer votre table.
              </p>

              {/* Rappel horaires d'accueil */}
              <div className="mt-8 rounded-3xl border border-[#FFFDF9]/15 bg-[#FFFDF9]/5 p-6 backdrop-blur-xs">
                <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-[#D6AA61]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>Horaires d&apos;accueil (démo)</span>
                </h3>
                <ul className="mt-3 space-y-2 text-xs text-[#F0E9DD]/90 sm:text-sm">
                  <li className="flex justify-between border-b border-[#FFFDF9]/10 pb-1.5">
                    <span>Mardi – Jeudi</span>
                    <span className="font-semibold text-[#FFFDF9]">
                      11h30 – 22h30
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-[#FFFDF9]/10 pb-1.5">
                    <span>Vendredi – Samedi</span>
                    <span className="font-semibold text-[#FFFDF9]">
                      11h30 – 23h00
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-[#FFFDF9]/10 pb-1.5">
                    <span>Dimanche</span>
                    <span className="font-semibold text-[#FFFDF9]">
                      12h00 – 22h00
                    </span>
                  </li>
                  <li className="flex justify-between text-[#D6AA61]">
                    <span>Lundi</span>
                    <span>Fermé (repos hebdomadaire)</span>
                  </li>
                </ul>
              </div>

              {/* Avertissement honnête sur la confirmation humaine */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#D6AA61]/30 bg-[#D6AA61]/10 p-4 text-xs leading-relaxed text-[#F0E9DD]">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#D6AA61]"
                  aria-hidden="true"
                />
                <p>
                  <strong>Important :</strong> L&apos;envoi de ce formulaire
                  génère une demande sur WhatsApp et ne constitue pas une
                  réservation automatiquement confirmée. Votre table vous est
                  réservée dès réception de la confirmation du restaurant.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Colonne droite : Formulaire de demande de réservation (7 colonnes) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="rounded-[2rem] border border-[#E8E0D4] bg-[#FFFDF9] p-6 text-[#29251F] shadow-2xl sm:p-9">
                {!submittedData ? (
                  <form
                    onSubmit={handleSubmit(onSubmitReservation)}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="border-b border-[#E8E0D4] pb-4">
                      <h3 className="font-serif text-2xl font-bold text-[#29251F]">
                        Demande de réservation
                      </h3>
                      <p className="mt-1 text-xs text-[#766E63] sm:text-sm">
                        Tous les champs marqués d&apos;un astérisque (*) sont
                        obligatoires.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Nom complet */}
                      <div>
                        <label
                          htmlFor="res-fullName"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                        >
                          Nom complet <span className="text-[#C76A45]">*</span>
                        </label>
                        <input
                          id="res-fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="Ex: Ibrahim Sanou"
                          {...register("fullName")}
                          className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] px-4 py-3 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
                        />
                        {errors.fullName && (
                          <p
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#C76A45]"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{errors.fullName.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label
                          htmlFor="res-phone"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                        >
                          Téléphone <span className="text-[#C76A45]">*</span>
                        </label>
                        <input
                          id="res-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="Ex: +226 76 00 00 00"
                          {...register("phone")}
                          className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] px-4 py-3 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
                        />
                        {errors.phone && (
                          <p
                            role="alert"
                            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#C76A45]"
                          >
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{errors.phone.message}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      {/* Date */}
                      <div>
                        <label
                          htmlFor="res-date"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                        >
                          Date souhaitée <span className="text-[#C76A45]">*</span>
                        </label>
                        <input
                          id="res-date"
                          type="date"
                          min={minDateIso || undefined}
                          {...register("date")}
                          className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] px-3.5 py-3 text-base text-[#29251F] focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
                        />
                        {selectedDaySchedule && (
                          <p className="mt-1 text-[11px] text-[#766E63]">
                            {selectedDaySchedule.isOpen
                              ? `${selectedDaySchedule.dayName} : ${formatFrenchTime(selectedDaySchedule.openTime)} – ${formatFrenchTime(selectedDaySchedule.closeTime)}`
                              : `${selectedDaySchedule.dayName} : Fermé`}
                          </p>
                        )}
                        {errors.date && (
                          <p
                            role="alert"
                            className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[#C76A45]"
                          >
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{errors.date.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Heure souhaitée */}
                      <div>
                        <label
                          htmlFor="res-time"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                        >
                          Heure souhaitée <span className="text-[#C76A45]">*</span>
                        </label>
                        <input
                          id="res-time"
                          type="time"
                          step={900}
                          {...register("time")}
                          className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] px-3.5 py-3 text-base text-[#29251F] focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
                        />
                        {errors.time && (
                          <p
                            role="alert"
                            className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[#C76A45]"
                          >
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{errors.time.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Nombre de personnes */}
                      <div>
                        <label
                          htmlFor="res-guests"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                        >
                          Convives <span className="text-[#C76A45]">*</span>
                        </label>
                        <div className="relative mt-1.5">
                          <Users
                            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#766E63]"
                            aria-hidden="true"
                          />
                          <input
                            id="res-guests"
                            type="number"
                            min={1}
                            max={restaurantConfig.reservation.maxGuestsPerOnlineRequest}
                            {...register("guests")}
                            className="w-full rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] py-3 pr-4 pl-10 text-base text-[#29251F] focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
                          />
                        </div>
                        {errors.guests && (
                          <p
                            role="alert"
                            className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[#C76A45]"
                          >
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{errors.guests.message}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Raccourcis de créneaux horaires */}
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#766E63]">
                        Créneaux fréquents :
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {SUGGESTED_SLOTS.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() =>
                                setValue("time", slot, { shouldValidate: true })
                              }
                              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#C76A45] text-[#FFFDF9]"
                                  : "border border-[#E8E0D4] bg-[#F8F5EF] text-[#29251F] hover:border-[#C76A45]"
                              }`}
                            >
                              {formatFrenchTime(slot)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Demandes particulières */}
                    <div>
                      <label
                        htmlFor="res-notes"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                      >
                        Demandes particulières (optionnel)
                      </label>
                      <textarea
                        id="res-notes"
                        rows={3}
                        placeholder="Ex: Table en terrasse, anniversaire, chaise enfant, allergie..."
                        {...register("notes")}
                        className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] px-4 py-3 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
                      />
                      {errors.notes && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#C76A45]"
                        >
                          {errors.notes.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#C76A45] px-7 py-4 text-sm font-semibold text-[#FFFDF9] shadow-md transition-all hover:bg-[#AE5633] active:scale-[0.99] sm:text-base cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Demander ma réservation via WhatsApp</span>
                    </button>
                  </form>
                ) : (
                  /* Écran de récapitulatif après validation */
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-[#66764D]/40 bg-[#66764D]/10 p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-6 w-6 shrink-0 text-[#66764D]"
                          aria-hidden="true"
                        />
                        <div>
                          <h3 className="font-serif text-xl font-bold text-[#29251F]">
                            Demande prête à être envoyée sur WhatsApp
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-[#29251F] sm:text-sm">
                            Veuillez valider l&apos;envoi du message dans
                            WhatsApp.{" "}
                            <strong>
                              Votre réservation sera effective dès confirmation
                              par l&apos;équipe de KALO TABLE.
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    {!submittedData.hasConfiguredNumber && (
                      <div className="rounded-2xl border border-[#D6AA61]/60 bg-[#F8F5EF] p-3.5 text-xs text-[#766E63]">
                        <p className="flex items-center gap-1.5 font-semibold text-[#29251F]">
                          <Sparkles
                            className="h-3.5 w-3.5 text-[#C76A45]"
                            aria-hidden="true"
                          />
                          Mode démonstration (numéro configurable)
                        </p>
                        <p className="mt-0.5">
                          En mode démo, le message est ouvert dans WhatsApp sans
                          numéro fictif préattribué.
                        </p>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                          Message de réservation généré
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyReservation}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#C76A45] hover:underline cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Copier</span>
                        </button>
                      </div>
                      <pre className="mt-2 whitespace-pre-wrap rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] p-4 font-sans text-xs leading-relaxed text-[#29251F]">
                        {submittedData.message}
                      </pre>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={submittedData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C76A45] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-md transition-colors hover:bg-[#AE5633]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Ouvrir WhatsApp</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setSubmittedData(null)}
                        className="rounded-full border border-[#E8E0D4] bg-[#F8F5EF] px-6 py-3.5 text-xs font-semibold text-[#29251F] hover:border-[#C76A45] cursor-pointer"
                      >
                        Modifier la demande
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

