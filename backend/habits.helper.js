import path from "path";
import fs from "fs/promises";

const databasePath = path.join(process.cwd(), "data/database.json");

/**
 * Reads the database file and returns the parsed JSON data.
 *
 * @returns {Promise<Object>} A promise that resolves with the parsed JSON data.
 * @throws {Error} If there is an error reading or parsing the file.
 */
const readDataBase = async () => {
  const data = await fs.readFile(databasePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
}

/**
 * Gets the list of habits from the database.
 *
 * @returns {Promise<Array>} A promise that resolves with the list of habits.
 * @throws {Error} If there is an error reading the database.
 */
export const getHabits = async () => {
  const database = await readDataBase();
  return database;
}

/**
 * Gets the list of habits for today from the database.
 *
 * Each habit is returned as an object with `id`, `title`, and `done` properties.
 * The `done` property is `true` if the habit is done for today, and `false` otherwise.
 *
 * @returns {Promise<Array>} A promise that resolves with the list of habits for today.
 * @throws {Error} If there is an error reading the database.
 */
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

/**
 * Updates a habit's done status for the current date.
 *
 * @param {number|string} id - The ID of the habit to update.
 * @param {boolean} done - The done status to set for the current date.
 * @returns {Promise<void>} A promise that resolves when the habit has been updated.
 * @throws {Error} If the habit is not found or if there is an error writing to the database.
 */
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
 
  await fs.writeFile(databasePath, JSON.stringify(habits, null, 2));
}


/**
 * Adds a new habit to the list of habits.
 *
 * @param {string} title - The title of the habit to add.
 * @returns {Promise<void>} A promise that resolves when the habit has been added.
 * @throws {Error} If there is an error writing to the database.
 */
export const addHabit = async (title) => {

  const habits = await getHabits();
 
  const habitIds = habits.map(habit => habit.id);
 
  const id = (habitIds[habitIds.length - 1] ?? 0) + 1

  const newHabit = {
    id: id,
    title: title,
    daysDone: {}
  }
  await fs.writeFile(databasePath, JSON.stringify([...habits, newHabit], null, 2));
}

