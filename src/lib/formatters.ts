export const formatPrice = (price: number, status: 'rent' | 'sale'): string => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr${status === 'rent' ? '/mo' : ''}`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L${status === 'rent' ? '/mo' : ''}`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K${status === 'rent' ? '/mo' : ''}`;
  }
  return `₹${price.toLocaleString('en-IN')}${status === 'rent' ? '/mo' : ''}`;
};

export const formatArea = (area: number): string => {
  return `${area.toLocaleString('en-IN')} sq.ft`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getPropertyTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    plot: 'Plot',
    commercial: 'Commercial',
  };
  return labels[type] || type;
};

export const getStatusLabel = (status: string): string => {
  return status === 'rent' ? 'For Rent' : 'For Sale';
};
