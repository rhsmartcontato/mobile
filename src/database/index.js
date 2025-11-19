import * as SQLite from 'expo-sqlite';
import { initializeDatabase } from './initializeDatabase';

export async function openDatabase() {
    const db = await SQLite.openDatabaseAsync("data.db");
    await initializeDatabase(db); // ← ESSA LINHA PRECISA EXISTIR
    return db;
}
