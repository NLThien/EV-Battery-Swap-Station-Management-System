package com.example.transaction_service.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.transaction_service.model.Transaction;
import com.example.transaction_service.repository.TransactionRepository;
import com.example.transaction_service.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> handleGetAllTransactions() {
        return this.transactionRepository.findAll();
    }

    public Transaction handleUpdateTransaction(Long id, Transaction updateTransaction) {
        return transactionRepository.findById(id).map(swap -> {
            swap.setId(updateTransaction.getId());
            swap.setDriverId(updateTransaction.getDriverId());
            swap.setStationId(updateTransaction.getStationId());
            swap.setOldBatteryId(updateTransaction.getOldBatteryId());
            swap.setNewBatteryId(updateTransaction.getNewBatteryId());
            swap.setTimestamp(updateTransaction.getTimestamp());
            swap.setStatus(updateTransaction.getStatus());
            swap.setFee(updateTransaction.getFee());

            return transactionRepository.save(swap);
        }).orElseThrow(() -> new RuntimeException("Transaction not found with id " + id));
    }

    public void handleDeleteTransaction(Long id) {
        this.transactionRepository.deleteById(id);
    }
}
