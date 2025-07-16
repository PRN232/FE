// {
//   "success": true,
//   "data": [
//     {
//       "id": 1,
//       "name": "Paracetamol 500mg",
//       "type": "PainRelief",
//       "description": "Giảm đau, hạ sốt",
//       "stockQuantity": 300,
//       "expiryDate": "2027-07-13T07:42:57.5840425",
//       "storageInstructions": "Nơi khô ráo",
//       "isExpired": false,
//       "isLowStock": false,
//       "daysToExpiry": 726
//     },

export interface Medication {
    id: number;
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
    isExpired: boolean;
    isLowStock: boolean;
    daysToExpiry: number;
}
export interface CreateMedicationDto {
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
}
export interface UpdateMedicationDto {
//     {
//   "name": "Rocket 24h",
//   "type": "Enhance Stamina",
//   "description": "Tăng cường sinh lực",
//   "stockQuantity": 16,
//   "expiryDate": "2726-07-06T23:42:58.9380195",
//   "storageInstructions": "Tránh tiếp xúc với không khí"
// }
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}