export interface Specialist {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  bio: string;
  contactEmail: string;
  phone?: string;
  avatar?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  availability: "Available" | "Open to offers" | "Not available";
  hourlyRate?: string;
}

export type SpecialistFormData = Omit<Specialist, "id"> & {
  id?: string;
};