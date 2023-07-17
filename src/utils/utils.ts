export const calculateDistance= (lat1:number, lon1:number, lat2:number, lon2:number)=>{
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
  return d.toFixed(1);
}

function deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }

export const parseDMS = (dms:string)=>{
    const trimmed = dms.trim()
    const separators = ['°', "'", '"', ' '];
    const parts = trimmed.split(new RegExp(`[${separators.join('')}]`, 'g'));
    const degrees = Number(parts[0]);
    const minutes = Number(parts[1]);
    const seconds = Number(parts[2]);
    let decimal = degrees + (minutes / 60) + (seconds / 3600);
    if (parts.includes('S') || parts.includes('W')) {
        decimal = -decimal;
    }
  return decimal;
}

export const calculateReview = (reviews:Array)=>{
    if (!Array.isArray(reviews)) {
        throw new Error('Input is not an array');
      }
    
      if (reviews.length === 0) {
        return 0;
      }
    
      const sum = reviews.reduce((acc, { stars }) => acc + stars, 0);
    
      return sum / reviews.length;
}