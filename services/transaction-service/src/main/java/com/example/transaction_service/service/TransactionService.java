package com.example.transaction_service.service;

import java.util.List;

import com.example.transaction_service.model.Transaction;

public interface TransactionService {

    Transaction createTransaction(Transaction transaction);

    List<Transaction> handleGetAllTransactions();

    Transaction handleUpdateTransaction(Long id, Transaction updateTransaction);

    void handleDeleteTransaction(Long id);
}
