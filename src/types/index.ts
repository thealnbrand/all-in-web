export type DomainCategory = 'all' | 'software' | 'digital' | 'physical';

export type ReleaseStatus = 'RELEASED' | 'IN DEVELOPMENT' | 'LIMITED DROP' | 'ARCHIVED' | 'BETA';

export interface StudioPillar {
  id: string;
  number: string;
  category: 'software' | 'digital' | 'physical';
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  signatureProject: string;
  techOrMaterials: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface StudioRelease {
  id: string;
  title: string;
  code: string;
  category: 'software' | 'digital' | 'physical';
  status: ReleaseStatus;
  releaseDate: string;
  summary: string;
  fullDescription: string;
  specifications: string[];
  techStackOrMaterials: string[];
  featured: boolean;
  imagePlaceholderText: string;
  image?: string;
  primaryActionLabel: string;
  primaryActionUrl?: string;
  editionDetails?: string;
}

export interface PhilosophyPrinciple {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export interface StudioMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  category: 'software' | 'digital' | 'physical' | 'collaboration' | 'general';
  budgetScope?: string;
  subject: string;
  message: string;
}
