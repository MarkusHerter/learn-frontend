import type { Card, ChosenBox, FetchedCard } from "@/types";
import { chosenBox, chosenCard, isAuthenticated, token } from "./store";
import { activeBox } from "@/objects";

const url = import.meta.env.VITE_API_URL;

export async function signup(name: string, email: string, password: string) {
  let errorMessage: string | null;

  try {
    return await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then((response) => {
      if (!response.ok) {
        errorMessage = "Signup failed.";
        return { errorMessage: errorMessage };
      } else {
        response.json().then((response) => {
          token.value = response.accessToken;
        });
      }
    });
  } catch (error) {
    errorMessage = "An error occurred. Please try again.";
    return { errorMessage: errorMessage };
  }
}
export async function login(email: string, password: string) {
  let errorMessage: string | null;

  try {
    return await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(async (response) => {
      if (!response.ok) {
        errorMessage = "Login failed. Please check your email and password.";
        return { errorMessage: errorMessage };
      } else {
        const responseJson = await response.json();
        token.value = responseJson.accessToken;
      }
    });
  } catch (error) {
    errorMessage = "An error occurred. Please try again.";
    return { errorMessage: errorMessage };
  }
}
export async function checkToken() {
  isAuthenticated.value = await fetch(`${url}/checkToken`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  });
}
export async function fetchCardboxes() {
  return await fetch(`${url}/boxes`, {
    headers: {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export async function fetchCards(box: ChosenBox) {
  const cards = await fetch(`${url}/cards?BoxId=` + box.id, {
    headers: {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const result = await response.json();
    return result.map((item: FetchedCard) => {
      return [item.front, item.back, item.pocket, item.lastTimePicked, item.id];
    });
  });
  activeBox.id = box.id;
  activeBox.topic = box.topic;
  activeBox.pairs = cards;
  return activeBox;
}

export async function changeProgress(card: Card) {
  const payload = { cardId: card[4], pocket: card[2], lastTimePicked: card[3] };
  return await fetch(`${url}/progress`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    return response.json();
  });
}

export async function updateCard() {
  return await fetch(`${url}/cards`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CardId: chosenCard.value[4],
      front: chosenCard.value[0],
      back: chosenCard.value[1],
    }),
  }).then(async (response) => {
    if (!response.ok) {
      return { answer: null, error: true };
    }
    const answer = await response.json();
    changeProgress(chosenCard.value);
    return { answer: answer, error: false };
  });
}

export async function saveNewCard() {
  return await fetch(`${url}/cards`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token.value,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BoxId: chosenBox.value.id,
      front: chosenCard.value[0],
      back: chosenCard.value[1],
    }),
  }).then(async (response) => {
    if (!response.ok) {
      const answer = null;
      const error = true;
      return { answer, error };
    }
    const answer = await response.json();
    chosenCard.value[4] = answer.id;
    changeProgress(chosenCard.value);
    const error = false;
    return { answer, error };
  });
}
