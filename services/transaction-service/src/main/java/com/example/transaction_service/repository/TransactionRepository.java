package com.example.transaction_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.transaction_service.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
