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


export async function updateHabit(id: number, boolean: boolean): Promise<Response> {
  const response = await fetch(`http://localhost:3000/habits/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done: boolean }),
  });
  return response;
}

export async function getHabits() {
  const habits = await fetch('http://localhost:3000/habits')
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return habits;
}