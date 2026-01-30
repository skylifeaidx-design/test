import fs from 'fs/promises';
import path from 'path';
import { WinnerRecord } from '@/types';

// In packaged Electron, we receive the user data path via ENV or default to cwd
const BASE_PATH = process.env.USER_DATA_PATH || process.cwd();
const DATA_DIR = path.join(BASE_PATH, 'data');
const FILE_PATH = path.join(DATA_DIR, 'history.json');

async function ensureFile() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }

    try {
        await fs.access(FILE_PATH);
    } catch {
        await fs.writeFile(FILE_PATH, JSON.stringify([]));
    }
}

export async function saveGameResult(record: WinnerRecord) {
    await ensureFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    const history = JSON.parse(data) as WinnerRecord[];
    history.push(record);
    await fs.writeFile(FILE_PATH, JSON.stringify(history, null, 2));
}

export async function getGameHistory(): Promise<WinnerRecord[]> {
    await ensureFile();
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
}
