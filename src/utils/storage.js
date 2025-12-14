const KEY = 'trello_tasks_v1'


export function loadTasks() {
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return null
        return JSON.parse(raw)
    } catch (e) {
        console.error('Failed to parse tasks from localStorage', e)
        return null
    }
}


export function saveTasks(tasks) {
    try {
        localStorage.setItem(KEY, JSON.stringify(tasks))
    } catch (e) {
        console.error('Failed to save tasks to localStorage', e)
    }
}