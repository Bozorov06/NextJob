const API_BASE_URL = "https://mustafocoder.pythonanywhere.com/api";


export async function getJobs() {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/`);

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ish e'lonlarini olishda xatolik:", error);
    throw error;
  }
}

export async function getJobById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}/`);

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ish e'lonini olishda xatolik:", error);
    throw error;
  }
}

export async function updateJob(id: string, jobData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ish e'lonini yangilashda xatolik!:", error);
    throw error;
  }
}


export async function getSpecialistById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/specialists/${id}/`);

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Mutaxassisni olishda xatolik!:", error);
    throw error;
  }
}

// Mutahasis

export async function createSpecialist(specialistData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/specialists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(specialistData),
    });

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Mutaxassis profilini yaratishda xatolik!:", error);
    throw error;
  }
}

// Mutaxasis

export async function updateSpecialist(id: string, specialistData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/specialists/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(specialistData),
    });

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Mutaxassis profilini yangilashda xatolik!:", error);
    throw error;
  }
}

// Login

export async function login(logiin: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logiin),
    });

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login qilishda xatolik!:", error);
    throw error;
  }
}

// Register

export async function register(registerr: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerr),
    });

    if (!response.ok) {
      throw new Error(`API xatosi: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ro'yxatdan o'tishda xatolik!:", error);
    throw error;
  }
}
