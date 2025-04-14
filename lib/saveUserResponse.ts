export async function saveUserResponse({
    courseId,
    moduleId,
    submoduleId,
    sectionId,
    response,
  }: {
    courseId: string
    moduleId: string
    submoduleId: string
    sectionId: string
    response: string
  }) {
    const payload = {
      courseId,
      moduleId,
      submoduleId,
      sectionId,
      response,
      timestamp: new Date().toISOString(),
    }
  
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const key = `reflection-${courseId}-${moduleId}-${submoduleId}-${sectionId}`
      localStorage.setItem(key, JSON.stringify(payload))
    }
  
    // Save to dummy external API
    try {
      await fetch('https://api.example.com/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.warn('Failed to sync to API. Saved locally only.', error)
    }
  }
  