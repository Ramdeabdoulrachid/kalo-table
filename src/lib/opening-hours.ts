import { restaurantConfig } from "@/config/restaurant";
import { DaySchedule } from "@/types";

export interface OuagaDateTime {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  dayIndex: number; // 0 (Dim) - 6 (Sam)
  hour: number;
  minute: number;
  isoDate: string; // YYYY-MM-DD
  timeString: string; // HH:mm
}

export interface OpenStatusResult {
  isOpen: boolean;
  label: "Ouvert actuellement" | "Fermé actuellement";
  detail: string;
  todaySchedule: DaySchedule;
  localTimeFormatted: string;
}

/**
 * Convertit une chaîne "HH:mm" en nombre total de minutes depuis minuit.
 */
export function timeToMinutes(timeStr: string): number {
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = Number.parseInt(hoursStr || "0", 10);
  const minutes = Number.parseInt(minutesStr || "0", 10);
  return hours * 60 + minutes;
}

/**
 * Formate "11:30" en "11h30" pour un affichage francophone élégant.
 */
export function formatFrenchTime(timeStr: string): string {
  return timeStr.replace(":", "h");
}

/**
 * Récupère la date et l'heure actuelles dans le fuseau Africa/Ouagadougou (UTC+0).
 */
export function getOuagadougouDateTime(now: Date = new Date()): OuagaDateTime {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: restaurantConfig.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }

  const year = Number.parseInt(map.year, 10);
  const month = Number.parseInt(map.month, 10);
  const day = Number.parseInt(map.day, 10);
  const rawHour = Number.parseInt(map.hour, 10);
  const hour = rawHour === 24 ? 0 : rawHour;
  const minute = Number.parseInt(map.minute, 10);

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const dayIndex = weekdayMap[map.weekday] ?? now.getUTCDay();

  const isoDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  return {
    year,
    month,
    day,
    dayIndex,
    hour,
    minute,
    isoDate,
    timeString,
  };
}

/**
 * Retourne les horaires configurés pour un index de jour donné (0 = Dimanche ... 6 = Samedi).
 */
export function getScheduleForDayIndex(dayIndex: number): DaySchedule {
  const found = restaurantConfig.schedule.find((d) => d.dayIndex === dayIndex);
  if (found) return found;
  return restaurantConfig.schedule[0];
}

/**
 * Calcule dynamiquement si le restaurant est "Ouvert actuellement" ou "Fermé actuellement"
 * selon le fuseau horaire Africa/Ouagadougou.
 */
export function getRestaurantOpenStatus(now: Date = new Date()): OpenStatusResult {
  const ouaga = getOuagadougouDateTime(now);
  const todaySchedule = getScheduleForDayIndex(ouaga.dayIndex);
  const currentMinutes = ouaga.hour * 60 + ouaga.minute;
  const localTimeFormatted = `${String(ouaga.hour).padStart(2, "0")}h${String(ouaga.minute).padStart(2, "0")}`;

  if (!todaySchedule.isOpen) {
    return {
      isOpen: false,
      label: "Fermé actuellement",
      detail: `Fermé le ${todaySchedule.dayName.toLowerCase()} • Réouverture mardi dès 11h30`,
      todaySchedule,
      localTimeFormatted,
    };
  }

  const openMinutes = timeToMinutes(todaySchedule.openTime);
  const closeMinutes = timeToMinutes(todaySchedule.closeTime);

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpen: true,
      label: "Ouvert actuellement",
      detail: `Service en cours jusqu'à ${formatFrenchTime(todaySchedule.closeTime)} (heure de Bobo-Dioulasso)`,
      todaySchedule,
      localTimeFormatted,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      label: "Fermé actuellement",
      detail: `Ouverture aujourd'hui à ${formatFrenchTime(todaySchedule.openTime)}`,
      todaySchedule,
      localTimeFormatted,
    };
  }

  return {
    isOpen: false,
    label: "Fermé actuellement",
    detail: `Service terminé pour aujourd'hui (${formatFrenchTime(todaySchedule.openTime)} – ${formatFrenchTime(todaySchedule.closeTime)})`,
    todaySchedule,
    localTimeFormatted,
  };
}

/**
 * Détermine le jour de la semaine (0-6) pour une date au format YYYY-MM-DD.
 */
export function getDayIndexFromIsoDate(dateStr: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10) - 1;
  const day = Number.parseInt(match[3], 10);
  const d = new Date(Date.UTC(year, month, day, 12, 0, 0));
  if (Number.isNaN(d.getTime())) return null;
  return d.getUTCDay();
}

/**
 * Valide une date et une heure de réservation selon les règles du cahier des charges :
 * - Pas de date passée
 * - Pas de jour de fermeture (ex: Lundi)
 * - Pas d'horaire en dehors de la plage d'ouverture configurée
 */
export function validateReservationDateTime(
  dateStr: string,
  timeStr: string,
  now: Date = new Date()
): { valid: boolean; errorMessage?: string } {
  if (!dateStr) {
    return { valid: false, errorMessage: "Veuillez sélectionner une date." };
  }
  if (!timeStr) {
    return { valid: false, errorMessage: "Veuillez sélectionner une heure." };
  }

  const ouagaNow = getOuagadougouDateTime(now);

  if (dateStr < ouagaNow.isoDate) {
    return {
      valid: false,
      errorMessage: "La date choisie est déjà passée. Veuillez choisir aujourd'hui ou une date future.",
    };
  }

  const dayIndex = getDayIndexFromIsoDate(dateStr);
  if (dayIndex === null) {
    return { valid: false, errorMessage: "Format de date invalide." };
  }

  const daySchedule = getScheduleForDayIndex(dayIndex);
  if (!daySchedule.isOpen) {
    return {
      valid: false,
      errorMessage: `Le restaurant est fermé le ${daySchedule.dayName.toLowerCase()} (horaires de démonstration). Veuillez choisir un jour du mardi au dimanche.`,
    };
  }

  const requestedMinutes = timeToMinutes(timeStr);
  const openMinutes = timeToMinutes(daySchedule.openTime);
  const closeMinutes = timeToMinutes(daySchedule.closeTime);

  if (requestedMinutes < openMinutes || requestedMinutes > closeMinutes) {
    return {
      valid: false,
      errorMessage: `Le ${daySchedule.dayName.toLowerCase()}, nos horaires d'accueil sont de ${formatFrenchTime(daySchedule.openTime)} à ${formatFrenchTime(daySchedule.closeTime)}.`,
    };
  }

  if (dateStr === ouagaNow.isoDate) {
    const nowMinutes = ouagaNow.hour * 60 + ouagaNow.minute;
    if (requestedMinutes <= nowMinutes) {
      return {
        valid: false,
        errorMessage: `Cet horaire (${formatFrenchTime(timeStr)}) est déjà passé pour aujourd'hui (il est ${String(ouagaNow.hour).padStart(2, "0")}h${String(ouagaNow.minute).padStart(2, "0")} à Bobo-Dioulasso).`,
      };
    }
  }

  return { valid: true };
}

/**
 * Génère la liste des créneaux horaires (toutes les 30 minutes) pour un jour donné.
 */
export function getTimeSlotsForDate(dateStr?: string): string[] {
  let openTime = "11:30";
  let closeTime = "22:00";

  if (dateStr) {
    const dayIndex = getDayIndexFromIsoDate(dateStr);
    if (dayIndex !== null) {
      const schedule = getScheduleForDayIndex(dayIndex);
      if (!schedule.isOpen) {
        return [];
      }
      openTime = schedule.openTime;
      closeTime = schedule.closeTime;
    }
  }

  const start = timeToMinutes(openTime);
  // Dernière réservation 30 min avant la fermeture
  const end = Math.max(start, timeToMinutes(closeTime) - 30);
  const step = restaurantConfig.reservation.slotIntervalMinutes || 30;

  const slots: string[] = [];
  for (let mins = start; mins <= end; mins += step) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

