// app_data.js

// ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ: Хранилище данных о членах семьи
// Инициализируем именами, которые мы видим на ваших скриншотах,
// например, Олег, Лера, Ребенок, но с ролями "Папа", "Мама", "Ребенок" для настроек.

const DEFAULT_FAMILY_MEMBERS = [
    // Parent 1 (Папа, Олег)
    { id: 'parent1', defaultRole: 'Папа', currentName: 'Олег', roleStatus: 'Основной пользователь', icon: '👤' },
    // Parent 2 (Мама, Лера)
    { id: 'parent2', defaultRole: 'Мама', currentName: 'Лера', roleStatus: 'Пользователь', icon: '👤' },
    // Child (Ребенок)
    { id: 'child', defaultRole: 'Ребенок', currentName: 'Ребенок', roleStatus: 'Зависимый профиль', icon: '🧍' }
];

/**
 * Загружает данные о семье из localStorage или возвращает значения по умолчанию.
 * @returns {Array<Object>} Массив объектов членов семьи.
 */
function getFamilyMembers() {
    try {
        const storedData = localStorage.getItem('familyMembers');
        if (storedData) {
            return JSON.parse(storedData);
        }
    } catch (e) {
        console.error("Ошибка при чтении localStorage", e);
    }
    
    // Если нет данных или ошибка, сохраняем дефолтные и возвращаем их
    saveFamilyMembers(DEFAULT_FAMILY_MEMBERS);
    return DEFAULT_FAMILY_MEMBERS;
}

/**
 * Сохраняет обновленные данные о семье в localStorage.
 * @param {Array<Object>} members Массив объектов членов семьи для сохранения.
 */
function saveFamilyMembers(members) {
    try {
        localStorage.setItem('familyMembers', JSON.stringify(members));
    } catch (e) {
        console.error("Ошибка при записи в localStorage", e);
    }
}

/**
 * Находит имя члена семьи по его ID.
 * @param {string} id ID члена семьи ('parent1', 'parent2', 'child').
 * @returns {string} Актуальное имя.
 */
function getMemberNameById(id) {
    const members = getFamilyMembers();
    const member = members.find(m => m.id === id);
    return member ? member.currentName : 'Неизвестный';
}
