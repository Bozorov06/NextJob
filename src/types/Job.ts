export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  applicationDeadline: string;
  contactEmail: string;
  logo: string;
  category: string;
  experience: string;
};

export type JobFormData = Omit<Job, "id" | "postedDate"> & {
  id?: string;
};
