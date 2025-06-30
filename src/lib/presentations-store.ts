import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface PresentationMetadata {
  id: string;
  title: string;
  filePath: string;
  fileUrl: string;
  fileType: string;
  subject: string;
  topic: string;
  subtopic?: string;
  content: string;
  metadata?: {
    author?: string;
    creationDate?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

const STORE_PATH = path.join(process.cwd(), 'data');
const PRESENTATIONS_FILE = path.join(STORE_PATH, 'presentations.json');

// Initialize store
function initializeStore() {
  try {
    // Ensure the data directory exists
    if (!fs.existsSync(STORE_PATH)) {
      fs.mkdirSync(STORE_PATH, { recursive: true });
    }

    // Initialize empty store if it doesn't exist
    if (!fs.existsSync(PRESENTATIONS_FILE)) {
      fs.writeFileSync(PRESENTATIONS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Failed to initialize presentations store:', error);
    // Return gracefully - the error will be handled by the API routes
  }
}

// Initialize on module load
initializeStore();

/**
 * Reads all presentations from the store
 */
export async function getAllPresentations(): Promise<PresentationMetadata[]> {
  try {
    if (!fs.existsSync(PRESENTATIONS_FILE)) {
      return [];
    }
    const data = await fs.promises.readFile(PRESENTATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading presentations:', error);
    return [];
  }
}

/**
 * Gets a presentation by ID
 */
export async function getPresentationById(id: string): Promise<PresentationMetadata | null> {
  try {
    const presentations = await getAllPresentations();
    return presentations.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error getting presentation by ID:', error);
    return null;
  }
}

/**
 * Saves a new presentation to the store
 */
export async function savePresentationMetadata(presentation: Omit<PresentationMetadata, 'id' | 'createdAt' | 'updatedAt'>): Promise<PresentationMetadata> {
  try {
    const presentations = await getAllPresentations();
    
    const newPresentation: PresentationMetadata = {
      ...presentation,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    presentations.push(newPresentation);
    await fs.promises.writeFile(PRESENTATIONS_FILE, JSON.stringify(presentations, null, 2));
    
    return newPresentation;
  } catch (error) {
    console.error('Error saving presentation:', error);
    throw new Error('Failed to save presentation');
  }
}

/**
 * Updates an existing presentation in the store
 */
export async function updatePresentationMetadata(id: string, updates: Partial<PresentationMetadata>): Promise<PresentationMetadata | null> {
  try {
    const presentations = await getAllPresentations();
    const index = presentations.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    const updatedPresentation = {
      ...presentations[index],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    presentations[index] = updatedPresentation;
    await fs.promises.writeFile(PRESENTATIONS_FILE, JSON.stringify(presentations, null, 2));
    
    return updatedPresentation;
  } catch (error) {
    console.error('Error updating presentation:', error);
    return null;
  }
}

/**
 * Deletes a presentation from the store
 */
export async function deletePresentation(id: string): Promise<boolean> {
  try {
    const presentations = await getAllPresentations();
    const filteredPresentations = presentations.filter(p => p.id !== id);
    
    if (filteredPresentations.length === presentations.length) {
      return false;
    }
    
    await fs.promises.writeFile(PRESENTATIONS_FILE, JSON.stringify(filteredPresentations, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting presentation:', error);
    return false;
  }
} 