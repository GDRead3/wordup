interface WordDefinition {
    word: string;
    meanings: Array<{
        definitions: Array<{
            definition: string;
        }>;
    }>;
} 

export const wordService = {
    getRandomWord: async (): Promise<string> => {
      try {
        const response = await fetch('https://random-word-api.vercel.app/api?words=1');
        const data = await response.json();
        return data[0].toUpperCase();
      } catch (error) {
        console.error('Error fetching random word:', error);
        throw error;
      }
    },
  
    getWordDefinition: async (word: string): Promise<string[]> => {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data: WordDefinition[] = await response.json();
        
        // Extract all definitions
        const definitions = data[0]?.meanings.flatMap(meaning => 
          meaning.definitions.map(def => def.definition)
        );
        
        return definitions || ['No definition available'];
      } catch (error) {
        console.error('Error fetching word definition:', error);
        return ['Definition not found'];
      }
    }
  };