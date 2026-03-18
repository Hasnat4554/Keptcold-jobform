export interface BusinessDetails {
  businessName: string;
  businessAddress: string;
  jobAddress?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  siteAccessHours: string; // either a preset option or 'Custom'
  // when custom is selected the following may be populated
  siteAccessFrom?: string;
  siteAccessUntil?: string;
}

export interface FaultDetails {
  equipmentType: string;
  faultDescription: string;
  photos: File[];
}

export type ServiceType = 'standard' | 'sameDay' | 'emergency';

export interface ServiceOption {
  id: ServiceType;
  name: string;
  price: number;
  color: string;
  availability: string;
  responseTime: string;
  hours: string;
}

export interface BookingData {
  businessDetails: BusinessDetails;
  faultDetails: FaultDetails;
  serviceType: ServiceType;
  totalPrice: number;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'standard',
    name: 'Standard Call-Out',
    price: 1.8,
    color: 'blue',
    availability: 'Next Available Appointment',
    responseTime: 'Mon-Fri',
    hours: '8 AM - 6 PM'
  },
  {
    id: 'sameDay',
    name: 'Same Day Service',
    price: 180,
    color: 'orange',
    availability: 'Visit Today',
    responseTime: 'Mon-Sun',
    hours: '8 AM - 6 PM'
  },
  {
    id: 'emergency',
    name: 'Emergency 4 Hour Response',
    price: 240,
    color: 'red',
    availability: '4-hour Arrival',
    responseTime: 'Mon-Sun',
    hours: '24/7 Service'
  }
];

export const EQUIPMENT_TYPES = [
  'Freezer',
  'Chiller',
  'Walk-in Chiller',
  'Walk-in Freezer',
  'Display Cabinet',
  'Ice Machine',
  'Cold Room',
  'Other'
];

export const ACCESS_HOURS_OPTIONS = [
  '24/7',
  '8am - 6pm',
  '6am - 10pm',
  'Night access only',
  'Custom'
];
