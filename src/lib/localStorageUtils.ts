export function saveToLocalStorage<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  
  export function loadFromLocalStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
  
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }

    const drawsRaw = localStorage.getItem("draws");
    if (drawsRaw) {
      const draws = JSON.parse(drawsRaw) as { id: string }[];
      const found = draws.find((draw) => draw.id === key);
      return found ? (found as T) : null;
    }
  
    return null;
  }
  
  export function removeFromLocalStorage(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
  