async function getData(url: string) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return [...data];
}

export async function getAllHabits() {
  const habits = await getData('http://localhost:3000/habits');
  return habits;
}
export async function getTodayHabits() {
  const habits = await getData('http://localhost:3000/habits/today');
  return habits;
}

export async function createHabit(title: string): Promise<Response> {
  const response = await fetch('http://localhost:3000/habits/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  return response;
}

export async function updateHabit(
  id: number,
  boolean: boolean
): Promise<Response> {
  const response = await fetch(`http://localhost:3000/habits/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done: boolean }),
  });
  return response;
}
