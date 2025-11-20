export type AlertType = 'MAINTENANCE' | 'PERFORMANCE' | 'SAFETY' | 'POWER' | 'NETWORK' | 'BATTERY';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface StationInfo {
  id: string;
  name: string;
}

export interface StationAlert {
  id: string;
  stationId: string;
  station?: StationInfo;
  alertType: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  metricName?: string;
  currentValue?: number;
  thresholdValue?: number;
  unit?: string;
  triggeredAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StationAlertRequest {
  stationId: string;
  alertType: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  metricName?: string;
  currentValue?: number;
  thresholdValue?: number;
  unit?: string;
  triggeredAt?: string;
}

export interface StationAlertResponse {
  id: string;
  stationId: string;
  station?: StationInfo;
  alertType: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  metricName?: string;
  currentValue?: number;
  thresholdValue?: number;
  unit?: string;
  triggeredAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
}