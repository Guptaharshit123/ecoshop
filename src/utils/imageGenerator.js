// Mock image URLs for different product categories
const mockImages = {
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1024',
  smartwatch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1024',
  speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1024',
  default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1024'
};

export const generateProductImage = async (prompt) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Extract category from prompt
  const category = Object.keys(mockImages).find(cat => 
    prompt.toLowerCase().includes(cat)
  ) || 'default';

  return mockImages[category];
};