export interface Note {
  header?: string;
  text: string;
}

export interface StatusBox {
  title: string;
  options?: string;
  wide?: boolean;
}

export interface Card {
  name: string;
  portrait?: string;
  useFullscreenPortrait?: boolean;

  title?: string;
  subtitle?: string;

  notes?: Note[];
  quote?: string;

  status?: StatusBox[];
}

type Key = string | number | symbol;
type ParseErrorHandler = (type: string, property: Key, value: unknown) => void;

function tryParse<K extends Key, T>(
  guard: (
    obj: { [key in K]?: unknown },
    key: K,
    error: ParseErrorHandler
  ) => obj is { [key in K]: T },
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): T | undefined;
function tryParse<K extends Key, T, U extends T>(
  guard: (
    obj: { [key in K]?: unknown },
    key: K,
    error: ParseErrorHandler
  ) => obj is { [key in K]: T },
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler,
  fallback: U
): T;
function tryParse<K extends Key, T, U extends T>(
  guard: (
    obj: { [key in K]?: unknown },
    key: K,
    error: ParseErrorHandler
  ) => obj is { [key in K]: T },
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler,
  fallback?: U
): T | undefined {
  return guard(obj, key, error) ? obj[key] : fallback;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isAny<K extends Key>(obj: {
  [key in K]?: unknown;
}): obj is { [key in K]: any } {
  return true;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function isOptional<K extends Key, T>(
  baseType: <K extends Key>(
    obj: { [key in K]?: unknown },
    key: K,
    error: ParseErrorHandler
  ) => obj is { [key in K]: T },
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]?: T } {
  return obj[key] === undefined || baseType(obj, key, error);
}

function isObject<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: object } {
  const input = obj[key];
  if (typeof input === "object") {
    return true;
  }
  error("object", key, input);
  return false;
}

function isArrayOf<K extends Key, T>(
  baseType: <K extends Key>(
    obj: { [key in K]?: unknown },
    key: K,
    error: ParseErrorHandler
  ) => obj is { [key in K]: T },
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: Array<T> } {
  const input = obj[key];
  if (
    typeof input === "object" &&
    Array.isArray(input) &&
    input.every((_, idx) => baseType(input, idx, error))
  ) {
    return true;
  }
  error("array", key, input);
  return false;
}

function isString<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: string } {
  const input = obj[key];
  if (typeof input === "string") {
    return true;
  }
  error("string", key, input);
  return false;
}

function isOptionalString<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: string | undefined } {
  return isOptional(isString, obj, key, error);
}

function isBoolean<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: boolean } {
  const input = obj[key];
  if (typeof input === "boolean") {
    return true;
  }
  error("boolean", key, input);
  return false;
}

function isOptionalBoolean<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: boolean | undefined } {
  return isOptional(isBoolean, obj, key, error);
}

function isNote<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: Note } {
  const input = obj[key];
  if (
    input &&
    typeof input === "object" &&
    isOptional(isString, input as Note, "header", error) &&
    isString(input as Note, "text", error)
  ) {
    return true;
  }
  error("Note", key, input);
  return false;
}

function isNoteArray<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: Array<Note> } {
  return isArrayOf(isNote, obj, key, error);
}

function isStatusBox<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: StatusBox } {
  const input = obj[key];
  if (
    input &&
    typeof input === "object" &&
    isString(input as StatusBox, "title", error) &&
    isOptional(isString, input as StatusBox, "options", error) &&
    isOptional(isBoolean, input as StatusBox, "wide", error)
  ) {
    return true;
  }
  error("StatusBox", key, input);
  return false;
}

function isStatusBoxArray<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: Array<StatusBox> } {
  return isArrayOf(isStatusBox, obj, key, error);
}

function isCard<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: Card } {
  const input = obj[key];
  if (
    input &&
    typeof input === "object" &&
    isString(input as Card, "name", error) &&
    isOptional(isString, input as Card, "portrait", error) &&
    isOptional(isBoolean, input as Card, "useFullscreenPortrait", error) &&
    isOptional(isString, input as Card, "title", error) &&
    isOptional(isString, input as Card, "subtitle", error) &&
    isOptional(isNoteArray, input as Card, "notes", error) &&
    isOptional(isString, input as Card, "quote", error) &&
    isOptional(isStatusBoxArray, input as Card, "status", error)
  ) {
    return true;
  }
  error("Card", key, input);
  return false;
}

function isCardArray<K extends Key>(
  obj: { [key in K]?: unknown },
  key: K,
  error: ParseErrorHandler
): obj is { [key in K]: Array<Card> } {
  return isArrayOf(isCard, obj, key, error);
}

function logTypeErr(type: string, key: Key, value: unknown) {
  console.error(
    `Unable to parse property ${String(
      key
    )} to type ${type}, unexpected value: `,
    value
  );
}

export function getCards(input: string | undefined | null): Card[] {
  const error = logTypeErr;
  const data: { data: object[] } = { data: [] };
  try {
    let parsed = { parsed: JSON.parse(input || "[]") };
    if (
      isObject(parsed, "parsed", error) &&
      !isArrayOf(isObject, parsed, "parsed", error)
    ) {
      parsed = { parsed: [parsed.parsed] };
    }
    if (!isArrayOf(isObject, parsed, "parsed", error)) {
      throw new Error("Unexpected root input format encountered");
    }
    data.data = parsed.parsed;
  } catch (err) {
    console.error("Error parsing cards:", err);
    return [];
  }

  const cards: { cards: Card[] } = { cards: [] };
  data.data.forEach((item) => {
    const card: { card: Card } = {
      card: {
        name: tryParse(isString, item, "name", error, "New Character"),
        portrait: tryParse(isOptionalString, item, "portrait", error),
        useFullscreenPortrait: tryParse(
          isOptionalBoolean,
          item,
          "useFullscreenPortrait",
          error
        ),
        title: tryParse(isOptionalString, item, "title", error),
        subtitle: tryParse(isOptionalString, item, "subtitle", error),
        quote: tryParse(isOptionalString, item, "quote", error),
      },
    };
    if (isArrayOf(isAny, item, "notes", error)) {
      const notes = { notes: [] as Note[] };
      item.notes.forEach((n) => {
        const note: { note: Partial<Note> } = {
          note: {
            header: tryParse(isOptionalString, n, "header", error),
            text: tryParse(isString, n, "text", error),
          },
        };
        if (isNote(note, "note", error)) {
          notes.notes.push(note.note);
        }
      });
      if (isNoteArray(notes, "notes", error)) {
        card.card.notes = notes.notes;
      }
    }

    if (isArrayOf(isAny, item, "status", error)) {
      const statuses = { statuses: [] as StatusBox[] };
      item.status.forEach((n) => {
        const status: { status: Partial<StatusBox> } = {
          status: {
            title: tryParse(isString, n, "title", error),
            options: tryParse(isOptionalString, n, "options", error),
            wide: tryParse(isOptionalBoolean, n, "wide", error),
          },
        };
        if (isStatusBox(status, "status", error)) {
          statuses.statuses.push(status.status);
        }
      });
      if (isStatusBoxArray(statuses, "statuses", error)) {
        card.card.status = statuses.statuses;
      }
    }

    if (isCard(card, "card", error)) {
      cards.cards.push(card.card);
    }
  });

  return isCardArray(cards, "cards", error) ? cards.cards : [];
}
