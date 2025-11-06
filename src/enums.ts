/**
 * Статусы игры "Четыре в ряд"
 */
export enum GameStatus {
    /**
     * Игра завершена (победа или ничья)
     */
    Over = 'over',
    
    /**
     * Игра в процессе (ожидается ход игрока)
     */
    Pending = 'pending',
    
    /**
     * Ожидание начала игры 
     */
    Waiting = 'waiting'
}

/**
 * Типы игроков
 */
export enum PlayerTypes {
    User = 'user',
    Bot = 'bot'
}

/**
 * Значения ячеек игрового поля
 */
export enum CellValue {
    Player1 = 1,
    Player2 = 2,
    EmptyCell = 0
}

/**
 * Цвета фишек игроков
 */
export enum ChipColors {
    Red = 'red',
    Yellow = 'yellow'
}