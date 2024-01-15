import path from "path";
import fs from "fs/promises";

const databasePath = path.join(process.cwd(), "data/database.json");


const readDataBase = async () => {
  const data = await fs.readFile(databasePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

export const getHabits = async () => {
  const database = await readDataBase();
  return database;
}

export const getTodayHabits = async () => {
  const habits = await getHabits();
  const date = new Date().toISOString().slice(0, 10);
  const todayHabits = habits.map(habit => {
    return {
      id: habit.id,
      title: habit.title,
      done: habit.daysDone[date] || false
    }
  })
  return todayHabits
}

export const updateHabit = async (id, done) => {

  if (Number.isNaN(Number(id))) {
    throw new Error('habit not found');
  }

  const habits = await getHabits();
  const habit = habits.find(habit => habit.id === Number(id));

  if (!habit) {
    throw new Error('habit not found');
  }

  const date = new Date().toISOString().slice(0, 10);
  habit.daysDone[date] = done;
  console.log(habit);
  await fs.writeFile(databasePath, JSON.stringify(habits, null, 2));

}


export const addHabit = async (title) => {
  const habits = await getHabits();
  // récupérer tous les id dans un tableau
  const habitIds = habits.map(habit => habit.id);
  // récupérer le dernier id et ajouter 1
  const id = (habitIds[habitIds.length - 1] ?? 0) + 1
  // créer un nouvel objet habit
  const newHabit = {
    id: id,
    title: title,
    daysDone: {}
  }
  await fs.writeFile(databasePath, JSON.stringify([...habits, newHabit], null, 2));
}

