"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  Utensils,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { restaurantConfig } from "@/config/restaurant";
import { formatFcfa } from "@/lib/currency";
import { buildOrderWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { OrderFormValues } from "@/types";
import { toast } from "sonner";

const orderSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Veuillez renseigner votre nom complet (au moins 2 caractères)."),
    phone: z
      .string()
      .trim()
      .min(8, "Veuillez saisir un numéro de téléphone valide (au moins 8 chiffres).")
      .regex(
        /^[+0-9\s()-]{8,20}$/,
        "Format de numéro invalide (utilisez uniquement chiffres, espaces ou +)."
      ),
    mode: z.enum(["pickup", "delivery"]),
    address: z.string().optional(),
    instructions: z.string().max(400, "Maximum 400 caractères.").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "delivery") {
      if (!data.address || data.address.trim().length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address"],
          message:
            "Veuillez préciser votre quartier ou adresse de livraison à Bobo-Dioulasso.",
        });
      }
    }
  });

type OrderStep = "cart" | "checkout" | "ready";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    totalItems,
    subtotalFcfa,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<OrderStep>("cart");
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [hasConfiguredWaNumber, setHasConfiguredWaNumber] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      mode: "pickup",
      address: "",
      instructions: "",
    },
  });

  const selectedMode = watch("mode");

  // Revenir à la vue panier si le panier devient vide
  useEffect(() => {
    if (items.length === 0 && step === "checkout") {
      setStep("cart");
    }
  }, [items.length, step]);

  // Réinitialiser l'étape à l'ouverture si l'utilisateur n'est plus sur l'écran final
  useEffect(() => {
    if (!isCartOpen && step === "ready") {
      setStep("cart");
    }
  }, [isCartOpen, step]);

  // Bloquer le scroll du body et écouter la touche Échap
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const onSubmitOrder = (values: OrderFormValues) => {
    if (items.length === 0) {
      toast.error("Votre panier est vide.");
      return;
    }

    const message = buildOrderWhatsAppMessage(values, items, subtotalFcfa);
    const { url, hasConfiguredNumber } = buildWhatsAppUrl(message);

    setGeneratedMessage(message);
    setGeneratedUrl(url);
    setHasConfiguredWaNumber(hasConfiguredNumber);
    setStep("ready");

    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      toast.success("Récapitulatif copié dans le presse-papiers.");
    } catch {
      toast.error("Impossible de copier automatiquement le texte.");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Arrière-plan assombri */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#29251F]/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Panneau latéral du panier (100dvh sur mobile pour éviter le masquage par la barre d'adresse) */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="relative z-10 flex h-[100dvh] w-full max-w-lg flex-col border-l border-[#E8E0D4] bg-[#FFFDF9] shadow-2xl"
          >
            {/* En-tête du panneau */}
            <div className="flex items-center justify-between border-b border-[#E8E0D4] bg-[#F8F5EF] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                {step !== "cart" && (
                  <button
                    type="button"
                    onClick={() =>
                      setStep(step === "ready" ? "checkout" : "cart")
                    }
                    aria-label="Retour à l'étape précédente"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E0D4] bg-[#FFFDF9] text-[#29251F] hover:border-[#C76A45] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}

                <div>
                  <h2
                    id="cart-drawer-title"
                    className="font-serif text-lg font-bold text-[#29251F] sm:text-xl"
                  >
                    {step === "cart" && "Votre panier gourmand"}
                    {step === "checkout" && "Finaliser la commande"}
                    {step === "ready" && "Envoi sur WhatsApp"}
                  </h2>
                  <p className="text-xs text-[#766E63]">
                    {totalItems} {totalItems > 1 ? "articles" : "article"} •{" "}
                    {formatFcfa(subtotalFcfa)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Fermer le panier"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E0D4] bg-[#FFFDF9] text-[#29251F] transition-colors hover:border-[#C76A45] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* ÉTAPE 1 : LISTE DES ARTICLES DU PANIER */}
            {step === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0E9DD] text-[#C76A45]">
                      <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-bold text-[#29251F]">
                      Votre panier est encore vide
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#766E63]">
                      Découvrez nos spécialités braisées, plats mijotés et
                      boissons naturelles pour composer votre repas.
                    </p>
                    <a
                      href="#carte"
                      onClick={closeCart}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C76A45] px-6 py-3 text-sm font-semibold text-[#FFFDF9] shadow-xs transition-colors hover:bg-[#AE5633]"
                    >
                      <span>Parcourir la carte</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                          Plats sélectionnés
                        </span>
                        <button
                          type="button"
                          onClick={clearCart}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#766E63] transition-colors hover:text-[#C76A45] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Tout vider</span>
                        </button>
                      </div>

                      <ul className="space-y-3.5">
                        {items.map(({ item, quantity }) => (
                          <li
                            key={item.id}
                            className="flex gap-3.5 rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF]/70 p-3 transition-colors hover:border-[#D6AA61]"
                          >
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F0E9DD]">
                              <Image
                                src={item.image}
                                alt={item.imageAlt}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col justify-between">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-serif text-sm font-bold text-[#29251F] sm:text-base">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-[#766E63]">
                                    {formatFcfa(item.price)} / unité
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  aria-label={`Retirer ${item.name} du panier`}
                                  className="rounded-full p-1 text-[#766E63] transition-colors hover:bg-[#F0E9DD] hover:text-[#C76A45] cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                                </button>
                              </div>

                              <div className="mt-2 flex items-center justify-between">
                                <div className="inline-flex items-center rounded-full border border-[#E8E0D4] bg-[#FFFDF9] p-0.5">
                                  <button
                                    type="button"
                                    onClick={() => decrementItem(item.id)}
                                    aria-label={`Diminuer la quantité de ${item.name}`}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#29251F] hover:bg-[#F0E9DD] cursor-pointer"
                                  >
                                    <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                  <span
                                    aria-live="polite"
                                    className="min-w-7 text-center text-xs font-bold text-[#29251F]"
                                  >
                                    {quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => incrementItem(item.id)}
                                    aria-label={`Augmenter la quantité de ${item.name}`}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#29251F] hover:bg-[#F0E9DD] cursor-pointer"
                                  >
                                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                </div>

                                <span className="font-sans text-sm font-bold text-[#C76A45]">
                                  {formatFcfa(item.price * quantity)}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pied de panier avec sous-total, total et bouton Poursuivre */}
                    <div className="border-t border-[#E8E0D4] bg-[#F8F5EF] p-5 sm:p-6">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between text-[#766E63]">
                          <span>Sous-total ({totalItems} art.)</span>
                          <span>{formatFcfa(subtotalFcfa)}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#766E63]">
                          <span>Frais de livraison éventuels</span>
                          <span>Confirmés avec le restaurant</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#E8E0D4] pt-2.5 text-base font-bold text-[#29251F]">
                          <span>Total des articles</span>
                          <span className="font-serif text-xl text-[#C76A45]">
                            {formatFcfa(subtotalFcfa)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep("checkout")}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#C76A45] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-md transition-all hover:bg-[#AE5633] active:scale-[0.99] cursor-pointer"
                      >
                        <span>Poursuivre la commande</span>
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* ÉTAPE 2 : FORMULAIRE DE FINALISATION DE COMMANDE */}
            {step === "checkout" && (
              <form
                onSubmit={handleSubmit(onSubmitOrder)}
                noValidate
                className="flex flex-1 flex-col overflow-hidden"
              >
                <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
                  <div className="rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] p-3.5 text-xs text-[#766E63]">
                    <p className="font-semibold text-[#29251F]">
                      Commande directe via WhatsApp
                    </p>
                    <p className="mt-0.5">
                      Aucun paiement en ligne n&apos;est demandé sur le site. Votre
                      récapitulatif sera prérempli sur WhatsApp pour confirmation
                      humaine avec le restaurant.
                    </p>
                  </div>

                  {/* Nom complet */}
                  <div>
                    <label
                      htmlFor="order-fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                    >
                      Nom complet <span className="text-[#C76A45]">*</span>
                    </label>
                    <input
                      id="order-fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Ex: Aminata Ouédraogo"
                      {...register("fullName")}
                      className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] px-4 py-3 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:outline-none sm:text-sm"
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

                  {/* Numéro de téléphone */}
                  <div>
                    <label
                      htmlFor="order-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                    >
                      Numéro de téléphone <span className="text-[#C76A45]">*</span>
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Ex: +226 70 00 00 00"
                      {...register("phone")}
                      className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] px-4 py-3 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:outline-none sm:text-sm"
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

                  {/* Mode de commande */}
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]">
                      Mode de commande <span className="text-[#C76A45]">*</span>
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <label
                        className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border p-3.5 text-sm font-medium transition-all ${
                          selectedMode === "pickup"
                            ? "border-[#C76A45] bg-[#C76A45]/10 text-[#29251F]"
                            : "border-[#E8E0D4] bg-[#FFFDF9] text-[#766E63]"
                        }`}
                      >
                        <input
                          type="radio"
                          value="pickup"
                          {...register("mode")}
                          className="sr-only"
                        />
                        <Utensils
                          className="h-4 w-4 text-[#C76A45]"
                          aria-hidden="true"
                        />
                        <span>À emporter</span>
                      </label>

                      {restaurantConfig.delivery.enabled && (
                        <label
                          className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border p-3.5 text-sm font-medium transition-all ${
                            selectedMode === "delivery"
                              ? "border-[#C76A45] bg-[#C76A45]/10 text-[#29251F]"
                              : "border-[#E8E0D4] bg-[#FFFDF9] text-[#766E63]"
                          }`}
                        >
                          <input
                            type="radio"
                            value="delivery"
                            {...register("mode")}
                            className="sr-only"
                          />
                          <Truck
                            className="h-4 w-4 text-[#C76A45]"
                            aria-hidden="true"
                          />
                          <span>Livraison</span>
                        </label>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-[#766E63]">
                      {selectedMode === "delivery"
                        ? restaurantConfig.delivery.deliveryNote
                        : restaurantConfig.delivery.pickupNote}
                    </p>
                  </div>

                  {/* Adresse si livraison */}
                  {selectedMode === "delivery" && (
                    <div>
                      <label
                        htmlFor="order-address"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                      >
                        Quartier / Adresse de livraison{" "}
                        <span className="text-[#C76A45]">*</span>
                      </label>
                      <input
                        id="order-address"
                        type="text"
                        placeholder="Ex: Secteur 5, près de la gare SITARAIL, Bobo-Dioulasso"
                        {...register("address")}
                        className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] px-4 py-3 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:outline-none sm:text-sm"
                      />
                      {errors.address && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#C76A45]"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.address.message}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Instructions particulières */}
                  <div>
                    <label
                      htmlFor="order-instructions"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#29251F]"
                    >
                      Instructions particulières (optionnel)
                    </label>
                    <textarea
                      id="order-instructions"
                      rows={3}
                      placeholder="Ex: Piment à part, heure souhaitée de retrait, précision d'accès..."
                      {...register("instructions")}
                      className="mt-1.5 w-full rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] px-4 py-2.5 text-base text-[#29251F] placeholder:text-[#766E63]/60 focus:border-[#C76A45] focus:outline-none sm:text-sm"
                    />
                    {errors.instructions && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#C76A45]"
                      >
                        {errors.instructions.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pied du formulaire de finalisation */}
                <div className="border-t border-[#E8E0D4] bg-[#F8F5EF] p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between text-sm font-bold text-[#29251F]">
                    <span>Total des articles ({totalItems})</span>
                    <span className="font-serif text-lg text-[#C76A45]">
                      {formatFcfa(subtotalFcfa)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-md transition-colors hover:bg-[#C76A45] cursor-pointer"
                  >
                    <MessageCircle
                      className="h-4 w-4 text-[#D6AA61]"
                      aria-hidden="true"
                    />
                    <span>Préparer et ouvrir sur WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

            {/* ÉTAPE 3 : CONFIRMATION D'OUVERTURE WHATSAPP (RAPPEL D'ENVOI MANUEL) */}
            {step === "ready" && (
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5 sm:p-6">
                <div className="space-y-4">
                  <div className="rounded-3xl border border-[#66764D]/40 bg-[#66764D]/10 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#66764D]"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#29251F]">
                          Votre message WhatsApp est prêt
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#29251F]">
                          <strong>Action requise :</strong> veuillez envoyer le
                          message prérempli dans WhatsApp. Votre commande ne sera
                          enregistrée qu&apos;après confirmation par l&apos;équipe
                          de KALO TABLE.
                        </p>
                      </div>
                    </div>
                  </div>

                  {!hasConfiguredWaNumber && (
                    <div className="rounded-2xl border border-[#D6AA61]/60 bg-[#FFFDF9] p-3.5 text-xs text-[#766E63]">
                      <p className="flex items-center gap-1.5 font-semibold text-[#29251F]">
                        <Sparkles
                          className="h-3.5 w-3.5 text-[#C76A45]"
                          aria-hidden="true"
                        />
                        Mode démonstration (sans numéro fictif)
                      </p>
                      <p className="mt-1">
                        Aucun numéro WhatsApp réel n&apos;étant configuré par
                        défaut, WhatsApp s&apos;ouvre en mode partage avec votre
                        message prérempli afin que vous puissiez tester le parcours.
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                        Aperçu du message généré
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#C76A45] hover:underline cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copier le texte</span>
                      </button>
                    </div>
                    <pre className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] p-4 font-sans text-xs leading-relaxed text-[#29251F]">
                      {generatedMessage}
                    </pre>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5 border-t border-[#E8E0D4] pt-4">
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C76A45] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-md transition-colors hover:bg-[#AE5633]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Ouvrir WhatsApp avec ce message</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setStep("checkout")}
                    className="w-full rounded-full border border-[#E8E0D4] bg-[#FFFDF9] px-5 py-2.5 text-xs font-semibold text-[#766E63] hover:text-[#29251F] cursor-pointer"
                  >
                    Modifier mes informations
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

