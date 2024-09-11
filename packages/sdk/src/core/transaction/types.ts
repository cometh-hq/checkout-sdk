export enum TransactionStatus {
    INITIATED = "initiated",
    CASHED = "cashed",
    RELAYED = "relayed",
    REVERTED = "reverted",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}

// FINAL_TRANSACTION_STATUSES = [
//     TransactionStatus.REVERTED,
//     TransactionStatus.CANCELLED,
//     TransactionStatus.COMPLETED
// ]